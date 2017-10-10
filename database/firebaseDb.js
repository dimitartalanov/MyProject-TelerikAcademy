const firebaseDb = (function () {

  function getChild(child, database) {
    const db = database.database
    return db.child(child)
  }
  function createUserWithEmail(email, password, username, database) {
    const auth = database.auth
    return auth.createUserWithEmailAndPassword(email, password)
      .then(() => this.getCurrentUser(database))
      .then(user => {

        user.updateProfile({ displayName: username })
        localStorage.setItem('username', username)
        localStorage.setItem('userUid', user.uid)
      })
      .catch(error => Promise.reject(error))
  }

  function signInWithEmail(email, password, database) {
    const auth = database.auth

    return auth.signInWithEmailAndPassword(email, password)
      .catch(error => Promise.reject(error))
  }

  function signOut(database) {
    const auth = database.auth

    return auth.signOut()
  }

  function getCurrentUser(database) {
    const auth = database.auth

    return new Promise(resolve => {


      auth.onAuthStateChanged(userInfo => resolve(userInfo))
    })
  }

  /*  function onAuthStateChanged(database, callback) {
     const auth = database.auth
 
     return auth.onAuthStateChanged(function (user) {
       callback(user); onAuthStateChanged(userInfo => resolve(userInfo))
     })
   } */

  function onAuthStateChanged(database, callback) {
    const auth = database.auth

    return auth.onAuthStateChanged(function (user) {
      callback(user)
    })
  }

  return {
    getChild,
    getCurrentUser,
    createUserWithEmail,
    signInWithEmail,
    signOut,
    onAuthStateChanged,
  }
}())
export default firebaseDb