import firebase from "firebase/app";

export const deleteUserInFirebase = async () => {
  const user = firebase.auth().currentUser;

  await user.delete().then(function() {
    // User deleted.
  }).catch(function(error) {
    // An error happened.
  });
}