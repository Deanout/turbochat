import consumer from "./consumer";

consumer.subscriptions.create(
  {
    channel: "AppearanceChannel",
  },
  {
    // Called once when the subscription is created.
    initialized() {
      this.update = this.update.bind(this);
      this.awayTimer();
    },
    // Called when the subscription is ready for use on the server.
    connected() {
      this.online();
    },

    // Called when the WebSocket connection is closed.
    disconnected() {
      console.log("offline");
      this.uninstall();
    },

    // Called when the subscription is rejected by the server.
    rejected() {
      this.uninstall();
    },
    /**
     * Called when the document is active.
     */
    update() {
      // console.log("Update");
      this.documentIsActive ? this.online() : this.away();
    },
    online() {
      // console.log("online");
      this.perform("online");
    },
    away() {
      this.perform("away");
    },
    awayTimer() {
      let timer;
      window.onload = resetTimer;
      //window.onmousemove = resetTimer;
      window.onmousedown = resetTimer; // catches touchscreen presses as well
      window.ontouchstart = resetTimer; // catches touchscreen swipes as well
      window.ontouchmove = resetTimer; // required by some devices
      window.onclick = resetTimer; // catches touchpad clicks as well
      window.onkeydown = resetTimer;
      window.addEventListener("scroll", resetTimer, true); // improved; see comments

      const setAwayStatus = function () {
        console.log("Away");
        this.away();
      }.bind(this);

      const setOnlineStatus = function () {
        console.log("Online");
        this.online();
      }.bind(this);

      function resetTimer() {
        clearTimeout(timer);
        setOnlineStatus();
        const timeInSeconds = 300;
        const milliseconds = 1000;
        const timeInMilliseconds = timeInSeconds * milliseconds;
        timer = setTimeout(setAwayStatus, timeInMilliseconds); // time is in milliseconds
      }
    },
  }
);

/**
import consumer from "./consumer";
let time = 0;
consumer.subscriptions.create(
  {
    channel: "AppearanceChannel",
  },
  {
    // Called once when the subscription is created.
    initialized() {
      this.update = this.update.bind(this);
    },
    // Called when the subscription is ready for use on the server.
    connected() {
      this.install();
      this.update();
    },

    // Called when the WebSocket connection is closed.
    disconnected() {
      this.uninstall();
    },

    // Called when the subscription is rejected by the server.
    rejected() {
      this.uninstall();
    },

     update() {
      this.documentIsActive ? this.online() : this.away();
    },
    online() {
      window.test = this;
      this.perform("online", { appearing_on: this.appearingOn });
    },
    away() {
      this.perform("away");
    },
    install() {
      window.addEventListener("focus", this.update);
      window.addEventListener("blur", this.update);
      document.addEventListener("turbolinks:load", this.update);
      document.addEventListener("visibilitychange", this.update);
    },
    uninstall() {
      window.removeEventListener("focus", this.update);
      window.removeEventListener("blur", this.update);
      document.removeEventListener("turbolinks:load", this.update);
      document.removeEventListener("visibilitychange", this.update);
    },
    get documentIsActive() {
      const targeted =
        document.visibilityState === "visible" && document.hasFocus();
      if (targeted) {
        this.timer(0);
      }
      return targeted;
    },
    get appearingOn() {
      const element = document.querySelector("[data-appearing-on]");
      return element ? element.dataset.appearingOn : null;
    },
    timer(newTime) {
      console.log(time);
      if (newTime !== null) {
        time = newTime;
      }
      if (time >= 59) {
        this.away();
      } else {
        this.online();
      }
    },
  }
);

*/
