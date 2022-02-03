import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="rooms"
export default class extends Controller {
  connect() {
    console.log("Connected to Rooms Controller");
  }

  call_user() {
    console.log("Calling user");
  }
}
