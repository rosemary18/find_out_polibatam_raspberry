const { io } = require("socket.io-client")
const {machineIdSync} = require('node-machine-id')
const GPIO = require('onoff').Gpio

const data = {
    device_id: machineIdSync(),
    room_id: "701"
}

const PIN_OUT = new GPIO(18, 'out')
PIN_OUT.writeSync(1)
const socket = io("https://fop-id.herokuapp.com/");
// const socket = io("localhost:5050");

socket.on('connect', () => {
    
    socket.emit('register', data)
    
    socket.on('unlock', (uuid) => {
        
        console.log('Will unlock door')
    
        PIN_OUT.writeSync(0)
        
        if (PIN_OUT.readSync() === 0) {
            socket.emit('door_opened', uuid)
        }
        
        setTimeout(() => {            
            PIN_OUT.writeSync(1)
        }, 10000);
    })    
})
