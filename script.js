
/* =========================
   BACKGROUND MUSIC
========================= */

const music = document.getElementById("weddingMusic");
const musicButton = document.getElementById("musicButton");

let isPlaying = false;

musicButton.addEventListener("click", async () => {

    if (!isPlaying) {
        try {
            await music.play();

            isPlaying = true;
            musicButton.innerHTML = "♫ <span>Անջատել</span>";

        } catch (error) {
            console.log("Music could not start:", error);
            musicButton.innerHTML = "♫ <span>Փորձել կրկին</span>";
        }

    } else {
        music.pause();

        isPlaying = false;
        musicButton.innerHTML = "♫ <span>Երաժշտություն</span>";
    }

});


/* =========================
   COUNTDOWN
========================= */

const weddingDate = new Date(2027, 10, 24, 17, 0, 0).getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================
   RSVP GUEST COUNT
========================= */

const attendance = document.getElementById("attendance");
const guestCountContainer = document.getElementById("guestCountContainer");
const guestCount = document.getElementById("guestCount");

attendance.addEventListener("change", () => {

    if (attendance.value === "Ոչ") {
        guestCountContainer.style.display = "none";
        guestCount.value = "0";
    } else {
        guestCountContainer.style.display = "block";
        guestCount.value = "1";
    }

});


/* =========================
   RSVP FORM
========================= */

const rsvpForm = document.getElementById("rsvpForm");
const formMessage = document.getElementById("formMessage");

// Add your Google Apps Script Web App URL here.
const GOOGLE_SCRIPT_URL = "";

rsvpForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!GOOGLE_SCRIPT_URL) {
        formMessage.textContent =
            "RSVP համակարգը դեռ միացված չէ։";
        return;
    }

    const formData = new URLSearchParams();

    formData.append(
        "firstName",
        document.getElementById("firstName").value
    );

    formData.append(
        "lastName",
        document.getElementById("lastName").value
    );

    formData.append(
        "attendance",
        attendance.value
    );

    formData.append(
        "guests",
        guestCount.value
    );

    formData.append(
        "guestMessage",
        document.getElementById("guestMessage").value
    );

    try {

        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            body: formData
        });

        formMessage.textContent =
            "Ձեր հարցումն ուղարկվել է։ Շնորհակալություն։";

        rsvpForm.reset();
        guestCountContainer.style.display = "block";

    } catch (error) {

        formMessage.textContent =
            "Սխալ տեղի ունեցավ։ Խնդրում ենք կրկին փորձել։";

        console.error(error);

    }

});


/* =========================
   SMOOTH NAVIGATION
========================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});
