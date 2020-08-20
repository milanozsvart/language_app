const words = [
  {
    id: 1,
    polish: "kot",
    hungarian: "a macska",
    french: "le chat",
    norwegian: "katten",
    english: "the cat",
  },
  {
    id: 2,
    polish: "pies",
    hungarian: "a kutya",
    french: "le chien",
    norwegian: "hunden",
    english: "the dog",
  },
  {
    id: 3,
    polish: "samochód",
    hungarian: "az autó",
    french: "la voiture",
    norwegian: "bilen",
    english: "the car",
  },
];

const availableLanguages = [
  "norwegian",
  "english",
  "french",
  "polish",
  "hungarian",
];

const asking = document.querySelector(".asking");
const answer = document.querySelector(".answer");
const sumbit = document.querySelector(".submit");
const right = document.querySelector(".right");
const left = document.querySelector(".left");
const inputArea = document.querySelector("#input");
const cardContainer = document.querySelector(".card-container");
const points = document.querySelector(".points");
const totalPoints = document.querySelector(".total-points");
const frontBtn = document.querySelector(".front-btn");
const frontPage = document.querySelector(".front-page");
const langContainer = document.querySelector(".lang-container");
const languageChooser = document.querySelector("#language-chooser");
const per = document.querySelector(".per");
let numberOfItems = words.length;
let currentItem;
let previousRandomNumber;
let numberPoints = 0;
let numberTotalPoints = 0;
let targetLanguage;
let originalLanguage;

/*window.addEventListener("DOMContentLoaded", function () {
  let randomNumber = Math.floor(Math.random() * numberOfItems);
  asking.innerHTML = words[randomNumber].polish;
  currentItem = words[randomNumber];
  cardContainer.classList.add("cont-fade-in");
  previousRandomNumber = randomNumber;
  points.innerHTML = "0";
  totalPoints.innerHTML = "0";
});*/

sumbit.addEventListener("click", function () {
  cardContainer.classList.remove("flip");
  const input = document.querySelector("#input").value;
  numberTotalPoints++;
  totalPoints.innerHTML = `${numberTotalPoints}`;
  if (input === currentItem[originalLanguage]) {
    inputArea.classList.add("good");
    answer.classList.add("fadein");
    answer.innerHTML = "OK!";
    inputArea.disabled = true;
    numberPoints++;
    points.innerHTML = `${numberPoints}`;
  } else {
    inputArea.classList.add("bad");
    answer.innerHTML = currentItem[originalLanguage];
    answer.classList.add("shake");
    inputArea.disabled = true;
  }
});

right.addEventListener("click", function () {
  console.log(right.disabled);
  console.log(sumbit.disabled);
  if (
    inputArea.classList.contains("bad") ||
    inputArea.classList.contains("good")
  ) {
    right.disabled = false;
    cardContainer.classList.remove("cont-fade-in");
    answer.innerHTML = "";
    inputArea.value = "";
    inputArea.classList.remove("bad");
    inputArea.classList.remove("good");
    answer.classList.remove("shake", "fadein");
    inputArea.disabled = false;
    cardContainer.classList.add("flip");
    let randomNumber = Math.floor(Math.random() * numberOfItems);
    while (randomNumber === previousRandomNumber) {
      randomNumber = Math.floor(Math.random() * numberOfItems);
    }
    if (randomNumber !== previousRandomNumber) {
      asking.innerHTML = words[randomNumber][targetLanguage];
      currentItem = words[randomNumber];
    }
    previousRandomNumber = randomNumber;
  } else {
    right.disabled = true;
  }
});

