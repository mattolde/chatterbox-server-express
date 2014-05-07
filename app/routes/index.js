var express = require('express');
var router = express.Router();

var messages = [];

var findRoomMsgs = function(room, messages){
  var roomMsgs = [];

  for(var i = 0; i < messages.length; i++){
    if(messages[i].roomname === room){
      roomMsgs.push(messages[i]);
    }
  }
  return roomMsgs;
}

router.get('/classes/messages', function(req, res) {
  res.json({results: messages});
});

router.post('/classes/messages', function(req, res){
  var username = req.param('username');
  var text = req.param('text');
  var roomname = req.param('roomname');

  messages.push({username: username, text: text, roomname: roomname});

  res.json({created: true});
});

router.get('/classes/:room', function(req, res){
  var roomname = req.param('room');
  var msgs = findRoomMsgs(roomname, messages);
  res.json({results: msgs});
});

module.exports = router;
