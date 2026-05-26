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
          gsap.to(".ufo", { opacity: 0, duration: 0.8 });
        },
        onEnterBack: () => {
          gsap.to(".ufo", { opacity: 1, duration: 0.8 });
          startFloat();
        },
      },
      onComplete: startFloat,
    },
  );

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

  // --- Content blocks ---
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
        .then((data) => {
          this.projetsArr = data;
          this.$nextTick(() => {
            const initCardAnimations = () => {
              ScrollTrigger.getAll()
                .filter((st) => st.vars?.id === "card-row")
                .forEach((st) => st.kill());

              const cards = document.querySelectorAll(".projet-card");
              const grid = document.querySelector(".projets-grid");
              const colCount = Math.round(
                grid.offsetWidth / cards[0].offsetWidth,
              );

              const rows = [];
              for (let i = 0; i < cards.length; i += colCount) {
                rows.push(Array.from(cards).slice(i, i + colCount));
              }

              rows.slice(0, -1).forEach((row, i) => {
                const nextRow = rows[i + 1];
                const triggerEl = nextRow[0];
                row.forEach((card) => {
                  gsap.to(card, {
                    scrollTrigger: {
                      id: "card-row",
                      trigger: triggerEl,
                      start: "top 80%",
                      end: "top 20%",
                      scrub: true,
                    },
                    y: -50,
                    opacity: 0,
                  });
                });
              });

              ScrollTrigger.refresh();
            };

            initCardAnimations();

            let resizeTimer;
            const resizeObserver = new ResizeObserver(() => {
              clearTimeout(resizeTimer);
              resizeTimer = setTimeout(() => {
                document.querySelectorAll(".projet-card").forEach((card) => {
                  gsap.set(card, { y: 0, opacity: 1 });
                });
                initCardAnimations();
              }, 200);
            });

            resizeObserver.observe(document.querySelector(".projets-grid"));
          });
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
