

function locomotivescroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });


    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
locomotivescroll();

function navbaranimation (){
    gsap.to('#navigation svg', {
        transform: "translatey(-100%)",
        ScrollTrigger: {
            trigger: "#items",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }

    })

    gsap.to('#navigation svg', {
        transform: "translatey(-100%)",
        ScrollTrigger: {
            trigger: "#nav-part2",
            scroller: "#links",
            opacity:0,
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }

    })

}
navbaranimation()

function videoconenimation() {

    var conn = document.querySelector('#items2');
    var PLAY = document.querySelector("#PLAY")

    conn.addEventListener("mouseenter", function () {
        gsap.to(PLAY, {
            scale: 1,
            opacity: 1
        })
    })

    conn.addEventListener("mouseleave", function () {
        gsap.to(PLAY, {
            scale: 0,
            opacity: 0
        })
    })

    conn.addEventListener("mousemove", function (dets) {
        gsap.to(PLAY, {
            left: dets.x - 100,
            top: dets.y - 20
        })
    })
}
videoconenimation();

function mouseanimation() {
    // mouse move effect start
    addEventListener("mousemove", function (dets) {
        gsap.to('#circle', {
            left: dets.x,
            top: dets.y
        })
    })

    document.querySelectorAll(".child").forEach(function (elem) {
        elem.addEventListener("mouseenter", function () {
            gsap.to("#circle", {
                transform: "translate(-50%,-50%)",
                scale: 1
            })
        })
        elem.addEventListener("mouseleave", function () {
            gsap.to("#circle", {
                transform: "translate(-50%,-50%)",
                scale: 0
            })
        })
    })

    // mouse move effect end
}
mouseanimation()

function loadinganimation() {

    gsap.from('#items1 h1', {
        y: 100,
        opacity: 0,
        delay: 0.3,
        duration: 0.7,
        stagger: 0.3
    })

    gsap.from('#items2 video', {
        scale: 0.9,
        opacity: 0,
        delay: 1.3,
        duration: 0.5,
    })
}
loadinganimation();



