const { io } = require("socket.io-client")
const {machineIdSync} = require('node-machine-id')
const data = {
    device_id: machineIdSync(),
    room_id: "601"
}

const socket = io("https://fop-server-id.herokuapp.com");

socket.on('connect', () => {

    socket.emit('register', data)
    
    socket.on('unlock', (uuid) => {
        
        console.log('Will unlock door')
        socket.emit('door_opened', uuid)
    })    
})
