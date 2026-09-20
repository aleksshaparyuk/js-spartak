// 1. Поиск элементов
const playGimnBtn = document.getElementById("playGimnBtn");
const spartakAudio = document.getElementById("spartakAudio");
const gimnCup = document.getElementById("gimnCup");
const championText = document.getElementById("championText");
const starContainer = document.getElementById("starContainer");

const achievementModal = document.getElementById("achievementModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

const rplModal = document.getElementById("rplModal");
const openRplBtn = document.getElementById("openRplBtn");
const closeRplBtn = document.getElementById("closeRplBtn");

const newsModal = document.getElementById("newsModal");
const openNewsBtn = document.getElementById("openNewsBtn");
const closeNewsBtn = document.getElementById("closeNewsBtn");

const listContainer = document.getElementById("list");

let starInterval = null;

// 2. Гимн и анимация
playGimnBtn.addEventListener("click", function () {
    if (spartakAudio.paused) {
        spartakAudio.play();
        playGimnBtn.textContent = "Заглушить Гимн";
        gimnCup.classList.add("show");
        championText.classList.add("show");
        document.body.classList.add("blue-bg");
        startStarFall();
    } else {
        spartakAudio.pause();
        spartakAudio.currentTime = 0;
        playGimnBtn.textContent = "Гимн Максим";
        gimnCup.classList.remove("show");
        championText.classList.remove("show");
        document.body.classList.remove("blue-bg");
        stopStarFall();
    }
});

function createStar() {
    const star = document.createElement("div");
    star.classList.add("falling-star");
    star.textContent = "⭐";
    star.style.left = Math.random() * 100 + "vw";
    star.style.fontSize = (Math.random() * 20 + 15) + "px";

    const duration = Math.random() * 3 + 2;
    star.style.animationDuration = duration + "s";

    if (starContainer) {
        starContainer.appendChild(star);
    }

    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

function startStarFall() {
    if (!starInterval) {
        starInterval = setInterval(createStar, 200);
    }
}

function stopStarFall() {
    clearInterval(starInterval);
    starInterval = null;
    if (starContainer) {
        starContainer.innerHTML = "";
    }
}

// 3. Список достижений
const achievements = [
    { title: "🏆 12-кратный Чемпион СССР", years: "1936, 1938, 1939, 1952, 1953, 1956, 1958, 1962, 1969, 1979, 1987, 1989" },
    { title: "🏆 10-кратный Чемпион России", years: "1992, 1993, 1994, 1996, 1997, 1998, 1999, 2000, 2001, 2017" },
    { title: "🏆 10-кратный Обладатель Кубка СССР", years: "1938, 1939, 1946, 1947, 1950, 1958, 1963, 1965, 1971, 1992" },
    { title: "🏆 5-кратный Обладатель Кубка России", years: "1994, 1998, 2003, 2022" },
    { title: "🏆 Обладатель Суперкубка России", years: "2017" }
];

if (listContainer) {
    listContainer.innerHTML = "";
    achievements.forEach((item) => {
        let newLi = document.createElement("li");
        newLi.textContent = item.title;
        newLi.style.cursor = "pointer";

        newLi.addEventListener("click", function () {
            if (newLi.textContent.includes("Года:")) {
                newLi.textContent = item.title;
            } else {
                newLi.textContent = `${item.title} (Года: ${item.years})`;
            }
        });

        listContainer.appendChild(newLi);
    });
}

// 4. Логика открывания кнопок
openModalBtn.addEventListener("click", () => achievementModal.style.display = "flex");
closeModalBtn.addEventListener("click", () => achievementModal.style.display = "none");

openRplBtn.addEventListener("click", () => rplModal.style.display = "flex");
closeRplBtn.addEventListener("click", () => rplModal.style.display = "none");

openNewsBtn.addEventListener("click", () => newsModal.style.display = "flex");
closeNewsBtn.addEventListener("click", () => newsModal.style.display = "none");

window.addEventListener("click", (event) => {
    if (event.target === achievementModal) achievementModal.style.display = "none";
    if (event.target === rplModal) rplModal.style.display = "none";
    if (event.target === newsModal) newsModal.style.display = "none";
});

// 5. Минуты онлайн
let matchMinute = 75;
const liveStatus = document.querySelector('.match-status');

setInterval(() => {
    if (matchMinute < 90) {
        matchMinute++;
        if (liveStatus) {
            liveStatus.textContent = `${matchMinute}' мин (Идёт матч)`;
        }
    } else if (matchMinute === 90) {
        if (liveStatus) {
            liveStatus.textContent = `90' мин (Матч завершён!)`;
        }
    }
}, 5000);