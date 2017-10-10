import firebaseDb from 'firebaseDb';
import firebaseModule from 'firebase-config';
class Templates {
  load(name) {

    firebaseDb.onAuthStateChanged(firebaseModule, user => {
      if (name === 'portfolio') {

        if (!user) {
          window.location.replace('#/login')
        }
      }
    });

    const cacheObj = {};
    if (cacheObj.hasOwnProperty(name)) {
      return Promise.resolve(cacheObj[name]);
    }

    const url = 'views/templates/' + name + '.handlebars';

    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        success: function (data) {
          cacheObj[name] = data; //cahce new temp late
          resolve(data);
        },
        error: function (err) {
          reject(err);
        }
      });
    })
  }
}

const templates = new Templates();

export default templates;