const socket=io()
const $form=document.querySelector('#form')
const $input=$form.querySelector('input')
const $button=$form.querySelector('button')
const $locButton=document.querySelector('#sendLocation')
const $messages=document.querySelector('#messages')
const $messagesLocation=document.querySelector('#messagesLocation')

//template
const messageRender=document.querySelector('#messageRender').innerHTML
const messageRenderLocation=document.querySelector('#messageRenderLocation').innerHTML


 const { username, room } = Qs.parse(location.search,{ ignoreQueryPrefix:true})

 console.log(username)
socket.on('usersLogin' , (count)=>{ 
    console.log(count)

})

document.querySelector('#increament').addEventListener('click',()=>{ 
    console.log('clicked')
socket.emit('increament')
}
)
socket.on('welcome1',(message)=>{ 
const html=Mustache.render(messageRenderLocation,{ 
    message:message.url,
    createdAt:moment(message.createdAt).format('h:mm a')
})
$messagesLocation.insertAdjacentHTML('beforeEnd',html)
})
socket.on('welcome',(message)=>{ 
   const html= Mustache.render(messageRender,{
        message:message.text,
        createdAt:moment(message.createdAt).format('h:mm a')
    })
   $messages.insertAdjacentHTML('beforeEnd',html)

console.log(message)
})

$form.addEventListener('submit',(e)=>{ 
    e.preventDefault()
    $button.setAttribute('disabled','disabled')

    let message=document.querySelector('#text').value
    socket.emit('message',message,(message)=>{
        $button.removeAttribute('disabled')
        $input.value=''
        $input.focus()
        console.log(message)

    })

})

$locButton.addEventListener('click',()=>{ 
   $locButton.setAttribute('disabled','disabled')
if(!navigator.geolocation){ 
    return alert('Not supported')
}

    navigator.geolocation.getCurrentPosition((position)=>{ 
      
        socket.emit('sendLocation',{ 
        latitude:position.coords.latitude,
        longitude: position.coords.longitude
       
        },(message)=>{
            $locButton.removeAttribute('disabled')
        console.log(message)
        })
       
    })

})

socket.emit('join',{ username,room},(error)=>{
    console.log(error)
if(error){
    alert(error)
    location.href='/'
}
})