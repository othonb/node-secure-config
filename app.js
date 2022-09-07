const conf = require('@tsmx/secure-config')();

let dbHost = conf.database.host; // = '127.0.0.1'
let dbUser = conf.database.user; // = 'MySecretDbUser'
let dbPassword = conf.database.password; // = 'MySecretDbPass'

console.log('Host: ' + dbHost);
console.log('User: ' + dbUser);
console.log('Password: ' + dbPassword);
