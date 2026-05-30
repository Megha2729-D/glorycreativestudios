(function ($) {
    "use strict";

    AOS.init();

    window.gsapAnimations = function () {
        initGlobalFadeAnimations();
        initPxnZoom();
        initSplitTextAnimations();
        initPxnCharsUp();
        initPxnImageReveal();
        initPxnZoomIn();
        initPxnHoverButtons();
        initPxnBgParallax();
        initPxnCharsReveal();
    };
    ////////////////////////////////////////////////////
    // Preloader
    $(window).on("load", function () {
        const pxnPreloader = $("#pxn-preloader");
        if (pxnPreloader.length > 0) {
            setTimeout(function () {
                pxnPreloader.addClass("is-loaded");
                pxnPreloader.fadeOut(600);
                gsapAnimations();
            }, 1000);
        } else {
            gsapAnimations();
        }
    });

    ////////////////////////////////////////////////////
    // Cursor
    if ($(".mouse-cursor").length && $(".cursor-inner").length && $(".cursor-outer").length) {

        const inner = document.querySelector(".cursor-inner");
        const outer = document.querySelector(".cursor-outer");

        // Hide on mobile / touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            inner.style.display = "none";
            outer.style.display = "none";
        } else {

            let cursorVisible = false;

            window.addEventListener("mousemove", function (e) {
                outer.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                inner.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

                if (!cursorVisible) {
                    inner.classList.add("cursor-visible");
                    outer.classList.add("cursor-visible");

                    inner.classList.remove("cursor-hidden");
                    outer.classList.remove("cursor-hidden");

                    cursorVisible = true;
                }
            });

            document.addEventListener("mouseleave", function () {
                inner.classList.remove("cursor-visible");
                outer.classList.remove("cursor-visible");

                inner.classList.add("cursor-hidden");
                outer.classList.add("cursor-hidden");

                cursorVisible = false;
            });

            document.addEventListener("mouseenter", function () {
                inner.classList.add("cursor-visible");
                outer.classList.add("cursor-visible");

                inner.classList.remove("cursor-hidden");
                outer.classList.remove("cursor-hidden");

                cursorVisible = true;
            });

            $("body").on("mouseenter", "a, .cursor-pointer", function () {
                inner.classList.add("cursor-hover");
                outer.classList.add("cursor-hover");
            });

            $("body").on("mouseleave", "a, .cursor-pointer", function () {
                inner.classList.remove("cursor-hover");
                outer.classList.remove("cursor-hover");
            });
        }
    }


    ////////////////////////////////////////////////////
    // Mobile Menu
    if ($("#mobile-menu").length) {
        $("#mobile-menu").meanmenu({
            meanMenuContainer: ".mobile_menu",
            meanScreenWidth: "991",
            meanExpand: ['<i class="pxni-angle-down"></i>'],
        });
    }

    ////////////////////////////////////////////////////
    // Offcanvas Menu
    if ($(".pxn_offcanvas").length) {
        $(".pxn_offcanvas_toggle").on("click", function () {
            $(".pxn_offcanvas").addClass("opened");
            $(".pxn_offcanvas_overlay").addClass("opened");
        });

        $(".offcanvas_close").on("click", function () {
            $(".pxn_offcanvas").removeClass("opened");
            $(".pxn_offcanvas_overlay").removeClass("opened");
        });
        $(".pxn_offcanvas_overlay").on("click", function () {
            $(".pxn_offcanvas").removeClass("opened");
            $(this).removeClass("opened");
        });
    }

    ////////////////////////////////////////////////////
    // Heder Sticky
    var lastScrollTop = "";

    function stickyMenu($targetMenu, $toggleClass) {
        var st = $(window).scrollTop();
        if ($(window).scrollTop() > 500) {
            if (st > lastScrollTop) {
                $targetMenu.removeClass($toggleClass);
            } else {
                $targetMenu.addClass($toggleClass);
            }
        } else {
            $targetMenu.removeClass($toggleClass);
        }

        lastScrollTop = st;
    }

    $(window).on("scroll", function () {
        if ($(".pxn-header").length) {
            stickyMenu($(".header-sticky"), "sticky");
        }
    });

    var $window = $(window);

    var scrollToTopBtn = ".scrollToTop";

    $window.on("scroll", function () {
        if ($window.scrollTop() > 500) {
            $(scrollToTopBtn).addClass("show");
        } else {
            $(scrollToTopBtn).removeClass("show");
        }
    });

    $window.on("resize", function () {
        if ($stickyWrapper.hasClass("will-sticky")) {
            $stickyWrapper.css("min-height", $stickyTarget.outerHeight() + "px");
        }
    });

    /*---------- 05. Scroll To Top ----------*/
    $(scrollToTopBtn).each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            console.log("scroll to top clicked");
            $("html, body").animate({
                scrollTop: 0,
            },
                1000
            );
            return false;
        });
    });

    /* ================================
   Smooth Scroller And Title Animation Js Start
================================ */
    if ($('#smooth-wrapper').length && $('#smooth-content').length) {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

        gsap.config({
            nullTargetWarn: false,
        });

        let smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 2,
            effects: true,
            smoothTouch: 0.1,
            normalizeScroll: false,
            ignoreMobileResize: true,
        });
    }

    /* ================================
       Text Anim Js Start
    ================================ */

    /* ================================
         Text Title Animation Js Start
      ================================ */

    if (typeof gsap !== "undefined") {
        gsap.registerPlugin(ScrollTrigger, SplitText);

        let mm = gsap.matchMedia();

        mm.add("(min-width: 1200px)", () => {

            let splits = [];

            // ===== tz-sub-tilte =====
            $('.tz-sub-tilte').each(function (index, el) {

                let split = new SplitText(el, {
                    type: "lines,words,chars",
                    linesClass: "split-line"
                });

                splits.push(split);

                gsap.set(split.chars, {
                    opacity: 0,
                    x: 7
                });

                gsap.to(split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        end: "top 60%",
                        scrub: 1
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2
                });
            });

            // ===== tz-itm-title =====
            $('.tz-itm-title').each(function (index, el) {

                let split = new SplitText(el, {
                    type: "lines,words,chars",
                    linesClass: "split-line"
                });

                splits.push(split);

                gsap.set(split.chars, {
                    opacity: 0.3,
                    x: -7
                });

                gsap.to(split.chars, {
                    scrollTrigger: {
                        trigger: el,
                        start: "top 92%",
                        end: "top 60%",
                        scrub: 1
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.2
                });
            });

            // 🔥 MOST IMPORTANT PART
            ScrollTrigger.refresh();

            // 🔥 cleanup on breakpoint change
            return () => {
                splits.forEach(split => split.revert());
                ScrollTrigger.getAll().forEach(st => st.kill());
            };

        });
    }

    if ($('.char-animation').length > 0) {
        let char_come = gsap.utils.toArray(".char-animation");
        char_come.forEach(splitTextLine => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: splitTextLine,
                    start: 'top 90%',
                    end: 'bottom 60%',
                    scrub: false,
                    markers: false,
                    toggleActions: 'play none none none'

                }
            });

            const itemSplitted = new SplitText(splitTextLine, {
                type: "chars, words"
            });
            gsap.set(splitTextLine, {
                perspective: 300
            });
            itemSplitted.split({
                type: "chars, words"
            })
            tl.from(itemSplitted.chars, {
                duration: 1,
                delay: 0.5,
                x: 100,
                autoAlpha: 0,
                stagger: 0.05
            });
        });
    }

    // match media
    let mediaMatch = gsap.matchMedia();

    // Fade Animation
    function initGlobalFadeAnimations() {
        const fadeItems = gsap.utils.toArray(".pxn-fade");
        if (!fadeItems.length) return;

        const isRTL = document.documentElement.dir === "rtl"; // detect RTL

        fadeItems.forEach(item => {
            // Read data attributes
            const onscroll = parseInt(item.getAttribute("data-on-scroll")) || 1;
            const offset = parseInt(item.getAttribute("data-offset")) || 40;
            const delay = parseFloat(item.getAttribute("data-delay")) || 0.15;
            const duration = parseFloat(item.getAttribute("data-duration")) || 1.15;
            const direction = item.getAttribute("data-direction") || "bottom";
            const easeValue = item.getAttribute("data-ease") || "power2.out";

            // Determine initial x/y based on direction
            let x = 0,
                y = 0;

            switch (direction.toLowerCase()) {
                case "left":
                    x = isRTL ? offset : -offset;
                    break;
                case "right":
                    x = isRTL ? -offset : offset;
                    break;
                case "top":
                    y = -offset;
                    break;
                case "bottom":
                    y = offset;
                    break;
            }

            // Base animation settings
            const animSettings = {
                autoAlpha: 0,
                x: x,
                y: y,
                ease: easeValue,
                duration: duration,
                delay: delay,
            };

            // Add ScrollTrigger if required
            if (onscroll === 1 && typeof ScrollTrigger !== "undefined") {
                animSettings.scrollTrigger = {
                    trigger: item,
                    start: "top 85%",
                    // you can add toggleActions, markers for debugging
                    // toggleActions: "play none none none",
                    // invalidateOnRefresh: true,
                };
            }

            // Set initial state visible to prevent flash
            gsap.set(item, {
                autoAlpha: 1
            });

            // Run animation
            gsap.from(item, animSettings);
        });
    }

    // Zoom Animation
    function initPxnZoom() {
        const zoomItems = gsap.utils.toArray(".pxn-zoom");

        if (!zoomItems.length) return;

        zoomItems.forEach(item => {
            let onscrollValue = item.getAttribute("data-on-scroll") || 1,
                startScale = item.getAttribute("data-scale") || 0.5,
                delayValue = item.getAttribute("data-delay") || 0,
                durationValue = item.getAttribute("data-duration") || 1,
                easeValue = item.getAttribute("data-ease") || "power2.out";

            let animationSetting = {
                scale: startScale,
                autoAlpha: 0,
                duration: durationValue,
                delay: delayValue,
                ease: easeValue,
            };

            if (onscrollValue == 1) {
                animationSetting.scrollTrigger = {
                    trigger: item,
                    start: "top 85%",
                };
            }

            gsap.set(item, {
                autoAlpha: 1
            });

            gsap.from(item, animationSetting);
        });
    }

    // Split Text
    function initSplitTextAnimations() {
        const splitTextElements = gsap.utils.toArray(".pxn-split-text");
        if (!splitTextElements.length) return;

        const isRTL = document.documentElement.dir === "rtl"; // detect RTL

        splitTextElements.forEach(element => {
            // Read data attributes
            let staggerAmount = parseFloat(element.getAttribute("data-stagger")) || 0.02;
            let translateXValue = parseFloat(element.getAttribute("data-x")) || 30;
            const translateYValue = parseFloat(element.getAttribute("data-y")) || 0;
            const delayValue = parseFloat(element.getAttribute("data-delay")) || 0.3;
            const durationValue = parseFloat(element.getAttribute("data-duration")) || 1;
            const easeType = element.getAttribute("data-ease") || "power2.out";

            // Flip X in RTL
            if (isRTL) translateXValue = -translateXValue;

            // Split text
            const splitInstance = new SplitText(element, {
                type: "chars, words",
                charsClass: "pxn-char",
                wordsClass: "pxn-word",
            });

            // Animate characters
            gsap.from(splitInstance.chars, {
                duration: durationValue,
                delay: delayValue,
                x: translateXValue,
                y: translateYValue,
                autoAlpha: 0,
                ease: easeType,
                stagger: staggerAmount,
                scrollTrigger: {
                    // markers: true,
                    trigger: element,
                    start: "top 85%",
                    invalidateOnRefresh: true,
                },
            });
        });
    }

    // Chars up
    function initPxnCharsUp() {
        const elements = gsap.utils.toArray(".pxn-chars-up");
        if (!elements.length) return;

        const isRTL = document.documentElement.dir === "rtl";

        elements.forEach(element => {
            const split = new SplitText(element, {
                type: "chars,lines",
                charsClass: "pxn-char",
                linesClass: "pxn-line",
            });

            // Prevent char overflow
            gsap.set(split.lines, {
                overflow: "hidden"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
            });

            tl.from(split.chars, {
                yPercent: 100,
                duration: 0.35,
                ease: "power2.out",
                stagger: {
                    amount: 0.6,
                    from: isRTL ? "end" : "start",
                },
            });
        });
    }

    // Chars reveal
    function initPxnCharsReveal() {
        const elements = gsap.utils.toArray(".pxn-chars-reveal");
        if (!elements.length) return;

        const isRTL = document.documentElement.dir === "rtl";

        elements.forEach(element => {
            const split = new SplitText(element, {
                type: "lines,words,chars",
                linesClass: "pxn-line",
                wordsClass: "pxn-word",
                charsClass: "pxn-char",
            });

            // Initial state
            gsap.set(split.chars, {
                opacity: 0.3,
                x: isRTL ? 7 : -7, // RTL support
            });

            gsap.to(split.chars, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power2.out",
                stagger: 0.03,

                scrollTrigger: {
                    trigger: element,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 1.2,
                    once: true,
                },
            });
        });
    }

    // Image reveal
    function initPxnImageReveal() {
        // Select all image reveal containers
        const revealItems = gsap.utils.toArray(".pxn-img-reveal");

        if (!revealItems.length) return;

        const isRTL = document.documentElement.dir === "rtl";

        revealItems.forEach(container => {
            const image = container.querySelector("img");
            if (!image) return;

            // Timeline for this element
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 70%",
                    // invalidateOnRefresh: true,
                },
            });

            // Make container visible
            tl.set(container, {
                autoAlpha: 1
            });

            // Slide in container from left
            tl.from(container, {
                duration: 1.5,
                xPercent: isRTL ? 100 : -100,
                ease: "power2.out",
            });

            // Slide image from right + scale
            tl.from(image, {
                duration: 1.5,
                xPercent: isRTL ? -100 : 100,
                scale: 1.3,
                ease: "power2.out",
                delay: -1.5, // overlap with container animation
            });
        });
    }

    // Image zoom in
    function initPxnZoomIn() {
        const zoomItems = gsap.utils.toArray(".pxn-zoom-in");

        if (!zoomItems.length) return;

        zoomItems.forEach(element => {
            // Wrap element in a container for overflow hidden if not already wrapped
            if (!element.parentElement.classList.contains("pxn-zoom-in-wrap")) {
                const wrap = document.createElement("div");
                wrap.classList.add("pxn-zoom-in-wrap");
                wrap.style.overflow = "hidden";

                element.parentNode.insertBefore(wrap, element);
                wrap.appendChild(element);
            }

            const container = element.parentElement;

            // Timeline with ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 90%",
                    markers: false,
                    // invalidateOnRefresh: true,
                },
            });

            // Animate element
            tl.from(element, {
                duration: 1.5,
                // autoAlpha: 0,
                scale: 1.15,
                ease: "power2.out",
                clearProps: "all", // removes inline styles after animation
            });
        });
    }

    // Hover buttons
    function initPxnHoverButtons() {
        const wrappers = gsap.utils.toArray(".pxn-hover-btn-wrapper");
        const items = gsap.utils.toArray(".pxn-hover-btn-item");

        if (!wrappers.length || !items.length) return;

        wrappers.forEach((wrapper, i) => {
            const target = items[i];
            if (!target) return;

            // Mouse move event
            wrapper.addEventListener("mousemove", e => {
                parallaxMove(e, wrapper, target, 30);
            });

            // Mouse leave event → reset
            wrapper.addEventListener("mouseleave", () => {
                gsap.to(target, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    ease: "power2.out",
                });
            });
        });

        // Parallax calculation
        function parallaxMove(e, wrapper, target, movement) {
            const rect = wrapper.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;

            gsap.to(target, {
                duration: 1,
                x: ((relX - rect.width / 2) / rect.width) * movement,
                y: ((relY - rect.height / 2) / rect.height) * movement,
                ease: "power2.out",
            });
        }
    }

    // Image parallax
    function initPxnBgParallax() {
        const items = gsap.utils.toArray(".pxn-img-parallax");

        if (!items.length) return;

        items.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 40;

            // Set initial background
            gsap.set(el, {
                backgroundPosition: "50% 0%",
            });

            gsap.to(el, {
                backgroundPosition: `50% ${speed}%`,
                ease: "none",
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        });
    }
})(jQuery);