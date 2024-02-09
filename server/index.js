const express=require('express')
const app=express()
const http=require('http');
const server=http.createServer(app);
const cors=require('cors');

const {Server}=require('socket.io');

app.use(cors())
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
});

server.listen(3001,()=>{
    console.log('listening to port 3001.....')
})

io.on('connection',(socket)=>{
    console.log(`user connected ${socket.id}`)

    socket.on('join_room',(data)=>{
        socket.join(data);
        console.log(`user ${socket.id} joined room ${data}`)
    })
    socket.on('send_message',(data)=>{
        console.log(data)
        socket.to(data.room).emit('receive_message',data)
    })

    socket.on('disconnected',()=>{
        console.log('user disconnected')
    })
})