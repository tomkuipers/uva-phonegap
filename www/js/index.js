if (window.cordova) {
  document.addEventListener("deviceready", onDeviceReady);
}
else {
  onDeviceReady();
}

var pushNotification;

function onDeviceReady() {
  // 1. Test of PhoneGap werkt
  console.log(device.cordova);

  // 2. Push Notification settings
  pushNotification = window.plugins.pushNotification;
  $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
  if (device.platform == 'android' || device.platform == 'Android' || device.platform == "amazon-fireos") {
    pushNotification.register(
      successHandler,
      errorHandler,
      {
        "senderID": "206067759666",// Vervang door je eigen projectID
        "ecb"     : "onNotification"
      });
  } else {
    // iOS
    pushNotification.register(
      tokenHandler,
      errorHandler,
      {
        "badge": "true",
        "sound": "true",
        "alert": "true",
        "ecb"  : "onNotificationAPN"
      });
  }

  // result contains any message sent from the plugin call
  function successHandler(result) {
    alert('result = ' + result);
  }

// result contains any error description text returned from the plugin call
  function errorHandler(error) {
    alert('error = ' + error);
  }








  //***************************
  // 2. Bootstrap AngularJS-module. De modulen, controllers, etc.
  // zijn in aparte bestanden (met iffy's) opgeslagen.
  angular.bootstrap(document.getElementById('body'), ['myApp']);
}// end deviceReady()

// PN ontvangen: Android-afhandeling
function onNotification(e) {
  $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

  switch( e.event )
  {
    case 'registered':
      if ( e.regid.length > 0 )
      {
        $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
        // Your GCM push server needs to know the regID before it can push to this device
        // here is where you might want to send it the regID for later use.

        // HIER komt code om regid op te slaan in je eigen db
        console.log("regID = " + e.regid);
      }
      break;

    case 'message':
      // if this flag is set, this notification happened while we were in the foreground.
      // you might want to play a sound to get the user's attention, throw up a dialog, etc.
      if ( e.foreground )
      {
        $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
        $("#app-status-ul").append('<li>e.payload.key1: ' + e.payload.key1+ '</li>');

        // on Android soundname is outside the payload.
        // On Amazon FireOS all custom attributes are contained within payload
        //alert('Push ontvangen: ' + e.payload.key1);
      }
      else
      {  // otherwise we were launched because the user touched a notification in the notification tray.
        if ( e.coldstart )
        {
          $location.url(payload.view);
          $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
        }
        else
        {
          $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
        }
      }

      $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
      //Only works for GCM
      $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
      //Only works on Amazon Fire OS
      $status.append('<li>MESSAGE -> TIME: ' + e.payload.timeStamp + '</li>');
      break;

    case 'error':
      $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
      break;

    default:
      $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
      break;
  }
}

function tokenHandler (result) {
  // Your iOS push server needs to know the token before it can push to this device
  // here is where you might want to send it the token for later use.
  alert('device token = ' + result);
}
