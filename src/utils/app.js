document.addEventListener('deviceready', onDeviceready)
window.JPush.init()
window.JPush.setDebugMode(true)
function onDeviceready () {
  document.addEventListener('jpush.receiveRegistrationId', function (event) {
    alert('receiveRegistrationId' + JSON.stringify(event))
    try {
      window.JPush.init()
      window.JPush.setDebugMode(true)

      if (window.device.platform !== 'Android') {
        window.JPush.setApplicationIconBadgeNumber(0)
      }
    } catch (exception) {}
  }, false)
}
document.addEventListener('jpush.openNotification', onOpenNotification, false)
document.addEventListener('jpush.receiveNotification', onReceiveNotification, false)
function onOpenNotification (event) {
  alert(event)
  try {
    var alertContent
    if (window.device.platform === 'Android') {
      alertContent = event.alert
    } else {
      alertContent = event.aps.alert
    }
    alert('open Notification:' + alertContent)
  } catch (exception) {
    console.log('JPushPlugin:onOpenNotification' + exception)
  }
}
function onReceiveNotification (event) {
  alert(event)
  try {
    var alertContent
    if (window.device.platform === 'Android') {
      alertContent = event.alert
    } else {
      alertContent = event.aps.alert
    }
    alert('open Notification:' + alertContent)
  } catch (exception) {
    console.log('JPushPlugin:onOpenNotification' + exception)
  }
}
