export const user.reauthenticateWithCredential = (user, credential) => {
  var user = firebase.auth().currentUser;
  var credential;

  // Prompt the user to re-provide their sign-in credentials

  user.reauthenticateWithCredential(credential).then(function() {
    // User re-authenticated.
  }).catch(function(error) {
    // An error happened.
  });
}