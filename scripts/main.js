gsap.registerPlugin(ScrollTrigger);

// animation gsap sur l'ufo
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
});

// fetch pour projets.json
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
      isAvailable: false,
      seasonLabel: "Printemps 2026",
    };
  },

  methods: {
    textDispo() {
      if (this.isAvailable) {
        return `✅ Disponible pour un stage ${this.seasonLabel}`;
      } else {
        return "⛔ Déjà engagé / non disponible";
      }
    },
  },
}).mount("#dispo-app");

// galerie / processus
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
      const mode = qs.get("mode"); // 👈 ADD THIS

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

          // 👇 THIS IS THE KEY FIX
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
