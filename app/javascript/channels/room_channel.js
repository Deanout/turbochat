import consumer from "./consumer";

const single_room = document.getElementById("single_room");
consumer.subscriptions.create(
  {
    channel: "RoomChannel",
    room: single_room.dataset.roomId,
  },
  {
    connected() {
      // Called when the subscription is ready for use on the server
      console.log("Hi");
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel
    },
  }
);
