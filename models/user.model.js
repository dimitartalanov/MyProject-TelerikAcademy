import firebaseDb from 'firebaseDb';
import validator from 'validator';
import encryptor from 'encryptor';
class UserModel {
    constructor(database) {
        this.database = database;
    }

    signIn(email, password) {
        password = encryptor.encrypt(password);

        return firebaseDb.signInWithEmail(email, password, this.database)// .then(() => this.updateLogInButton())
            .catch(error => Promise.reject(error));
    }

    signUp(email, password, username, photoURL) {

        try {
            validator.validateSignUpForm(email, password, username);
        } catch (error) {
            return Promise.reject({ code: '500', message: error });
        }

        password = encryptor.encrypt(password);

        return firebaseDb.createUserWithEmail(email, password, username, this.database)
            .then(() => {

                const user = firebase.auth().currentUser;
                const photoUser = photoURL;

                user.updateProfile({
                    displayName: username,
                    photoURL: photoUser
                })
            })
            .catch(error => Promise.reject(error));
    }

    signOut() {
        return firebaseDb.signOut(this.database)
            .catch(error => Promise.reject(error));
    }
}

export default UserModel;