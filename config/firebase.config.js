
const firebaseModule = (function () {
  const config = {
    apiKey: "AIzaSyAcm-msm2qpP0icf_TgP8ESKaqPCv8XgB0",
    authDomain: "myproject-d3e8a.firebaseapp.com",
    databaseURL: "https://myproject-d3e8a.firebaseio.com",
    projectId: "myproject-d3e8a",
    storageBucket: "myproject-d3e8a.appspot.com",
    messagingSenderId: "815598602028"//815598602028
  };
  firebase.initializeApp(config);

  const database = firebase.database().ref();
  const auth = firebase.auth();

  return {
    database,
    auth
  };

}());
export default firebaseModule;