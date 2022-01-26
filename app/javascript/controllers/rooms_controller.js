import { Controller } from "@hotwired/stimulus";
import Call from "../streaming/screensharing";

// Connects to data-controller="rooms"
export default class extends Controller {
  connect() {
    console.log("Connecting to socket.io");
  }

  call_user() {
    Call();
  }
}
