const ui = new firebaseui.auth.AuthUI(firebase.auth())
ui.start('#firebaseui-auth-container', {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
})
