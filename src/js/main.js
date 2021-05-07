import "../css/style.css";
import "../css/custom.css";
import "../css/flipdown.css";

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
    // Unix timestamp (in seconds) to count down to
    // var endDate = parseInt((new Date("2021-04-24T00:00:00+05:30")/1000).toFixed(0));
    var endDate = 1621081800; //Unix timestamp for 2021-05-15 6 PM
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

    if (window.location.hash) {
      const someModal = new bootstrap.Modal(
        document.querySelector(window.location.hash),
        {}
      );
      someModal.show();
    }
  });
})();
