export const sendVerificationMail = (user) => {
  
  user
    .sendEmailVerification()
    .then(function() {
    

      return true
    })
    .catch(function(error) {
      // An error happened.
      return false
    });
}