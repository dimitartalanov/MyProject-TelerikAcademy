import firebaseDb from"firebaseDb";import firebaseModule from"firebase-config";class Templates{load(e){firebaseDb.onAuthStateChanged(firebaseModule,o=>{"portfolio"===e&&(o||window.location.replace("#/login"))});const o={};if(o.hasOwnProperty(e))return Promise.resolve(o[e]);const r="views/templates/"+e+".handlebars";return new Promise((s,t)=>{$.ajax({url:r,success:function(r){o[e]=r,s(r)},error:function(e){t(e)}})})}}const templates=new Templates;export default templates;