gsap.registerPlugin(ScrollTrigger);

gsap.from(".ufo", {
  scrollTrigger: {
    trigger: ".ufo",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
  y: 100, // ufo monte
  opacity: 0,
  duration: 1.5,
  ease: "power2.out",
});

const appCartes = Vue.createApp({
  data() {
    return { projetsArr: [] };
  },
  methods: {
    getProjets() {
      fetch("./projets.json")
        .then((r) => r.json())
        .then((data) => (this.projetsArr = data));
    },
  },
  mounted() {
    this.getProjets();
  },
}).mount("#cartes");

const dispoApp = Vue.createApp({
  data() {
    return {
      isAvailable: true,
      seasonLabel: "Hiver 2026",
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
