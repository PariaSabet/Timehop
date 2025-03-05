console.clear();

const elApp = document.querySelector("#app");
const losCards = elApp.querySelectorAll(".card");
const losFlippers = elApp.querySelectorAll("[data-flip]");

losCards.forEach((elCard) => {
  elCard.addEventListener("click", () => {
    flip(() => {
      let expanded =
        elCard.dataset.state === "expanded" ? "collapsed" : "expanded";
      elApp.dataset.state = expanded;
      losCards.forEach((elCard) => (elCard.dataset.state = "collapsed"));
      elCard.dataset.state = expanded;
    }, losFlippers);
  });
});

/* Helpers for FLIP (First Last Invert Play) */

function getRect(el) {
  return el.getBoundingClientRect();
}

function flip(doSomething, firstEls, getLastEls = () => firstEls) {
  const firstElsRects = Array.from(firstEls, (el) => [el, getRect(el)]);

  requestAnimationFrame(() => {
    doSomething();
    const lastElsRects = Array.from(getLastEls(), (el) => [el, getRect(el)]);

    firstElsRects.forEach(([firstEl, firstRect], i) => {
      const [lastEl, lastRect] = lastElsRects[i];
      const dx = lastRect.x - firstRect.x;
      const dy = lastRect.y - firstRect.y;
      const dw = lastRect.width / firstRect.width;
      const dh = lastRect.height / firstRect.height;
      lastEl.dataset.flipping = true;
      lastEl.style.setProperty("--dx", dx);
      lastEl.style.setProperty("--dy", dy);
      lastEl.style.setProperty("--dw", dw);
      lastEl.style.setProperty("--dh", dh);
      requestAnimationFrame(() => delete lastEl.dataset.flipping);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchFactForToday();
  fetchAnotherFactForToday();
  fetchRandomNumberFact();
});

function fetchFactForToday() {
  const today = new Date();
  const month = today.getMonth() + 1; // Months are zero-indexed
  const day = today.getDate();
  const url = `http://numbersapi.com/${month}/${day}/date`;

  fetch(url)
    .then(response => response.text())
    .then(fact => {
      const factElement = document.querySelector("#today-fact");
      if (factElement) {
        factElement.textContent = fact;
      }
    })
    .catch(error => console.error('Error fetching fact:', error));
}

function fetchAnotherFactForToday() {
  const today = new Date();
  const month = today.getMonth() + 1; // Months are zero-indexed
  const day = today.getDate();
  const url = `http://numbersapi.com/${month}/${day}/date`;

  fetch(url)
    .then(response => response.text())
    .then(fact => {
      const factElement = document.querySelector("#another-today-fact");
      if (factElement) {
        factElement.textContent = fact;
      }
    })
    .catch(error => console.error('Error fetching another fact:', error));
}

function fetchRandomNumberFact() {
  const url = `http://numbersapi.com/random/trivia`;

  fetch(url)
    .then(response => response.text())
    .then(fact => {
      const factElement = document.querySelector("#random-number-fact");
      if (factElement) {
        factElement.textContent = fact;
      }
    })
    .catch(error => console.error('Error fetching random number fact:', error));
}

const currentDateElement = document.getElementById('current-date');
const options = { weekday: 'long', month: 'short', day: '2-digit' };
const today = new Date().toLocaleDateString('en-US', options);
currentDateElement.textContent = today;