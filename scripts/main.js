window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  // --- UFO ---
  let ufoFloat = null;

  const startFloat = () => {
    ufoFloat = gsap.to(".ufo", {
      y: "-=15",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  };

  gsap.fromTo(
    ".ufo",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".ufo",
        start: "top 60%",
        end: "top top",
        toggleActions: "play none none reverse",

        onLeave: () => {
          ufoFloat?.kill();
          gsap.to(".ufo", {
            opacity: 0,
            duration: 0.8,
          });
        },

        onEnterBack: () => {
          gsap.to(".ufo", {
            opacity: 1,
            duration: 0.8,
          });

          startFloat();
        },
      },

      onComplete: startFloat,
    },
  );
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
        .then((data) => {
          this.projetsArr = data;
        });
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

      if (arr?.length) {
        this.modalIndex = (this.modalIndex + 1) % arr.length;
      }
    },

    modalPrev() {
      const arr =
        this.modalMode === "gallery"
          ? this.selectedProject?.images
          : this.selectedProject?.processus;

      if (arr?.length) {
        this.modalIndex = (this.modalIndex - 1 + arr.length) % arr.length;
      }
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
