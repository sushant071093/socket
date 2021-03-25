const users=[ ]

const addUser=({ id,username,room})=>{ 

username=username.trim().toLowerCase()
room=room.trim().toLowerCase()

if(!username || !room){ 
    return { 
    errors:'invalidusername or room'
    }
}
const existingUser=users.find((user)=>{ 
   return user.room===room && user.username===username
})
if(existingUser){ 
    return { 
        errors:'Already Exist!!'
    }
}
const user={ id,username,room}
users.push(user)
return { user}
}

const removeUser=(id)=>{ 
    const index=users.findIndex((user)=>{ 
       return user.id===id
    })

    if(index!==-1){ 
        return users.splice(index,1)[0]


    }
}

const getUser=(id)=>{

  userWithid=  users.find((user)=>{
    return user.id===id
    })

    if(!userWithid){
        return 'no user exist with the following id'
    }

    return userWithid
}


const getUsersInRoom=(room)=>{

    const userrs=users.filter((user)=>{
        return user.room===room
    })
if(userrs.length>0){
return userrs
}


}
user={
    id:1,
   username:'name',
    room:'ok'}
    const b=addUser(user)
//const a=addUser(user)
//const b=getUsersInRoom('okk')
//const b=removeUser(1)
//console.log(b)
//console.log(a)
//console.log(users)


module.exports={

    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}