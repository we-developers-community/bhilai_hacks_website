
import GreenLeaf from "../assets/img/webpack/green.png";

import "../css/style.css";
import "../css/custom.css"
import "../css/flipdown.css";
import "./particles";

import ShortLogo from "../assets/img/webpack/bh-icon.png";
import BigLogo from "../assets/img/webpack/bh_logo_regular.png";

const FlipDown = require("./flipdown");


(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 20;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  let selectHeader = select("#header");
  let siteLogo = select("img#site-logo");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");

        // Change to `Biglogo` when site scrolled down the hero section
        siteLogo.src = BigLogo;
      } else {

           // Change to `ShortLogo` when site scrolled down the hero section
        selectHeader.classList.remove("header-scrolled");
        siteLogo.src = ShortLogo;
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  window.addEventListener("load", () => {
    document.getElementById("preload").style.display = "none";
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  // const glightbox = GLightbox({
  //   selector: ".glightbox",
  // });

  // new Swiper(".gallery-slider", {
  //   speed: 400,
  //   loop: true,
  //   centeredSlides: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false,
  //   },
  //   slidesPerView: "auto",
  //   pagination: {
  //     el: ".swiper-pagination",
  //     type: "bullets",
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     320: {
  //       slidesPerView: 1,
  //       spaceBetween: 20,
  //     },
  //     575: {
  //       slidesPerView: 2,
  //       spaceBetween: 20,
  //     },
  //     768: {
  //       slidesPerView: 3,
  //       spaceBetween: 20,
  //     },
  //     992: {
  //       slidesPerView: 5,
  //       spaceBetween: 20,
  //     },
  //   },
  // });

  // const galleryLightbox = GLightbox({
  //   selector: ".gallery-lightbox",
  // });

  on("show.bs.modal", "#buy-ticket-modal", function (event) {
    select(
      "#buy-ticket-modal #ticket-type"
    ).value = event.relatedTarget.getAttribute("data-ticket-type");
  });

  window.addEventListener("load", () => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  // For Flipdown.js
  document.addEventListener("DOMContentLoaded", () => {

    window.particlesJS("hero", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 600,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "image",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 6,
          },
          image: {
            src: GreenLeaf,
            width: 200,
            height: 200,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 8,
          random: true,
          anim: {
            enable: true,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 500,
          color: "#ffffff",
          opacity: 0.4,
          width: 2,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "bottom-left",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 2000,
            rotateY: 3000,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 0.5,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 0.3,
            opacity: 1,
            speed: 3,
          },
          repulse: {
            distance: 100,
            duration: 10,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
    window.particlesJS("contact-sec", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 600,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "image",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 6,
          },
          image: {
            src: GreenLeaf,
            width: 200,
            height: 200,
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 8,
          random: true,
          anim: {
            enable: true,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
          distance: 500,
          color: "#ffffff",
          opacity: 0.4,
          width: 2,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "bottom-left",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 2000,
            rotateY: 3000,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 0.5,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 0.3,
            opacity: 1,
            speed: 3,
          },
          repulse: {
            distance: 100,
            duration: 10,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });

    var eleCon=document.getElementById("contact");
    document.getElementById("contact-sec").style.height=(eleCon.offsetHeight-60)+"px";

// SHOW EFFEC WITH MOUSE

    var heroC=document.querySelector('#hero');
        var textC=hero.querySelector('#herotext');

        function shadow(e){
          if (window.innerWidth>900) {
            const width=heroC.offsetWidth;
            const height=heroC.offsetHeight;
            const walk=30;

            var x=e.offsetX;
            var y=e.offsetY; 

            if(this !==e.target){
                x=x+e.target.offsetLeft;
                y=y+e.target.offsetTop;
            }
            const xwalk=(x/width*walk)-(walk/2);
            const ywalk=(y/height*walk)-(walk/2);

            textC.style.textShadow=`${-xwalk}px ${-ywalk}px 2px black`;
          }
          else{
            console.log("ni chlega");
          }   
        }
        heroC.addEventListener('mousemove',shadow);
    // Unix timestamp (in seconds) to count down to
    // var endDate = parseInt((new Date("2021-04-24T00:00:00+05:30")/1000).toFixed(0));
    var endDate = 1621017000; //Unix timestamp for 2021-04-24T00:00:00+05:30
    // console.log(endDate);
    // Set up FlipDown
    var flipdown = new FlipDown(endDate)
      // Start the countdown
      .start()
      // Do something when the countdown ends
      .ifEnded(() => {
        //Write Celebration animation code
        // console.log("The countdown has ended!");
      });

    var ver = document.getElementById("ver");
    // ver.innerHTML = flipdown.version;
  });

})();
