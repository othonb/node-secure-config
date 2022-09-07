Secure Config Tool

Step 1 - Install secure-config-tool (optional)

npm i -g @tsmx/secure-config-tool

Step 2 – Get a secret key and export it

secure-config-tool genkey
ebf1d7f549cbab21c114e5caaa4cc5d836ab6746346148bab27a93f59b0aff96
export CONFIG_ENCRYPTION_KEY=ebf1d7f549cbab21c114e5caaa4cc5d836ab6746346148bab27a93f59b0aff96

Step 3 – Encrypt your configuration JSON values and generate a new, secure configuration file

secure-config-tool create config_plaintext.json > conf/config.json
cat conf/config.json
{
  "database": {
    "host": "127.0.0.1",
    "user": "ENCRYPTED|d418bd66498631a7f13a86652005cce9|89fdccf513fd5569dd2ff237775dcb6d",
    "password": "ENCRYPTED|5ef8e1e81a58c1a1e2ebb9461ccd1b41|6dcc1e7004ebb1fe5d17e91b04e0dac3"
  },
  "__hmac": "812e2be34234feec43285bb7a4c9e1439cdab9fa103dcc3290b4238ee182ee99"
}

The generated file should be in the conf/ subfolder of your app.

Step 4 – Use your configuration in the code

const conf = require('@tsmx/secure-config')();

let dbHost = conf.database.host; // = '127.0.0.1'
let dbUser = conf.database.user; // = 'MySecretDbUser'
let dbPassword = conf.database.password; // = 'MySecretDbPass'

console.log('Host: ' + dbHost);
console.log('User: ' + dbUser);
console.log('Password: ' + dbPassword);

Step 5 – Run your app using the new encrypted configuration

npm i --save tsmx/secure-config
export CONFIG_ENCRYPTION_KEY=ebf1d7f549cbab21c114e5caaa4cc5d836ab6746346148bab27a93f59b0aff96
node app.js

Step 6 - To encrypt other properties you'll need to suply its value. For example, 127.0.0.1 is the value for host property

secure-config-tool encrypt "127.0.0.1"                                 
ENCRYPTED|12303bfb6afb46baee22cd72a1819cdf|f4ee054e4c0558011357f1e829eb87f4

Open the config.json file and include this line instead of 127.0.0.1

{
  "database": {
    "host": "ENCRYPTED|12303bfb6afb46baee22cd72a1819cdf|f4ee054e4c0558011357f1e829eb87f4",
    "user": "ENCRYPTED|d418bd66498631a7f13a86652005cce9|89fdccf513fd5569dd2ff237775dcb6d",
    "password": "ENCRYPTED|5ef8e1e81a58c1a1e2ebb9461ccd1b41|6dcc1e7004ebb1fe5d17e91b04e0dac3"
  },
  "__hmac": "812e2be34234feec43285bb7a4c9e1439cdab9fa103dcc3290b4238ee182ee99"
}

Afterwards, it's necessary to update the HMAC with

secure-config-tool update-hmac -o conf/config.json
cat conf/config.json

{
  "database": {
    "host": "ENCRYPTED|12303bfb6afb46baee22cd72a1819cdf|f4ee054e4c0558011357f1e829eb87f4",
    "user": "ENCRYPTED|d418bd66498631a7f13a86652005cce9|89fdccf513fd5569dd2ff237775dcb6d",
    "password": "ENCRYPTED|5ef8e1e81a58c1a1e2ebb9461ccd1b41|6dcc1e7004ebb1fe5d17e91b04e0dac3"
  },
  "__hmac": "f93083b15e8cef4590906d12cd594f6d9c684c6b73f61c9e2fad0aeaf0e3f43c"
}


Step 7 - Test the generated file

secure-config-tool test conf/config.json          
Decryption: PASSED
HMAC:       PASSED
