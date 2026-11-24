// ========================================
// SMALL HELPER
// ========================================

function setText(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.textContent = value ?? "";
    }
}


// ========================================
// CUSTOMER DETAILS
// ========================================

setText(
    "coupleNames",
    `${weddingDetails.groom} & ${weddingDetails.bride}`
);

// First-page split cover names, date, and couple initials
setText("gateCoupleNames", `${weddingDetails.groom} & ${weddingDetails.bride}`);
setText("gateWeddingDate", weddingDetails.date.toUpperCase());
setText("gateInitials", "");
const gateInitials = document.getElementById("gateInitials");
if (gateInitials) {
    gateInitials.innerHTML = `${weddingDetails.groom.trim().charAt(0).toUpperCase()} <i>&</i> ${weddingDetails.bride.trim().charAt(0).toUpperCase()}`;
}


// HERO - PARENTS
setText("heroGroomFather", weddingDetails.groomFather);
setText("heroGroomMother", weddingDetails.groomMother);

setText("heroBrideFather", weddingDetails.brideFather);
setText("heroBrideMother", weddingDetails.brideMother);


// HERO - DATE & TIME
setText("heroWeddingDay", weddingDetails.day.toUpperCase());
setText("heroWeddingDate", weddingDetails.date.toUpperCase());
setText("heroWeddingTime", weddingDetails.time);


// TRADITIONAL SECTION
setText(
    "traditionalNames",
    `${weddingDetails.groom} & ${weddingDetails.bride}`
);

setText("traditionalDate", weddingDetails.date);


// CEREMONY
setText("ceremonyTime", weddingDetails.ceremonyTime);
setText("ceremonyVenue", weddingDetails.ceremonyVenue);


// RECEPTION
setText("receptionTime", weddingDetails.receptionTime);
setText("receptionVenue", weddingDetails.receptionVenue);

// EVENT TIMELINE
setText("timelineCeremonyTime", weddingDetails.ceremonyTime);
setText("timelineCeremonyVenue", weddingDetails.ceremonyVenue);
setText("timelineReceptionTime", weddingDetails.receptionTime);
setText("timelineReceptionVenue", weddingDetails.receptionVenue);


// FOOTER
setText(
    "footerCoupleNames",
    `${weddingDetails.groom} & ${weddingDetails.bride}`
);

setText("footerWeddingDate", weddingDetails.date);


// ========================================
// MAP + WHATSAPP
// ========================================

const mapLink = document.getElementById("mapLink");

if (mapLink) {
    mapLink.href = weddingDetails.mapLink;
}


const rsvpMessage =
    `Hello ${weddingDetails.groom} & ${weddingDetails.bride}, I would like to RSVP for your wedding.`;

const whatsappRSVP = document.getElementById("whatsappRSVP");

if (whatsappRSVP) {
    whatsappRSVP.href =
        `https://wa.me/${weddingDetails.whatsapp}?text=${encodeURIComponent(rsvpMessage)}`;
}


const contactWhatsApp =
    document.getElementById("contactWhatsApp");

if (contactWhatsApp) {
    contactWhatsApp.href =
        `https://wa.me/${weddingDetails.whatsapp}`;
}


// ========================================
// MUSIC CONTROLS
// ========================================
const weddingMusic = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");
const musicButtonIcon = document.getElementById("musicButtonIcon");

function updateMusicText() {
    if (!weddingMusic || !musicButton) return;

    const playing = !weddingMusic.paused;
    musicButton.setAttribute("aria-label", playing ? "Pause wedding music" : "Play wedding music");
    musicButton.title = playing ? "Pause music" : "Play music";
    if (musicButtonIcon) musicButtonIcon.textContent = playing ? "♫" : "♪̸";
}

function toggleMusic() {
    if (!weddingMusic) return;

    if (weddingMusic.paused) {
        weddingMusic.play().then(updateMusicText).catch(updateMusicText);
    } else {
        weddingMusic.pause();
        updateMusicText();
    }
}

if (weddingMusic) {
    weddingMusic.addEventListener("play", updateMusicText);
    weddingMusic.addEventListener("pause", updateMusicText);
    weddingMusic.addEventListener("ended", updateMusicText);
}

// ========================================
// FIRST PAGE -> INVITATION COVER (NO CINEMATIC VIDEO)
// ========================================
function startInvitation() {
    const gate = document.getElementById("invitationGate");
    if (gate) {
    gate.classList.add("gate-closed");

    setTimeout(() => {
        gate.classList.add("gate-remove");
    }, 1500);
}

    document.body.classList.add("invitation-opened");

    if (musicButton) musicButton.hidden = false;

    if (weddingMusic) {
        weddingMusic.volume = 0.5;
        weddingMusic.play().then(updateMusicText).catch(updateMusicText);
    }

    setTimeout(() => {
    const subaSection = document.getElementById("traditionalSection");

    if (subaSection) {
        subaSection.scrollIntoView({ behavior: "smooth" });
    }
}, 1500);
}

