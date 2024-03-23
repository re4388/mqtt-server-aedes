import Aedes from "aedes";
import { createServer } from "net";

const aedes = new Aedes();

// mqtt over tcp
const server = createServer(aedes.handle);

// 監聽 client 連線事件
aedes.on("client", function (client) {
  console.log(
    `CLIENT_CONNECTED : MQTT Client ${
      client ? client.id : client
    } connected to aedes broker ${aedes.id}`
  );
});


// 監聽 client 斷線事件
aedes.on("clientDisconnect", function (client) {
  console.log(
    `CLIENT_DISCONNECTED : MQTT Client ${
      client ? client.id : client
    } disconnected from the aedes broker ${aedes.id}`
  );
});


// 監聽 client 訂閱事件
aedes.on("subscribe", function (subscriptions, client) {
  console.log(
    `TOPIC_SUBSCRIBED : MQTT Client ${
      client ? client.id : client
    } subscribed to topic: ${subscriptions
      .map((s) => s.topic)
      .join(",")} on aedes broker ${aedes.id}`
  );
});


// 監聽 client 取消訂閱事件
aedes.on("unsubscribe", function (subscriptions, client) {
  console.log(
    `TOPIC_UNSUBSCRIBED : MQTT Client ${
      client ? client.id : client
    } unsubscribed to topic: ${subscriptions.join(",")} from aedes broker ${
      aedes.id
    }`
  );
});


// 監聽 client 發佈訊息事件
aedes.on("publish", function (packet, client) {
  if (client) {
    console.log(
      `MESSAGE_PUBLISHED : MQTT Client ${
        client ? client.id : "AEDES BROKER_" + aedes.id
      } has published message "${packet.payload}" on ${
        packet.topic
      } to aedes broker ${aedes.id}`
    );
  }
});

const port = 1888;
server.listen(port, function () {
  console.log("server started and listening on port ", port);
});