frontBtn.addEventListener("click", function () {
  // displaying the first page
  frontPage.classList.add("out");
  frontPage.innerHTML = `<p class="added-text">Firstly, you have to choose which language you would like to learn. Choose one language from the options below!</p>
  <h3>Which language do you want to learn?</h3>
  <div class="button-container">
    <button class="btn target" data-id="norwegian">Norwegian</button>
    <button class="btn target" data-id="polish">Polish</button>
    <button class="btn target" data-id="french">French</button>
    <button class="btn target" data-id="hungarian">Hungarian</button>
  </div>`;
  const targetLangBtns = document.querySelectorAll(".target");

  // displaying the available languages to learn
  targetLangBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault;
      frontPage.classList.remove("out");
      if (e.currentTarget.dataset.id === "norwegian") {
        targetLanguage = "norwegian";
      } else if (e.currentTarget.dataset.id === "polish") {
        targetLanguage = "polish";
      } else if (e.currentTarget.dataset.id === "french") {
        targetLanguage = "french";
      } else if (e.currentTarget.dataset.id === "hungarian") {
        targetLanguage = "hungarian";
      }

      void frontPage.offsetWidth;
      frontPage.classList.add("out");
      // creating an array without the target language
      let guidanceButtons = availableLanguages.filter(function (btn) {
        return btn !== targetLanguage;
      });

      // displaying the available guidance languages
      frontPage.innerHTML = `<h2>You chose <span>${targetLanguage}</span>!</h2><p class="guidance-p-tag">Now choose a guidance language that will help
    you learn. We suggest you pick either your native language or a language you know quite well.</p>
    <div class="button-container">
    <button class="btn original" data-id="${guidanceButtons[0]}">${guidanceButtons[0]}</button>
    <button class="btn original" data-id="${guidanceButtons[1]}">${guidanceButtons[1]}</button>
    <button class="btn original" data-id="${guidanceButtons[2]}">${guidanceButtons[2]}</button>
    <button class="btn original" data-id="${guidanceButtons[3]}">${guidanceButtons[3]}</button>
  </div>`;
      const originalLangBtns = document.querySelectorAll(".original");

      // pressing the language buttons (guidance)
      originalLangBtns.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.preventDefault;
          frontPage.classList.remove("out");
          if (e.currentTarget.dataset.id === "norwegian") {
            originalLanguage = "norwegian";
          } else if (e.currentTarget.dataset.id === "polish") {
            originalLanguage = "polish";
          } else if (e.currentTarget.dataset.id === "french") {
            originalLanguage = "french";
          } else if (e.currentTarget.dataset.id === "hungarian") {
            originalLanguage = "hungarian";
          } else if (e.currentTarget.dataset.id === "english") {
            originalLanguage = "english";
          }
          const guidanceContainer = document.querySelector(".guidance");
          guidanceContainer.innerHTML = `<img src="./img/flags/${originalLanguage}-flag.svg">`;
          const targetContainer = document.querySelector(".target");
          targetContainer.innerHTML = `<img src="./img/flags/${targetLanguage}-flag.svg">`;

          void frontPage.offsetWidth;
          frontPage.classList.add("out");

          // displaying the selected languages and setting the flashcards
          frontPage.innerHTML = `<h2>Let's get started!</h2>
          <div><h4>You are going to be learning <span>${targetLanguage}</span>
          and your guidance language will be in <span>${originalLanguage}</span></h4></div>
          <button class="btn" id="long-btn">To the flashcards!</button>
          <p class="p-container" id="margin-bottom">You can always modify your choice of languages in our menu on the top of the page</p>`;
          const toTheFlashCards = document.querySelector("#long-btn");

          toTheFlashCards.addEventListener("click", function () {
            frontPage.style.visibility = "hidden";
            let randomNumber = Math.floor(Math.random() * numberOfItems);
            asking.innerHTML = words[randomNumber][targetLanguage];
            currentItem = words[randomNumber];
            cardContainer.style.visibility = "visible";
            per.style.visibility = "visible";
            langContainer.style.visibility = "visible";
            cardContainer.classList.add("cont-fade-in");
            previousRandomNumber = randomNumber;
            points.innerHTML = "0";
            totalPoints.innerHTML = "0";
          });
        });
      });
    });
  });
});

