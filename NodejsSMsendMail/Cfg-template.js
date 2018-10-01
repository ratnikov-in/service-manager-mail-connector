const cfg = {}
/*Ссылка REST*/
cfg.url = 'link for group resources';
/*Авторизация в службе SM*/
cfg.authRest = {
  auth: {
    username: 'user',
    password: 'password'
  }
};
/*Авторизация в почтовой системе*/
cfg.authMail = {
  host: 'host mail server',
port: 25,
  auth: {
  type: 'login',
  user : 'user',
  pass: 'password'
  },
  authMethod: 'NTLM',
  secure: false,
  ignoreTLS: true,
  debug : true,
};
/*От кого будет проиходить отправка*/
cfg.mailFrom = 'servicemanager@domain.de';
/*Период забора писем и их отправка*/
cfg.cronPeriod = '*/30 * * * * *';  //30 секунд
/*Конфигурация логирования*/
cfg.log = {
    appenders: {
        mailLogs: { type: 'file', filename: 'mail.log' },
        console: { type: 'console' }
    },
    categories: {
        mail: { appenders: ['mailLogs'], level: 'error' },
        another: { appenders: ['console'], level: 'trace' },
        default: { appenders: ['console', 'mailLogs'], level: 'info' }
    }
};
module.exports = cfg;