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
    "openingCoupleNames",
    `${weddingDetails.groom} & ${weddingDetails.bride}`
);

setText(
    "coupleNames",
    `${weddingDetails.groom} & ${weddingDetails.bride}`
);

setText("openingWeddingDate", weddingDetails.date);


// HERO - PARENTS
setText("heroGroomFather", weddingDetails.groomFather);
setText("heroGroomMother", weddingDetails.groomMother);

setText("heroBrideFather", weddingDetails.brideFather);
setText("heroBrideMother", weddingDetails.brideMother);


// HERO - DATE & TIME
setText("heroWeddingDay", weddingDetails.day.toUpperCase());
setText("heroWeddingDate", weddingDetails.date.toUpperCase());
setText("heroWeddingTime", weddingDetails.time);


// CINEMATIC INTRO
setText(
    "cinematicNames",
    `${weddingDetails.groom} & ${weddingDetails.bride}`
);

setText("cinematicDate", weddingDetails.date);


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
// VIEW INVITATION BUTTON
// ========================================

function viewInvitationDetails() {

    const section =
        document.getElementById("traditionalSection");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}


// ========================================
// COUNTDOWN
// ========================================

const weddingDateTime = new Date(
    `${weddingDetails.date} ${weddingDetails.time}`
).getTime();


function updateCountdown() {

    const countdownElement =
        document.querySelector(".countdown");

    if (!countdownElement) {
        return;
    }

    const now = new Date().getTime();

    const distance =
        weddingDateTime - now;


    if (Number.isNaN(weddingDateTime)) {

        countdownElement.innerHTML =
            "Wedding date unavailable";

        return;
    }


    if (distance < 0) {

        countdownElement.innerHTML =
            "The Wedding Day Has Arrived ❤️";

        return;
    }


    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60))
        / 1000
    );


    setText("days", days);
    setText("hours", hours);
    setText("minutes", minutes);
    setText("seconds", seconds);
}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);


// ========================================
// PHOTO GALLERY
// ========================================

const photos = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg"
];

let currentPhoto = 0;


function openLightbox(index) {

    currentPhoto = index;

    const image =
        document.getElementById("lightboxImage");

    const lightbox =
        document.getElementById("lightbox");

    if (image) {
        image.src = photos[currentPhoto];
    }

    if (lightbox) {
        lightbox.style.display = "flex";
    }
}


function closeLightbox() {

    const lightbox =
        document.getElementById("lightbox");

    if (lightbox) {
        lightbox.style.display = "none";
    }
}


function changePhoto(direction) {

    currentPhoto += direction;

    if (currentPhoto >= photos.length) {
        currentPhoto = 0;
    }

    if (currentPhoto < 0) {
        currentPhoto = photos.length - 1;
    }

    const image =
        document.getElementById("lightboxImage");

    if (image) {
        image.src = photos[currentPhoto];
    }
}


// ========================================
// BACKGROUND MUSIC
// ========================================

const weddingMusic =
    document.getElementById("weddingMusic");

const musicText =
    document.getElementById("musicText");


function updateMusicText() {

    if (!musicText || !weddingMusic) {
        return;
    }

    musicText.textContent =
        weddingMusic.paused
            ? "Play Music"
            : "Pause Music";
}


function toggleMusic() {

    if (!weddingMusic) {
        return;
    }

    if (weddingMusic.paused) {

        weddingMusic.play()
            .then(updateMusicText)
            .catch(updateMusicText);

    } else {

        weddingMusic.pause();
        updateMusicText();
    }
}


// ========================================
// OPENING SCREEN + CINEMATIC INTRO
// ========================================

function startInvitation() {

    const openingScreen =
        document.getElementById("openingScreen");

    const cinematicIntro =
        document.getElementById("cinematicIntro");

    const introVideo =
        document.getElementById("introVideo");


    if (openingScreen) {
        openingScreen.classList.add("hide");
    }


    if (!cinematicIntro || !introVideo) {

        finishCinematicIntro();
        return;
    }


    cinematicIntro.classList.remove("closing");
    cinematicIntro.classList.add("active");

    cinematicIntro.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "cinematic-playing"
    );


    introVideo.currentTime = 0;

    introVideo.play().catch(function () {
        finishCinematicIntro();
    });
}


function finishCinematicIntro() {

    const cinematicIntro =
        document.getElementById("cinematicIntro");

    const introVideo =
        document.getElementById("introVideo");


    if (introVideo) {
        introVideo.pause();
    }


    if (!cinematicIntro) {

        document.body.classList.remove(
            "cinematic-playing"
        );

        document.getElementById("invitation")
            ?.scrollIntoView({
                behavior: "smooth"
            });

        return;
    }


    if (!cinematicIntro.classList.contains("active")) {
        return;
    }


    cinematicIntro.classList.add("closing");


    setTimeout(function () {

        cinematicIntro.classList.remove(
            "active",
            "closing"
        );

        cinematicIntro.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "cinematic-playing"
        );


        if (weddingMusic) {

            weddingMusic.play()
                .then(updateMusicText)
                .catch(updateMusicText);
        }


        document.getElementById("invitation")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

    }, 650);
}


const introVideo =
    document.getElementById("introVideo");

if (introVideo) {

    introVideo.addEventListener(
        "ended",
        finishCinematicIntro
    );
}


// ========================================
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
