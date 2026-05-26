window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- Hero ---
  gsap.to(".titres", {
    scrollTrigger: {
      trigger: ".titres",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    opacity: 0,
  });

  // --- UFO ---
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

  // --- À propos text ---
  gsap.to(".texte-apropos", {
    scrollTrigger: {
      trigger: ".texte-apropos",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    opacity: 0,
  });

  // --- Content blocks (info + compétences) ---
  document.querySelectorAll(".content-block").forEach((block) => {
    gsap.to(block, {
      scrollTrigger: {
        trigger: block,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      opacity: 0,
    });
  });
});

Vue.createApp({
  data() {
    return {
      projetsArr: [],
      selectedProject: null,
      modalInstance: null,
      isAvailable: true,
      modalIndex: 0,
      modalMode: "gallery",
    };
  },

  methods: {
    getProjets() {
      fetch("./data/projets.json")
        .then((r) => r.json())
        .then((data) => (this.projetsArr = data));
    },

    openProject(projet) {
      this.selectedProject = projet;
      this.modalIndex = 0;
      this.modalMode = "gallery";
      this.$nextTick(() => {
        if (!this.modalInstance) {
          this.modalInstance = new bootstrap.Modal(
            document.getElementById("projectModal"),
          );
        }
        this.modalInstance.show();
      });
    },

    modalNext() {
      const arr =
        this.modalMode === "gallery"
          ? this.selectedProject?.images
          : this.selectedProject?.processus;
      if (arr?.length) this.modalIndex = (this.modalIndex + 1) % arr.length;
    },

    modalPrev() {
      const arr =
        this.modalMode === "gallery"
          ? this.selectedProject?.images
          : this.selectedProject?.processus;
      if (arr?.length)
        this.modalIndex = (this.modalIndex - 1 + arr.length) % arr.length;
    },

    textDispo() {
      return this.isAvailable
        ? "✅ À la recherche d'un emploi"
        : "⛔ Déjà engagé / non disponible";
    },
  },

  mounted() {
    this.getProjets();
  },
}).mount("#app");
