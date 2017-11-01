


//SOCKET IO //
//var socket = io();
var socket = io.connect();
// socket.on('news', function (data) {
//   console.log(data);
//   socket.emit('my other event', { my: 'data' });
// });

//Cai nay la client

// socket.on('connect', function(){
//   socket.on('update', function(data){
//     //$('#client_count').text(data);
//     console.log(data);
//   });
// });

socket.on('channel_01', function(data) {
	//console.log(data);
	window.location.reload();
	//reloadPage();
});

//socket.emit('channel_01', {mess: 'hello'});

// function reloadPage() {
// 	window.location.reload();
// }