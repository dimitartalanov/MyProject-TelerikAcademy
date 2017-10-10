import firebaseModule from 'firebase-config';
import firebaseDb from 'firebaseDb';
class DbModel {

  getItems(category, scrollEvent) {

    const promis = new Promise((resolve, reject) => {

      let limit = 10;
      if (scrollEvent && category === 'portfolio') { limit += +scrollEvent }
      if (category === 'blog') {
        limit = +scrollEvent * 2;
      }

      const child = firebaseModule.database.child(category)
      child.limitToFirst(limit).on('value', (snap) => {

        if (snap.val() == null) {
          reject(null);
        } else {

          const portfolio = [];
          let blog = [];

          for (const i in snap.val()) {

            if (category === 'portfolio') {
              portfolio.push(snap.val()[i]);
            } else if (category === 'blog') {
              blog.push(snap.val()[i]);
            }
          }
          const startSlice = limit - 2;
          blog = blog.slice(startSlice, limit)

          const items = {
            portfolio,
            blog
          };

          resolve(items);
        }
      });
    });
    return promis;
  }
  getById(category, id) {
    let promise = new Promise((resolve, reject) => {

      const child = firebaseModule.database.child(category)

      child.orderByChild('id').equalTo(id).on('value', (snap) => {

        if (snap.val() == null) {
          reject(null);
        } else {

          let blog = [];
          const posts = [];

          for (const i in snap.val()) {

            const coments = snap.val()[i].comments
            for (const c in coments) {
              posts.push(coments[c])
            }

            blog.push(snap.val()[i]);

          }
          blog[0].comments = posts;

          const items = {
            blog
          };

          resolve(items);
        }
      })
    })
    return promise;
  }

  saveUserComment(comment, id) {
    let userName;

    firebaseDb.onAuthStateChanged(firebaseModule, user => {
      if (user) {
        if (user.displayName) {
          userName = user.displayName;
        } else {
          userName = 'anonymuos'
        }
        firebaseModule.database.child(`blog/${id}/comments`).push({ 'comment': comment, 'userName': userName, 'imgUser': user.photoURL, 'userId': user.uid })
      } else {
        window.location.href = ('#/login');
      }
    })
  }
  userProfile() {
    let promise = new Promise((resolve, reject) => {

      firebaseDb.onAuthStateChanged(firebaseModule, user => {
        if (user) {

          const child = firebaseModule.database.child('blog');
          child.on('value', (snap) => {
            if (snap.val() == null) {
              reject(null);
            } else {
              const post = [];
              const result = [];
              for (const i in snap.val()) {

                post.push(snap.val()[i])

              }
              post.forEach((item, index) => {
                if (item.comments) {

                  result.push(post[index]);

                }
              })

              const comments = []

              for (const i in result) {

                const comment = result[i].comments

                for (const j in comment) {
                  if (comment[j].userId === user.uid) {

                    comments.push({ comment: comment[j], id: result[i].id })

                  }
                }
              }

              const items = {
                userName: user.displayName,
                userPhoto: user.photoURL,
                email: user.email,
                comments: comments
              }

              resolve(items);
            }
          })

        } else {
          window.location.href = "#/login";
        }

      });
    })
    return promise;
  }
}

const dbModel = new DbModel();
export default dbModel;