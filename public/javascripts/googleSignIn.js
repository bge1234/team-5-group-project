// $('.signOut').hide();

function onSignIn(googleUser) {
  //This is to get the Users ID token to verify who they are on the backend
  var id_token = googleUser.getAuthResponse().id_token;
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Email: ' + profile.getEmail());
  console.log('Image URL: ' + profile.getImageUrl());
  $('.g-signin2').hide();
  $('.signOut').show();
  $('.partnerLogin').hide();
  // window.location.href = "/"
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  $('.signOut').hide();
}



//Send the ID token to our server with an HTTPS POST request
//- var xhr = new XMLHttpRequest();
//- xhr.open('POST', 'postgres://localhost/freedenver');
//- xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//- xhr.onload = function() {
//- console.log('Signed in as: ' + xhr.responseText);
//- };
//- xhr.send('idtoken=' + id_token);
