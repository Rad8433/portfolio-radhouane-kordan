const galerieChatApp = Vue.createApp({
  data() {
    return {
      imagesArr: [],
      index: 0,
    };
  },
  methods: {
    getImages() {
      const qs = new URLSearchParams(window.location.search);
      const p = qs.get("p");

      let jsonFile = null;

      if (p === "chat-alien") {
        jsonFile = "images-chat-alien.json";
      } else if (p === "portraits") {
        jsonFile = "images-autoportraits.json";
      } else if (p === "chevalier") {
        jsonFile = "images-chevalier.json";
      } else if (p === "la-machine") {
        jsonFile = "images-la-machine.json";
      } else {
        console.error("Paramètre inconnu:", p);
        return;
      }

      fetch(jsonFile)
        .then((r) => r.json())
        .then((data) => {
          this.imagesArr = data.images;
        });
    },
    nextImg() {
      this.index = (this.index + 1) % this.imagesArr.length;
    },
    prevImg() {
      this.index =
        (this.index - 1 + this.imagesArr.length) % this.imagesArr.length;
    },
  },
  mounted() {
    this.getImages();
  },
}).mount("#gallery-app");
