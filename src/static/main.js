
const app = new Vue ({
    el: '#app',
    data:{
        title:'Nestjs Websockets Chat',
        name:'',
        text:'',
        mesagge:[],
        socket: null
    },
    methods: {
        sendMessage() {
            if(this.validateInput()){
                const message = {
                    name: this.name,
                    text: this.text
                }
                this.socket.emit('msqToServer', message)
                this.text = ''
            }
        },
        receivedMessage(message){
            this.messages.push(message)
        },
        validateInput(){
            return this.name.lenght > 0 && this.text.lenght >0
        }
    },
    created(){ //It ejecuted everytime the interface is created
        this.socket = io('http://localhost:3000')
        this.socket.on('msgToClient', (message) => {
            this.receivedMessage(message)
        })
    }

})

