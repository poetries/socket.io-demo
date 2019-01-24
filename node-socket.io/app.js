// app.js

var http = require("http");
var fs = require('fs')

var server = http.createServer(function(req,res){
    if(req.url == "/"){ //显示首页
        fs.readFile("./index.html",function(err,data){ 
            res.end(data);
        }); 
    }
});

var io = require('socket.io')(server);

//监听连接事件 
io.on('connection',function(socket) {
    console.log('和服务器建立连接了');
    
    socket.on('to-server',function(data) {
    
        // 接收客户端传过来的数据
        console.log('客户端说:' + data);
        
        // 向客户端发送数据
        io.emit('to-client','我是服务器返回的数据');
        
    }) 
    socket.on('disconnect',function() {
        console.log('断开连接了');
    })
})

server.listen(3000,"127.0.0.1",function(){
    console.log('app run at 127.0.0.1:3000')
});

// 写完这句话之后，你就会发现，http://127.0.0.1:3000/socket.io/socket.io.js 就是一个 js 文件 的地址了