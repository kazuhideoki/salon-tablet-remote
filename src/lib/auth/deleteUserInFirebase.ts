import firebase from 'firebase/app';
import 'firebase/auth';

export const deleteUserInFirebase = async (
  email: string,
  password: string
): Promise<void> => {
  console.log('deleteUserInFirebaseだよ');

  try {
    const user = firebase.auth().currentUser;

    console.log(`deleteUserInFirebaseのuser: ${JSON.stringify(user)}`);
    if (user?.email) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      );

      user
        ?.reauthenticateWithCredential(credential)
        .then(async function () {
          console.log(`user re-authenticated`);
          await user
            .delete()
            .then(function () {
              console.log('user.delete then');

              return;
            })
            .catch(function (err) {
              console.log('deleteUserInFirebaseでエラー' + err);
            });
        })
        .catch(function (err) {
          throw `reauthenticateWithCredential ${err}`;
        });
    } else {
      console.log(`firebase.auth.AuthCredentialはnull`);
    }
  } catch (err) {
    throw `deleteUserInFirebase: ${err}`;
  }
};
