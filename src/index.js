const path = require('path')
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const { generate } = require('../src/utils/message.js')
const { generateLocation } = require('../src/utils/location.js')
const { addUser,removeUser,getUser,getUsersInRoom } = require('../src/utils/users.js')



const app = express()
const server =http.createServer(app)
const io = socket(server)

const port = process.env.PORT || 1907 

const sourcepath = path.join(__dirname, '../public')
app.use(express.static(sourcepath))
let count=0
io.on('connection' , (socket)=>{ 
   

    socket.on('join',(options,callback)=>{ 
      const  {errors,user} = addUser({id:socket.id,...options})
      if(user){ 
      username=user.username.trim().toLowerCase()
      room=user.room.trim().toLowerCase()
      console.log(username)
      socket.join(room)
      socket.emit('welcome',generate("welcome"))
  socket.broadcast.to(user.room).emit('welcome',generate(`${username } join`))
      }


      if(errors){
         return callback(errors)
        }
        callback()
        })
        socket.on('message',(message,callback)=>{ 
           const user= getUser(socket.id)
           const room=user.room.trim().toLowerCase()
           const username =user.username.trim().toLowerCase()
            io.to(room).emit('welcome',generate(`${username } ${message }`))
            callback('Delivered')
        })
    socket.on('sendLocation',(coords,callback)=>{ 
    io.emit('welcome1' , generateLocation(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
    callback('location shared successfully')
    })

    

    socket.on('disconnect',()=>{ 
        const user=removeUser(socket.id)
        if(user){
            room=user.room.trim().toLowerCase()
            username=user.username.trim().toLowerCase()
    io.to(room).emit('welcome',generate(`A ${username} diconnected`))}
    })

    socket.emit('usersLogin',count)
    socket.on('increament',()=>{ 
        count++
        io.emit('usersLogin',count)
    })
    console.log('success')
}

)

server.listen(port,()=>
console.log('welcome')
)

