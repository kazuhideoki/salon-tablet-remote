import firebase from "firebase/app";
import "firebase/auth";

export const sendVerificationMail = async (user: firebase.User) => {

  return user
    .sendEmailVerification()
    .then(function() {
    

      return true
    })
    .catch(function(error) {
      // An error happened.
      return false
    });
}