const galerieChatApp = Vue.createApp({
  data() {
    return {
      processusArr: [],
      index: 0,
    };
  },
  methods: {
    getProcessus() {
      fetch("./processus.json")
        .then((r) => r.json())
        .then((data) => (this.processusArr = data.images));
    },
    next() {
      if (this.index < this.processusArr.length - 1) {
        this.index++;
      }
    },
    prev() {
      if (this.index > 0) {
        this.index--;
      }
    },
  },
  mounted() {
    this.getProcessus();
  },
}).mount("#info-app");