const reverseIcon = document.querySelector(".reverse");
reverseIcon.addEventListener("click", function () {
  let tmp = targetLanguage;
  targetLanguage = originalLanguage;
  originalLanguage = tmp;
  let randomNumber = Math.floor(Math.random() * numberOfItems);
  asking.innerHTML = words[randomNumber][targetLanguage];
  currentItem = words[randomNumber];
  previousRandomNumber = randomNumber;
  points.innerHTML = "0";
  totalPoints.innerHTML = "0";
  answer.innerHTML = "";
  inputArea.value = "";
  numberPoints = 0;
  numberTotalPoints = 0;
  inputArea.classList.remove("bad");
  inputArea.classList.remove("good");
  answer.classList.remove("shake", "fadein");
  inputArea.disabled = false;
  right.disabled = false;
  cardContainer.classList.remove("cont-fade-in");
  cardContainer.classList.add("flip");
  const guidanceContainer = document.querySelector(".guidance");
  guidanceContainer.innerHTML = `<img src="./img/flags/${originalLanguage}-flag.svg">`;
  const targetContainer = document.querySelector(".target");
  targetContainer.innerHTML = `<img src="./img/flags/${targetLanguage}-flag.svg">`;
});

const selectTarget = document.querySelector("#selectTarget");
const selectOriginal = document.querySelector("#selectOriginal");
const againLanguageChooser = document.querySelector(".again-lang");

languageChooser.addEventListener("click", () => {
  againLanguageChooser.classList.toggle("again-visible");
  selectTarget.innerHTML = displayLanguages(availableLanguages, "target");
  selectOriginal.innerHTML = displayLanguages(availableLanguages, "original");
  actualTargets = document.querySelectorAll(".target");
  actualOriginals = document.querySelectorAll(".original");
  actualTargets.forEach((btn) => {
    let freeBtns = Array.from(actualTargets).filter(function (good_btn) {
      return good_btn !== btn;
    });
    btn.addEventListener("click", (e) => {
      btn.classList.add("selected");
      freeBtns.forEach((btn2) => {
        btn2.classList.remove("selected");
      });
      actualTargets.forEach((btn) => {
        if (
          btn.classList.contains("selected") &&
          btn.classList.contains("target")
        ) {
          targetLanguage = btn.dataset.id;
          console.log(targetLanguage);
        }
      });
    });
  });
  actualOriginals.forEach((btn) => {
    let freeBtns = Array.from(actualOriginals).filter(function (good_btn) {
      return good_btn !== btn;
    });
    btn.addEventListener("click", (e) => {
      btn.classList.add("selected");
      freeBtns.forEach((btn2) => {
        btn2.classList.remove("selected");
      });
      actualOriginals.forEach((btn) => {
        if (
          btn.classList.contains("selected") &&
          btn.classList.contains("original")
        ) {
          originalLanguage = btn.dataset.id;
          console.log(originalLanguage);
        }
      });
    });
  });

  const startBtn = document.querySelector("#start");
  startBtn.addEventListener("click", () => {
    againLanguageChooser.classList.remove("again-visible");
    frontPage.style.visibility = "hidden";
    let randomNumber = Math.floor(Math.random() * numberOfItems);
    asking.innerHTML = words[randomNumber][targetLanguage];
    currentItem = words[randomNumber];
    cardContainer.style.visibility = "visible";
    per.style.visibility = "visible";
    langContainer.style.visibility = "visible";
    cardContainer.classList.add("cont-fade-in");
    previousRandomNumber = randomNumber;
    points.innerHTML = "0";
    totalPoints.innerHTML = "0";
    numberPoints = 0;
    numberTotalPoints = 0;
    answer.innerHTML = "";
    inputArea.value = "";
    inputArea.classList.remove("bad");
    inputArea.classList.remove("good");
    answer.classList.remove("shake", "fadein");
    inputArea.disabled = false;
    right.disabled = false;
    cardContainer.classList.remove("cont-fade-in");
    cardContainer.classList.add("flip");
    const guidanceContainer = document.querySelector(".guidance");
    guidanceContainer.innerHTML = `<img src="./img/flags/${originalLanguage}-flag.svg">`;
    const targetContainer = document.querySelector(".target");
    targetContainer.innerHTML = `<img src="./img/flags/${targetLanguage}-flag.svg">`;
  });
});

function displayLanguages(languages, attribute) {
  let langSelect = languages.map(
    (item) =>
      `<button class="right-lang ${attribute}" data-id="${item}">${item}</button>`
  );
  langSelect = langSelect.join("");
  return langSelect;
}
