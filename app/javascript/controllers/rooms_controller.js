import { Controller } from "@hotwired/stimulus";
import Call from "../streaming/screensharing";

// Connects to data-controller="rooms"
export default class extends Controller {
  connect() {
    console.log("Connected to Rooms Controller");
  }

  call_user() {
    Call(this.element.dataset.user_id);
  }
}
