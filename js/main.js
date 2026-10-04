import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

/* =========================================================
   NJOY CREATIONS
   MAIN.JS
========================================================= */

/* =========================================================
   LOADER
========================================================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader?.classList.add("hide");
    }, 1200);
});

/* =========================================================
   MOBILE MENU
========================================================= */
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");

menuButton?.addEventListener("click", () => {
    mobileMenu?.classList.add("open");
    document.body.style.overflow = "hidden";
});

mobileClose?.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".mobile-menu-links a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});

function closeMobileMenu() {
    mobileMenu?.classList.remove("open");
    document.body.style.overflow = "";
}

/* =========================================================
   CUSTOM CURSOR
========================================================= */
const cursor = document.getElementById("cursor");

let cursorMouseX = 0;
let cursorMouseY = 0;

let cursorX = 0;
let cursorY = 0;

window.addEventListener("pointermove", event => {
    cursorMouseX = event.clientX;
    cursorMouseY = event.clientY;
});

function animateCursor() {

    cursorX +=
        (cursorMouseX - cursorX) * 0.18;

    cursorY +=
        (cursorMouseY - cursorY) * 0.18;

    if (cursor) {

        cursor.style.left =
            `${cursorX}px`;

        cursor.style.top =
            `${cursorY}px`;
    }

    requestAnimationFrame(animateCursor);
}

animateCursor();

document
    .querySelectorAll("a, button, .card, .service, .pill")
    .forEach(element => {

        element.addEventListener("mouseenter", () => {
            cursor?.classList.add("big");
        });

        element.addEventListener("mouseleave", () => {
            cursor?.classList.remove("big");
        });

    });

/* =========================================================
   NAVBAR
========================================================= */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 60) {

        navbar.style.background =
            "rgba(8,8,8,.78)";

        navbar.style.backdropFilter =
            "blur(16px)";

    } else {

        navbar.style.background =
            "linear-gradient(180deg,rgba(8,8,8,.72),transparent)";

        navbar.style.backdropFilter =
            "blur(8px)";
    }

}, { passive: true });

/* =========================================================
   SCROLL REVEAL
========================================================= */
const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });

        },
        {
            threshold: 0.08
        }
    );

document
    .querySelectorAll(".reveal")
    .forEach(element => {
        revealObserver.observe(element);
    });

/* =========================================================
   NJOY 3D ORB
========================================================= */
const orbContainer =
    document.getElementById("orb-container");

console.log("NJOY ORB CHECK");
console.log("THREE:", typeof THREE);
console.log("ORB CONTAINER:", orbContainer);