function viewInvitationDetails() {
    const section = document.getElementById("traditionalSection");
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}


// RSVP FORM - GOOGLE SHEETS
// ========================================

const rsvpForm =
    document.getElementById("rsvpForm");

const googleScriptURL =
    "https://script.google.com/macros/s/AKfycbxFebDl_6fWPyjxat9cGzo1eEjvSD7qipmdPta98lx22QjGp7l7DCJjNJh-BubXqK4bog/exec";


if (rsvpForm) {

    rsvpForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const rsvpData = {

                name:
                    document.getElementById("guestName").value,

                phone:
                    document.getElementById("guestPhone").value,

                attendance:
                    document.getElementById("attendance").value,

                guestCount:
                    document.getElementById("guestCount").value
            };


            try {

                await fetch(
                    googleScriptURL,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type": "text/plain"
                        },

                        body:
                            JSON.stringify(rsvpData)
                    }
                );


                alert(
                    "Thank you! Your RSVP has been submitted ❤️"
                );

                rsvpForm.reset();


            } catch (error) {

                console.error(
                    "RSVP Error:",
                    error
                );

                alert(
                    "Sorry, something went wrong. Please try again."
                );
            }
        }
    );
}


// ========================================
// SHARE INVITATION
// ========================================

function shareInvitation() {

    const shareData = {

        title:
            `${weddingDetails.groom} & ${weddingDetails.bride} Wedding`,

        text:
            `You are invited to ${weddingDetails.groom} & ${weddingDetails.bride}'s wedding ❤️`,

        url:
            window.location.href
    };


    if (navigator.share) {

        navigator.share(shareData)
            .catch(function () {
                // User may cancel sharing.
            });

    } else if (navigator.clipboard) {

        navigator.clipboard
            .writeText(window.location.href)
            .then(function () {
                alert("Invitation link copied!");
            });

    } else {

        alert(window.location.href);
    }
}


// ========================================
// THEME
// ========================================

if (weddingDetails.theme) {

    document.body.classList.add(
        "theme-" + weddingDetails.theme
    );
}

/* Wedding Countdown */

function startWeddingCountdown() {
    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    // Wedding date: 20 December 2026, 6:30 PM
    const weddingDate = new Date("2026-12-20T18:30:00+05:30").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance <= 0) {
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);
        const seconds = Math.floor((distance / 1000) % 60);

        daysElement.textContent = String(days).padStart(2, "0");
        hoursElement.textContent = String(hours).padStart(2, "0");
        minutesElement.textContent = String(minutes).padStart(2, "0");
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

startWeddingCountdown();



/* 3D COVERFLOW GALLERY */

const coverflowItems = document.querySelectorAll(".coverflow-item");
let activePhoto = 0;

function updateCoverflow() {
    const total = coverflowItems.length;

    coverflowItems.forEach((item, index) => {
        let position = index - activePhoto;

        if (position > total / 2) position -= total;
        if (position < -total / 2) position += total;

        const x = position * 145;
        const scale = position === 0 ? 1 : 0.78;
        const rotate = position * -12;
        const opacity = Math.abs(position) > 2 ? 0 : 1;

        item.style.transform =
            `translate(calc(-50% + ${x}px), -50%) scale(${scale}) rotateY(${rotate}deg)`;

        item.style.opacity = opacity;
        item.style.zIndex = 10 - Math.abs(position);
        item.style.pointerEvents = opacity === 0 ? "none" : "auto";

        item.classList.toggle("active", position === 0);
    });
}

function movePhoto(direction) {
    activePhoto =
        (activePhoto + direction + coverflowItems.length) %
        coverflowItems.length;

    updateCoverflow();
}

function openPhoto(index) {
    activePhoto = index;
    updateCoverflow();

    // Open the existing lightbox
    if (typeof openLightbox === "function") {
        openLightbox(index);
    }
}

let touchStartX = 0;

const coverflowElement = document.getElementById("coverflow");

if (coverflowElement) {
    coverflowElement.addEventListener("touchstart", function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    coverflowElement.addEventListener("touchend", function(e) {
        const touchEndX = e.changedTouches[0].screenX;
        const difference = touchEndX - touchStartX;

        if (Math.abs(difference) > 40) {
            movePhoto(difference < 0 ? 1 : -1);
        }
    }, { passive: true });
}

updateCoverflow();

