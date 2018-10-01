const cfg = {}
/*������ REST*/
cfg.url = 'link for group resources';
/*����������� � ������ SM*/
cfg.authRest = {
  auth: {
    username: 'user',
    password: 'password'
  }
};
/*����������� � �������� �������*/
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
/*�� ���� ����� ���������� ��������*/
cfg.mailFrom = 'servicemanager@domain.de';
/*������ ������ ����� � �� ��������*/
cfg.cronPeriod = '*/30 * * * * *';  //30 ������
/*������������ �����������*/
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