if (!orbContainer) {

    console.error(
        "NJOY: #orb-container not found."
    );

} else {

    console.log(
        "NJOY: Three.js loaded successfully."
    );

    console.log(
        "NJOY: Orb container found."
    );


    /* =====================================================
       SCENE
    ===================================================== */

    const scene =
        new THREE.Scene();


    /* =====================================================
       CAMERA
    ===================================================== */

    const camera =
        new THREE.PerspectiveCamera(
            45,
            orbContainer.clientWidth /
                orbContainer.clientHeight,
            0.1,
            100
        );

    camera.position.set(
        0,
        0,
        5
    );


    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer =
        new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );

    renderer.setSize(
        orbContainer.clientWidth,
        orbContainer.clientHeight
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure =
        1.2;

    renderer.domElement.style.width =
        "100%";

    renderer.domElement.style.height =
        "100%";

    renderer.domElement.style.display =
        "block";

    orbContainer.appendChild(
        renderer.domElement
    );


    /* =====================================================
       ORB GROUP
    ===================================================== */

    const orbGroup =
        new THREE.Group();

    scene.add(orbGroup);


    /* =====================================================
       MAIN ORB
    ===================================================== */

    const geometry =
        new THREE.IcosahedronGeometry(
            1.55,
            5
        );

    const material =
        new THREE.MeshStandardMaterial({

            color: 0xD6B477,

            roughness: 0.2,

            metalness: 0.1

        });

    const sphere =
        new THREE.Mesh(
            geometry,
            material
        );

    orbGroup.add(sphere);


    /* =====================================================
       LIGHTING
    ===================================================== */

    const ambient =
        new THREE.AmbientLight(
            0xF7F4EC,
            1.5
        );

    scene.add(ambient);


    const violet =
        new THREE.PointLight(
            0xD6B477,
            18,
            10
        );

    violet.position.set(
        -2.5,
        2,
        4
    );

    scene.add(violet);


    const acid =
        new THREE.PointLight(
            0xD6B477,
            20,
            10
        );

    acid.position.set(
        2.5,
        1,
        4
    );

    scene.add(acid);


    const cyan =
        new THREE.PointLight(
            0xA98B5A,
            16,
            10
        );

    cyan.position.set(
        0,
        -2.5,
        3
    );

    scene.add(cyan);


    const orange =
        new THREE.PointLight(
            0xA98B5A,
            12,
            8
        );

    orange.position.set(
        2,
        -2,
        -2
    );

    scene.add(orange);


    /* =====================================================
       GLOW
    ===================================================== */

    const glowGeometry =
        new THREE.SphereGeometry(
            1.72,
            48,
            48
        );

    const glowMaterial =
        new THREE.MeshBasicMaterial({

            color: 0xD6B477,

            transparent: true,

            opacity: 0.10,

            side: THREE.BackSide,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });

    const glow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );

    orbGroup.add(glow);


    /* =====================================================
       PARTICLES
    ===================================================== */

    const particleCount = 300;

    const particlePositions =
        new Float32Array(
            particleCount * 3
        );

    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const radius =
            2.1 +
            Math.random() * 1.4;

        const theta =
            Math.random() *
            Math.PI * 2;

        const phi =
            Math.acos(
                2 * Math.random() - 1
            );

        particlePositions[i * 3] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);

        particlePositions[i * 3 + 1] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);

        particlePositions[i * 3 + 2] =
            radius *
            Math.cos(phi);
    }


    const particleGeometry =
        new THREE.BufferGeometry();

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            particlePositions,
            3
        )
    );


    const particleMaterial =
        new THREE.PointsMaterial({

            color: 0xD6B477,

            size: 0.018,

            transparent: true,

            opacity: 0.7,

            blending:
                THREE.AdditiveBlending,

            depthWrite: false

        });


    const particles =
        new THREE.Points(
            particleGeometry,
            particleMaterial
        );

    orbGroup.add(particles);


    /* =====================================================
       MOUSE
    ===================================================== */

    const mouse =
        new THREE.Vector2(0, 0);

    const targetMouse =
        new THREE.Vector2(0, 0);

    window.addEventListener(
        "pointermove",
        event => {

            targetMouse.x =
                (event.clientX /
                    window.innerWidth) *
                    2 -
                1;

            targetMouse.y =
                -(event.clientY /
                    window.innerHeight) *
                    2 +
                1;

        },
        {
            passive: true
        }
    );


    /* =====================================================
       ANIMATION
    ===================================================== */

    const clock =
        new THREE.Clock();

    function animateOrb() {

        requestAnimationFrame(
            animateOrb
        );

        const time =
            clock.getElapsedTime();


        /* Smooth mouse */

        mouse.x +=
            (targetMouse.x -
                mouse.x) *
            0.035;

        mouse.y +=
            (targetMouse.y -
                mouse.y) *
            0.035;


        /* Sphere rotation */

        sphere.rotation.y =
            time * 0.18;

        sphere.rotation.x =
            Math.sin(
                time * 0.4
            ) * 0.08;


        /* Floating */

        orbGroup.position.y =
            Math.sin(
                time * 0.7
            ) * 0.08;


        /* Mouse parallax */

        orbGroup.rotation.y +=
            (
                mouse.x * 0.35 -
                orbGroup.rotation.y
            ) * 0.025;

        orbGroup.rotation.x +=
            (
                mouse.y * 0.20 -
                orbGroup.rotation.x
            ) * 0.025;


        /* Particles */

        particles.rotation.y =
            time * 0.035;

        particles.rotation.x =
            Math.sin(
                time * 0.2
            ) * 0.04;


        /* Glow */

        const pulse =
            1 +
            Math.sin(
                time * 1.2
            ) * 0.025;

        glow.scale.setScalar(
            pulse
        );


        /* Render */

        renderer.render(
            scene,
            camera
        );
    }

    animateOrb();


    /* =====================================================
       RESIZE
    ===================================================== */

    function resizeOrb() {

        const width =
            orbContainer.clientWidth;

        const height =
            orbContainer.clientHeight;

        if (!width || !height) return;

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
            width,
            height
        );

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio || 1,
                2
            )
        );
    }

    window.addEventListener(
        "resize",
        resizeOrb
    );

    resizeOrb();
}


/* =========================================================
   CONTACT FORM
========================================================= */
const contactForm =
    document.getElementById("contactForm");

contactForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const button =
            contactForm.querySelector(
                "button"
            );

        if (!button) return;

        const original =
            button.textContent;

        button.textContent =
            "MESSAGE RECEIVED ✓";

        setTimeout(() => {

            button.textContent =
                original;

        }, 3500);

    }
);