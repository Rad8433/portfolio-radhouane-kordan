const galerieChatApp = Vue.createApp({
  data() {
    return {
      imagesArr: [],
      index: 0,
     /* chatAlien: "images-chat-alien.json"*/
    };
  },
  methods: {
    getImages() {
      // aller chercher le paramètre d'url p et storer le resultat dans une variable.
      //fetch("./images-chat-alien.json")
      const urlparam = new URLSearchParams(window.location.search);
      const paramValue = urlparam.get('p');
      const hasParam = urlparam.has('p');
      console.log(paramValue);
      fetch("images-"+paramValue+".json")
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


