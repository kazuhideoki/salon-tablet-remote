import firebase from "firebase/app";

export const deleteUserInFirebase = async () => {
  const user = firebase.auth().currentUser;

  await user.delete().then(function() {
    console.log("deleteUserInFirebase成功");
    
    // User deleted.
    return
  }).catch(function(error) {
    console.log("deleteUserInFirebaseでエラー" + error);
    
  });
}