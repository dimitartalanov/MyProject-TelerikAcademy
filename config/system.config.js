System.config({
  'transpiler': 'plugin-babel',
  'map': {
    'main': '../assets/scripts/app.js',
    'router': '../config/sammy.config.js',
    'jquery': '../lib/node_modules/jquery/dist/jquery.min.js',
    'plugin-babel': '../lib/node_modules/systemjs-plugin-babel/plugin-babel.js',
    'systemjs-babel-build': '../lib/node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
    'system': '../lib//node_modules/systemjs/dist/system.js',
    'sammy': '../lib/node_modules/sammy/lib/sammy.js',
    'handlebars': '../lib/node_modules/handlebars/dist/handlebars.min.js',
    'templates': '../views/helpers/templates.js',
    'validator': '../models/helpers/validators.js',
    'encryptor': '../models/helpers/encryptors.js',
    'firebaseDb': '../database/firebaseDb.js',
    'firebase-config': '../config/firebase.config.js',
    'user-model': '../models/user.model.js',
    'db-model': '../models/db.model.js',
    'account-controller': '../controllers/account.controller.js',
    'db-controller': '../controllers/db.controller.js',
    'user-state': '../assets/scripts/userState.js',
    'toggle-classes': '../assets/scripts/stylings.resolution.js',
    'stylings-templates': '../views/helpers/stylings.templates.js',
    'events': '../assets/scripts/events.js'
  },
});
System.import('main');