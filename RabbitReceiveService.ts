import * as amqp from 'amqplib/callback_api'

const functions = {
  receive: receive
}

function receive(queue: string) {
  amqp.connect('amqp://guan:fisk@192.168.1.27', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
  
      channel.assertQueue(queue, {
        durable: false
      });

      console.log(" [*] Waiting for messages in %s.", queue);
      channel.consume(queue, function(msg) {
        console.log(" [x] Received %s", msg!.content.toString());
      }, {
        noAck: true
      });
    });
  });
}

export const rabbitReceiveService = functions;
