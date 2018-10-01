const cfg = {}
/*Ссылка REST*/
cfg.url = 'http://93.182.28.80:13080/SM/9/rest/tlmrNotifications2/';
/*Авторизация в службе SM*/
cfg.authRest = {
  auth: {
    username: 'mail',
    password: '123'
  }
};
/*Авторизация в почтовой системе*/
cfg.authMail = {
  host: 'mx1.talmer.ru',
port: 25,
  auth: {
  type: 'login',
  user : 'i.ratnikov@talmer.ru',
  pass: '!QAZXSW2'
  },
  authMethod: 'NTLM',
secure: false,
  ignoreTLS: true,
  debug : true,
};
/*От кого будет проиходить отправка*/
cfg.mailFrom = 'hpsm.support@talmer.ru';
/*Период забора писем и их отправка*/
cfg.cronPeriod = '*/30 * * * * *';
cfg.log = {
    appenders: {
        mailLogs: { type: 'file', filename: 'mail.log' },
        console: { type: 'console' }
    },
    categories: {
        mail: { appenders: ['mailLogs'], level: 'error' },
        another: { appenders: ['console'], level: 'trace' },
        default: { appenders: ['console', 'mailLogs'], level: 'trace' }
    }
};
module.exports = cfg;