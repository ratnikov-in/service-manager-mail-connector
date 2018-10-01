const mailer = require('nodemailer'); //Отправка писем 
const requestify = require('requestify'); //REST запросы
const CronJob = require('cron').CronJob;//Планировщик
const Cfg = require('./Cfg.js')//Конфиг
const log4js = require('log4js');//Логирование
log4js.configure((Cfg.log))//Конфиг логирования
const logger = log4js.getLogger('mail');
// Функция формирования сообщения
function createMessage(object) {
    let message = {};
    message.from = Cfg.mailFrom;
    message.to = object.to.toString();
    message.subject = object.subject;
    message.text = object.text.join('');
    message.html = object.text.join('');
    logger.info('Message create');
    return message
}
//Асинхронный forEach
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}
//Поиск и получение записи
async function getRecord(uri) {
    let result = (requestify.get(uri, Cfg.authRest)
        .then(response => {
            logger.info("Find in Service Manager message" + uri);
            let json = JSON.parse(response.body);
            let result = json.tlmrNotifications2;
            return result;
        }));
    return await result
}
//Отправка e-mail
async function sendMailMessage(message, uri) {
    let smtpTransport = mailer.createTransport(Cfg.authMail);
    await smtpTransport.sendMail(createMessage(message), (error, response) => {
        if (error) {
            logger.error(error);
        } else {
            logger.info("Message " + JSON.stringify(message) + " sent");
            //Удаление записи в SM
            requestify.delete(uri, Cfg.authRest).then(function (response) {
                response.getBody();
                logger.info("Delete " + uri + " in Service Manager message");
            });
            smtpTransport.close();
        }
    });
}
//Тело приложения
const job = new CronJob(Cfg.cronPeriod, function () {
    requestify.get(Cfg.url, Cfg.authRest).then(response => {
        let json = JSON.parse(response.body);
        let result = json.content;
        if (!result) return logger.info('No entries to process')
        asyncForEach(result, async (obj) => {
            let one = obj.tlmrNotifications2;
            let uri = Cfg.url + one.uid; //Собираем ссылку для обрабтки записи
            //Обработка единичной записи
            await getRecord(uri).then(async result => {
                await sendMailMessage(result, uri);
            });
        });
    });
});
job.start();