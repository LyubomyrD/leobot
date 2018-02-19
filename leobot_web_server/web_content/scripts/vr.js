var frameHeight = window.innerHeight;
var frameWidth = window.innerWidth;
var frameWidthHalf = Math.round(frameWidth/2);
document.getElementById('right_iframe').src = window.location.protocol + '//' + window.location.hostname + ":8090/stream?topic=/leobot/stereocamera/right/image_raw&width="+frameWidthHalf+"&height="+frameHeight;
document.getElementById('left_iframe').src = window.location.protocol + '//' + window.location.hostname + ":8090/stream?topic=/leobot/stereocamera/left/image_raw&width="+frameWidthHalf+"&height="+frameHeight;

// setup event handler to capture the orientation event and store the most recent data in a variable


// Connecting to ROS
var ros = new ROSLIB.Ros({
    url : 'ws://' + window.location.hostname + ':9090'
});
ros.on('connection', function() {
    console.log('Connected to websocket server.');

    var initial_direction = null;
    var delta = 0;

    if (window.DeviceOrientationEvent) {
        // Listen for the deviceorientation event and handle the raw data
        window.addEventListener('deviceorientation', function(eventData) {

            // Delta is the compass shift from initial_direction the device is facing in degrees
            if (null !== eventData.alpha) {
                if (null !== initial_direction) {
                    delta = eventData.alpha - initial_direction;
                    console.log('Direction Delta = ' + delta);
                }
                else {
                    initial_direction = eventData.alpha;
                    console.log('initial_direction = ' + initial_direction);
                }
            }
        }, false);
    };

    var headControl = new ROSLIB.Topic({
        ros : ros,
        name : '/leobot/head_position_controller/command',
        messageType : 'std_msgs/Float64'
    });

    var publishHeadPosition = function() {
        var delta_radians =  delta / 180.0 * Math.PI;
        console.log('degrees = ' + delta + ' radians = ' + delta_radians);

        var positionMess = new ROSLIB.Message({
            data : delta_radians
        });

        headControl.publish(positionMess);
    }

//    document.getElementById('left_button').onclick = function() {
//        delta = (delta > 85) ? 90 : delta + 5;
//        publishHeadPosition()
//    };
//    document.getElementById('right_button').onclick = function() {
//        delta = (delta < -85) ? -90 : delta - 5;
//        publishHeadPosition()
//    };

});
ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});
ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});

