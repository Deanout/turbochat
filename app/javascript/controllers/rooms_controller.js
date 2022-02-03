import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="rooms"
export default class extends Controller {
  connect() {
    console.log("Connecting to socket.io");
  }

  call_user() {}
}
