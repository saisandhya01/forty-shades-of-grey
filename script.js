let level = 0;
if (localStorage.clickcount) {
  document.getElementById("best-time").innerHTML = localStorage.getItem(
    "bestScores"
  );
} else {
  document.getElementById("best-time").innerHTML = "0.000";
}
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");
easy.onclick = () => {
  level = 0;
};
medium.onclick = () => {
  level = 1;
  console.log(level);
};
hard.onclick = () => {
  level = 2;
};

var bestScores = [[], [], []];
let seconds = document.getElementById("countdown").innerHTML;
const grid = document.getElementById("grid");
var seconds2 = document.getElementById("countdown");
var gon = 0;

var bleep = new Audio("sound.mp3");

seconds2.style.display = "none";
grid.style.display = "none";
function sgame() {
  if (gon === 0) {
    gon = 1;
    let st = document.getElementById("st");

    st.style.display = "none";
    seconds2.innerHTML = 3;
    seconds2.style.display = "block";
    let countdown = setInterval(function () {
      seconds--;
      document.getElementById("countdown").innerHTML = seconds;
      if (seconds <= 0) {
        grid.style.display = "grid";
        clearInterval(countdown);
        document.getElementById("countdown").style.display = "none";
        startGame();
      }
    }, 1000);
  } else {
    window.location.reload();
  }
}

let initialCounter = 21;
let seconds1 = 0;
let milliseconds = 0;
let interval = null;
function stopwatch() {
  milliseconds += 5;
  if (milliseconds / 1000 === 1) {
    milliseconds = 0;
    seconds1++;
  }
  document.getElementById("time-data").innerHTML =
    seconds1 + ":" + milliseconds;
}
function startGame() {
  {
    interval = window.setInterval(stopwatch, 5);
    game();
  }
}
function stopGame() {
  document.getElementById("time-data").innerHTML = "0.000";
  window.clearInterval(interval);
  if (typeof Storage !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = parseFloat(localStorage.clickcount);
    } else {
      localStorage.clickcount = 0.0;
    }
    var t = parseFloat(seconds1 + "." + milliseconds);

    localStorage.clickcount = t;
    bestScores[level].push(localStorage.clickcount);
    bestScores[level].sort();
    bestScores[level] = bestScores[level].splice(0, 5);
    localStorage.setItem(
      "bestScores" + level,
      JSON.stringify(bestScores[level])
    );
    document.getElementById("best-time").innerHTML = JSON.parse(
      localStorage.getItem("bestScores" + level)
    );
    console.log(localStorage.getItem("bestScores" + level));
    console.log(bestScores[level]);
  }
  grid.innerHTML = "Your time is  " + seconds1 + ":" + milliseconds;
  seconds1 = 0;
  milliseconds = 0;
  let button = document.createElement("p");
  button.className = "restart";
  button.innerHTML = "Restart";
  grid.appendChild(button);

  button.onclick = () => {
    startGame();
  };
  let levelButton = document.createElement("div");
  levelButton.className = "level";
  levelButton.innerHTML = "Next level";
  grid.appendChild(levelButton);
  levelButton.onclick = () => {
    level++;
    startGame();
  };
  initialCounter = 21;
}

function changeText(element) {
  if (
    initialCounter - element.innerHTML === 20 &&
    initialCounter <= 40 + 20 * level
  ) {
    element.style.backgroundColor =
      "hsl(260,5%," + (100 - element.innerHTML) + "%)";
    bleep.play();
    element.innerHTML = initialCounter;
    initialCounter++;
  } else if (
    initialCounter - element.innerHTML === 20 &&
    initialCounter > 40 + 20 * level
  ) {
    element.style.backgroundColor =
      "hsl(260,5%," + (100 - element.innerHTML) + "%)";
    bleep.play();
    element.innerHTML = " ";
    initialCounter++;
  }
  if (initialCounter === 61 + 20 * level) {
    stopGame();
  }
}

function shuffle() {
  let a = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];
  let i = a.length,
    k,
    t;
  while (--i > 0) {
    k = Math.floor(Math.random() * (i + 1));
    t = a[k];
    a[k] = a[i];
    a[i] = t;
  }
  return a;
}
function game() {
  let arr = shuffle();
  grid.innerHTML = "";
  let k = 0;
  for (let i = 0; i < 4; i++) {
    let row = document.createElement("div");
    row.className = "row";
    grid.appendChild(row);
    k = 5 * i;
    if (i % 2 === 0) {
      row.style.justifyContent = "flex-start";
    } else {
      row.style.justifyContent = "flex-end";
    }
    for (let j = 0; j < 10; j++) {
      let box = document.createElement("span");
      box.className = "box";
      row.appendChild(box);

      if (j >= 0 && j <= 4) {
        box.innerHTML = arr[k];
        k = k + 1;
      } else if (j >= 5 && j <= 9) {
        box.innerHTML = arr[k - 5];
        k = k + 1;
      }
      box.onclick = () => {
        changeText(box);
      };
      if (i % 2 === 0) {
        box.keyframes = [
          {
            transform: "translateX(0%)",
          },
          {
            transform: "translateX(-500%)",
          },
        ];
        box.animProps = {
          duration: 9200,
          easing: "linear",
          iterations: Infinity,
        };
        box.animate(box.keyframes, box.animProps);
      } else {
        box.keyframes = [
          {
            transform: "translateX(0%)",
          },
          {
            transform: "translateX(500%)",
          },
        ];
        box.animProps = {
          duration: 6000,
          easing: "linear",
          iterations: Infinity,
        };
        box.animate(box.keyframes, box.animProps);
      }
    }
  }
}
