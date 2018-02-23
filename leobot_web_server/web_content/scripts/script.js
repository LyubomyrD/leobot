var delta = 0;
// Connection to ROS
var ros = new ROSLIB.Ros({
    url : 'ws://' + window.location.hostname + ':9090'
});
ros.on('connection', function() {
    console.log('Connected to websocket server.');
});
ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
});
ros.on('close', function() {
    console.log('Connection to websocket server closed.');
});
var headControl = new ROSLIB.Topic({
    ros : ros,
    name : '/leobot/head_position_controller/command',
    messageType : 'std_msgs/Float64'
});
var headControl = new ROSLIB.Topic({
    ros : ros,
    name : '/leobot/head_position_controller/command',
    messageType : 'std_msgs/Float64'
});
var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/leobot/head_position_controller/command',
    messageType : 'std_msgs/Float64'
});
listener.subscribe(function(message) {
    console.log('Received message on ' + listener.name + ': ' + message.data);
    delta = message.data * 180 / Math.PI;
});
var publishHeadPosition = function() {
        var delta_radians =  delta / 180.0 * Math.PI;
        console.log('degrees = ' + delta + ' radians = ' + delta_radians);
        var positionMess = new ROSLIB.Message({
            data : delta_radians
        });
        headControl.publish(positionMess);
}
document.getElementById('head-control-button-left').onclick = function() {
     delta = (delta > 85) ? 90 : delta + 5;
     publishHeadPosition()
};
document.getElementById('head-control-button-center').onclick = function() {
     delta = 0;
     publishHeadPosition()
};
document.getElementById('head-control-button-right').onclick = function() {
     delta = (delta < -85) ? -90 : delta - 5;
     publishHeadPosition()
};