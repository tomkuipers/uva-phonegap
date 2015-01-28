if (window.cordova) {
  document.addEventListener("deviceready", onDeviceReady);
}
else {
  onDeviceReady();
}

function onDeviceReady() {
  // 1. Test of PhoneGap werkt
  console.log(device.cordova);

  // 2. Bootstrap AngularJS-module. De modulen, controllers, etc.
  // zijn in aparte bestanden (met iffy's) opgeslagen.
  angular.bootstrap(document.getElementById('body'), ['myApp']);
}