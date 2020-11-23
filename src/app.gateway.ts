import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import {Socket , Server} from 'socket.io';


@WebSocketGateway() // it allows to have  socket.io functionality access
export class AppGateway implements OnGatewayConnection , OnGatewayInit, OnGatewayDisconnect {
 
  @WebSocketServer() server: Server ;  // It allows access to server websockets instance
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string):void {
  this.server.emit('msgToCliente', payload); // to send data to all connected clients
  }

  afterInit(server: Server){
    this.logger.log('Init');
  }

  /*This method register when a new client 
  is connected to the server*/
  handleConnection(client: Socket){
    this.logger.log(`Client connected ${client.id}`);
  }

  /* This method register when a  client 
     is disconnected to the server*/
  handleDisconnect(client: Socket){
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
