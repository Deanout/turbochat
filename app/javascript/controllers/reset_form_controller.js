import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  reset() {
    alert("Test");
    this.element.reset();
  }
}
