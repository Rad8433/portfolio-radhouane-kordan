const galerieChatApp = Vue.createApp({
  data() {
    return {
      imagesArr: [],
      index: 0,
      chatAlien: "images-chat-alien.json"
    };
  },
  methods: {
    getImages() {
      // aller chercher le nom du fichier de l'url "gallry-chat-alien.html"
      //fetch("./images-chat-alien.json")
      fetch(this.chatAlien)
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
}).mount("#galerieChat");



const galerieChevalierApp = Vue.createApp({
  data() {
    return {
      imagesArr: [],
      index: 0,
    };
  },
  methods: {
    getImages() {
      fetch("./images-devoir-du-chevalier.json")
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
}).mount("#galerieChevalier");

const galerieLaMachineApp = Vue.createApp({
  data() {
    return {
      imagesArr: [],
      index: 0,
    };
  },
  methods: {
    getImages() {
      fetch("./images-la-machine.json")
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
}).mount("#galerieLaMachine");

const galeriePortraitsApp = Vue.createApp({
  data() {
    return {
      imagesArr: [],
      index: 0,
    };
  },
  methods: {
    getImages() {
      fetch("./images-portraits.json")
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
}).mount("#galeriePortraits");
