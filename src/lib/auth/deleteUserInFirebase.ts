import firebase from "firebase/app";
import "firebase/auth";

export const deleteUserInFirebase = async () => {
  const user = firebase.auth().currentUser;
  await user.delete().then(function() {
    return
  }).catch(function(err) {
    console.log("deleteUserInFirebaseでエラー" + err);
    
  });
}