gsap.registerPlugin(ScrollTrigger);

gsap.from(".ufo", {
  scrollTrigger: {
    trigger: ".ufo",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 100,
  opacity: 0,
  duration: 1.5,
  ease: "power2.out",
  onComplete: () => {
    gsap.to(".ufo", {
      y: "-=15",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  },
});

const appCartes = Vue.createApp({
  data() {
    return { projetsArr: [] };
  },

  methods: {
    getProjets() {
      fetch("./data/projets.json")
        .then((r) => r.json())
        .then((data) => (this.projetsArr = data));
    },
  },

  mounted() {
    this.getProjets();
  },
}).mount("#cartes");

// widget dispo
const dispoApp = Vue.createApp({
  data() {
    return {
      isAvailable: true,
    };
  },

  methods: {
    textDispo() {
      if (this.isAvailable) {
        return `✅ À la recherche d'un emploi`;
      } else {
        return "⛔ Déjà engagé / non disponible";
      }
    },
  },
}).mount("#dispo-app");

const galerieApp = Vue.createApp({
  data() {
    return {
      imagesArr: [],
      processusArr: [],
      index: 0,
      mode: "gallery",
    };
  },

  methods: {
    getData() {
      const qs = new URLSearchParams(window.location.search);
      const p = qs.get("p");
      const mode = qs.get("mode");

      fetch("./data/projets.json")
        .then((r) => r.json())
        .then((data) => {
          const project = data.find((item) => item.param === `?p=${p}`);

          if (!project) {
            console.error("Projet introuvable pour:", p);
            return;
          }

          this.imagesArr = project.images || [];
          this.processusArr = project.processus || [];

          if (mode === "processus" && this.processusArr.length) {
            this.mode = "processus";
          } else {
            this.mode = "gallery";
          }
        });
    },

    nextImg() {
      const currentArr =
        this.mode === "gallery" ? this.imagesArr : this.processusArr;

      this.index = (this.index + 1) % currentArr.length;
    },

    prevImg() {
      const currentArr =
        this.mode === "gallery" ? this.imagesArr : this.processusArr;

      this.index = (this.index - 1 + currentArr.length) % currentArr.length;
    },

    setMode(newMode) {
      this.mode = newMode;
      this.index = 0;
    },
  },

  mounted() {
    this.getData();
  },
}).mount("#gallery-app");
