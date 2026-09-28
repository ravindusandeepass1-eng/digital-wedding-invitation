// ========================================
// CUSTOMER DETAILS
// ========================================

document.getElementById("openingCoupleNames").innerHTML =
    weddingDetails.groom + " & " + weddingDetails.bride;

document.getElementById("coupleNames").innerHTML =
    weddingDetails.groom + " & " + weddingDetails.bride;

document.getElementById("openingWeddingDate").innerHTML =
    weddingDetails.date;

document.getElementById("weddingDate").innerHTML =
    weddingDetails.date;

document.getElementById("weddingTime").innerHTML =
    weddingDetails.time;


// ========================================
// CEREMONY
// ========================================

document.getElementById("ceremonyTime").innerHTML =
    weddingDetails.ceremonyTime;

document.getElementById("ceremonyVenue").innerHTML =
    weddingDetails.ceremonyVenue;


// ========================================
// RECEPTION
// ========================================

document.getElementById("receptionTime").innerHTML =
    weddingDetails.receptionTime;

document.getElementById("receptionVenue").innerHTML =
    weddingDetails.receptionVenue;


// ========================================
// FOOTER
// ========================================

document.getElementById("footerCoupleNames").innerHTML =
    weddingDetails.groom + " & " + weddingDetails.bride;

document.getElementById("footerWeddingDate").innerHTML =
    weddingDetails.date;


// ========================================
// GOOGLE MAPS
// ========================================

document.getElementById("mapLink").href =
    weddingDetails.mapLink;


// ========================================
// WHATSAPP RSVP BUTTON
// ========================================

const rsvpMessage =
    `Hello ${weddingDetails.groom} & ${weddingDetails.bride}, I would like to RSVP for your wedding.`;

document.getElementById("whatsappRSVP").href =
    `https://wa.me/${weddingDetails.whatsapp}?text=${encodeURIComponent(rsvpMessage)}`;


// ========================================
// CONTACT WHATSAPP
// ========================================

document.getElementById("contactWhatsApp").href =
    `https://wa.me/${weddingDetails.whatsapp}`;


// ========================================
// OPEN INVITATION
// ========================================

function openInvitation() {

    document.getElementById("invitation").scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// COUNTDOWN
// ========================================

// Convert:
// "12 March 2027"
// "6:00 PM"
// into a JavaScript date.

const weddingDateTime = new Date(
    `${weddingDetails.date} ${weddingDetails.time}`
).getTime();


const countdown = setInterval(function () {

    const now = new Date().getTime();

    const distance = weddingDateTime - now;


    if (distance < 0) {

        clearInterval(countdown);

        document.querySelector(".countdown").innerHTML =
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


    document.getElementById("days").innerHTML =
        days;

    document.getElementById("hours").innerHTML =
        hours;

    document.getElementById("minutes").innerHTML =
        minutes;

    document.getElementById("seconds").innerHTML =
        seconds;


}, 1000);


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

    document.getElementById("lightboxImage").src =
        photos[currentPhoto];

    document.getElementById("lightbox").style.display =
        "flex";

}


function closeLightbox() {

    document.getElementById("lightbox").style.display =
        "none";

}


function changePhoto(direction) {

    currentPhoto += direction;


    if (currentPhoto >= photos.length) {

        currentPhoto = 0;

    }


    if (currentPhoto < 0) {

        currentPhoto = photos.length - 1;

    }


    document.getElementById("lightboxImage").src =
        photos[currentPhoto];

}


// ========================================
// BACKGROUND MUSIC
// ========================================

const weddingMusic =
    document.getElementById("weddingMusic");

const musicText =
    document.getElementById("musicText");


function toggleMusic() {

    if (weddingMusic.paused) {

        weddingMusic.play();

        musicText.innerHTML =
            "Pause Music";

    } else {

        weddingMusic.pause();

        musicText.innerHTML =
            "Play Music";

    }

}


// ========================================
// OPENING SCREEN
// ========================================

function startInvitation() {

    const openingScreen =
        document.getElementById("openingScreen");


    openingScreen.classList.add("hide");


    weddingMusic.play()
        .then(function () {

            musicText.innerHTML =
                "Pause Music";

        })
        .catch(function () {

            musicText.innerHTML =
                "Play Music";

        });

}


// ========================================
// RSVP FORM
// ========================================

const rsvpForm =
    document.getElementById("rsvpForm");


rsvpForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document.getElementById("guestName").value;


        const phone =
            document.getElementById("guestPhone").value;


        const attendance =
            document.getElementById("attendance").value;


        const guestCount =
            document.getElementById("guestCount").value;


        const message =
`Hello ${weddingDetails.groom} & ${weddingDetails.bride},

Name: ${name}
Phone: ${phone}
Attendance: ${attendance}
Number of Guests: ${guestCount}

Thank you.`;


        const whatsappURL =
            `https://wa.me/${weddingDetails.whatsapp}?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


// ========================================
// SHARE INVITATION
// ========================================

function shareInvitation() {

    if (navigator.share) {

        navigator.share({

            title:
                `${weddingDetails.groom} & ${weddingDetails.bride} Wedding`,

            text:
                `You are invited to ${weddingDetails.groom} & ${weddingDetails.bride}'s wedding ❤️`,

            url:
                window.location.href

        });

    } else {

        navigator.clipboard.writeText(
            window.location.href
        );

        alert(
            "Invitation link copied!"
        );

    }

}
document.getElementById("weddingBody").classList.add(
    "theme-" + weddingDetails.theme
);
function changeTheme(theme) {

    const body = document.getElementById("weddingBody");

    body.classList.remove(
        "theme-elegant",
        "theme-romantic",
        "theme-botanical",
        "theme-luxury"
    );

    body.classList.add("theme-" + theme);
}