var express=require('express');
var socket=require('socket.io');
var app=express();
var server=app.listen(7005,function(){
    console.log("http://localhost:7005")});
app.use(express.static('public'));
var scket=socket(server);
scket.on('connection', function(data){
    console.log('welcome =>',data.id);
   
    data.on('message',function(info){
        scket.sockets.emit('new',info);
    })
    data.on('broadcast',function(info){
        data.broadcast.emit('new-broad',info);
    })
    
  });
