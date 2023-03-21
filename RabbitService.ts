import * as amqp from 'amqplib/callback_api'

const functions = {
  connect: connect
}

function connect(): void {
  amqp.connect('amqp://guan:fisk@192.168.1.27', function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }
      var queue = 'hello';
      var msg = 'Hello world3';
  
      channel.assertQueue(queue, {
        durable: false
      });
  
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(" [x] Sent %s", msg);
    });
    setTimeout(function() {
      connection.close();
      console.log(`Closed amqp connection.`);
    }, 500);
  });
}

export const rabbitService = functions;