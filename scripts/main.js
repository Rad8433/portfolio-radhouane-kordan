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

const app = Vue.createApp({
  data() {
    return { projetsArr: [] };
  },
  mounted() {
    fetch("./projets.json")
      .then((r) => r.json())
      .then((data) => (this.projetsArr = data));
  },
}).mount("#app");
