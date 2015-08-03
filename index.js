var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var fs = require('fs');
var path = require('path');

var users = [];

//todo auto this
var musicDir = __dirname + '/public/musics';
var musics = {};
musics['easy'] = fs.readdirSync(musicDir + '/easy');
musics['medium'] = fs.readdirSync(musicDir + '/medium');
musics['hard'] = fs.readdirSync(musicDir + '/hard');
musics['expert'] = fs.readdirSync(musicDir + '/expert');
musics['bonus'] = fs.readdirSync(musicDir + '/bonus');

io.on('connection', function(socket) {

	socket.on('chat-message', function(msg) {
		io.emit('chat-message', msg);
		console.log('Message:', msg);
	});

	socket.on('play', function(msg) {
		io.emit('play', msg);
		console.log('play', msg);
	});

	socket.on('pause', function(msg) {
		io.emit('pause', musics.easy[0]);
		console.log('pause');
	});

	socket.on('stop', function(msg) {
		io.emit('stop', musics.easy[0]);
		console.log('stop');
	});

	io.emit('music-list', JSON.stringify(musics));
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});

//todo better
function GetMusic(name) {
	if (musics.easy[name] != undefined)
		return path.join(musicDir, 'easy', musics.easy[name]);
	if (musics.medium[name] != undefined)
		return path.join(musicDir, 'medium', musics.medium[name]);
	if (musics.hard[name] != undefined)
		return path.join(musicDir, 'hard', musics.hard[name]);
	if (musics.expert[name] != undefined)
		return path.join(musicDir, 'expert', musics.expert[name]);
	if (musics.bonus[name] != undefined)
		return path.join(musicDir, 'bonus', musics.bonus[name]);
}

/*
function GetMusics(dirName) {
	var files = fs.readdirSync(dirName);

	files.forEach(function(file) {
		var path = path.join(dirName, file);
      	fs.stat(path, function(e, f) {
	        if (e) {
	          console.log('Error: ', e);
	          return;
	        }
	        if (f.isDirectory()) {
	          musics.put(file);
	          getFiles(path);
	        } else
	          musics[dirName].put(file);
		});
	});
}
*/