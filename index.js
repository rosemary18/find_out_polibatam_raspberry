const { io } = require("socket.io-client")
const {machineIdSync} = require('node-machine-id')
// const GPIO = require('onoff').Gpio

const data = {
    device_id: machineIdSync(),
    room_id: "601"
}

const socket = io("https://fop-server-id.herokuapp.com");
// const socket = io("localhost:5050");

socket.on('connect', () => {
    
    socket.emit('register', data)
    
    socket.on('unlock', (uuid) => {
        
        console.log('Will unlock door')
        
        // const PIN_OUT = new GPIO(18, 'out')
        // PIN_OUT.writeSync(1)
        
        // if (PIN_OUT.readSync() === 1) {
            socket.emit('door_opened', uuid)
        // }
        
        // setTimeout(() => {            
        //     PIN_OUT.writeSync(0)
        //     PIN_OUT.unexport()
        // }, 5000);
    })    
})
