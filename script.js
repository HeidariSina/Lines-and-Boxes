const N = 4;
const M = 4;

let turn = "R";
let selectedLines = [];
let rPoint = 0;
let bPoint = 0;

const hoverClasses = { R: "hover-red", B: "hover-blue" };
const bgClasses = { R: "bg-red", B: "bg-blue" };

const playersTurnText = (turn) =>
  `It's ${turn === "R" ? "Red" : "Blue"}'s turn`;

const isLineSelected = (line) =>
  line.classList.contains(bgClasses.R) || line.classList.contains(bgClasses.B);

const createGameGrid = () => {
  const gameGridContainer = document.getElementsByClassName(
    "game-grid-container"
  )[0];

  const rows = Array(N)
    .fill(0)
    .map((_, i) => i);
  const cols = Array(M)
    .fill(0)
    .map((_, i) => i);

  rows.forEach((row) => {
    cols.forEach((col) => {
      const dot = document.createElement("div");
      dot.setAttribute("class", "dot");

      const hLine = document.createElement("div");
      hLine.setAttribute("class", `line-horizontal ${hoverClasses[turn]}`);
      hLine.setAttribute("id", `h-${row}-${col}`);
      hLine.addEventListener("click", handleLineClick);

      gameGridContainer.appendChild(dot);
      if (col < M - 1) gameGridContainer.appendChild(hLine);
    });

    if (row < N - 1) {
      cols.forEach((col) => {
        const vLine = document.createElement("div");
        vLine.setAttribute("class", `line-vertical ${hoverClasses[turn]}`);
        vLine.setAttribute("id", `v-${row}-${col}`);
        vLine.addEventListener("click", handleLineClick);

        const box = document.createElement("div");
        box.setAttribute("class", "box");
        box.setAttribute("id", `box-${row}-${col}`);

        gameGridContainer.appendChild(vLine);
        if (col < M - 1) gameGridContainer.appendChild(box);
      });
    }
  });

  document.getElementById("game-status").innerHTML = playersTurnText(turn);
};

const changeTurn = () => {
  const nextTurn = turn === "R" ? "B" : "R";

  const lines = document.querySelectorAll(".line-vertical, .line-horizontal");

  lines.forEach((l) => {
    //if line was not already selected, change it's hover color according to the next turn
    if (!isLineSelected(l)) {
      l.classList.replace(hoverClasses[turn], hoverClasses[nextTurn]);
    }
  });
  turn = nextTurn;
  document.getElementById("game-status").innerHTML = playersTurnText(turn);
};

const handleLineClick = (e) => {
  const lineId = e.target.id;

  const selectedLine = document.getElementById(lineId);

  if (isLineSelected(selectedLine)) {
    //if line was already selected, return
    return;
  }

  selectedLines = [...selectedLines, lineId];

  colorLine(selectedLine);

  let check = checkBox(lineId);
  if (check == "n") {
    changeTurn();
  }
  if (check == "r") {
    let box = document.getElementById(`box-${lineId[2]}-${lineId[4]}`);
    box.classList.add(bgClasses[turn]);
    if (turn == "R") {
      rPoint = rPoint + 1;
    }
    if (turn == "B") {
      bPoint = bPoint + 1;
    }
  }
  if (check == "l") {
    let box = document.getElementById(
      `box-${lineId[2]}-${parseInt(lineId[4]) - 1}`
    );
    box.classList.add(bgClasses[turn]);
    if (turn == "R") {
      rPoint = rPoint + 1;
    }
    if (turn == "B") {
      bPoint = bPoint + 1;
    }
  }
  if (check == "d") {
    let box = document.getElementById(`box-${lineId[2]}-${lineId[4]}`);
    box.classList.add(bgClasses[turn]);
    if (turn == "R") {
      rPoint = rPoint + 1;
    }
    if (turn == "B") {
      bPoint = bPoint + 1;
    }
  }
  if (check == "u") {
    let box = document.getElementById(
      `box-${parseInt(lineId[2]) - 1}-${lineId[4]}`
    );
    box.classList.add(bgClasses[turn]);
    if (turn == "R") {
      rPoint = rPoint + 1;
    }
    if (turn == "B") {
      bPoint = bPoint + 1;
    }
  }
  if (check == "du") {
    let box = document.getElementById(
      `box-${parseInt(lineId[2]) - 1}-${lineId[4]}`
    );
    box.classList.add(bgClasses[turn]);
    let box2 = document.getElementById(`box-${lineId[2]}-${lineId[4]}`);
    box2.classList.add(bgClasses[turn]);
    if (turn == "R") {
      rPoint = rPoint + 2;
    }
    if (turn == "B") {
      bPoint = bPoint + 2;
    }
  }
  if (check == "rl") {
    let box = document.getElementById(
      `box-${lineId[2]}-${parseInt(lineId[4]) - 1}`
    );
    box.classList.add(bgClasses[turn]);
    let box2 = document.getElementById(`box-${lineId[2]}-${lineId[4]}`);
    box2.classList.add(bgClasses[turn]);
    if (turn == "R") {
      rPoint = rPoint + 2;
    }
    if (turn == "B") {
      bPoint = bPoint + 2;
    }
  }
  if (selectedLines.length == 24) {
    if (bPoint > rPoint)
      document.getElementById("game-status").innerHTML = "Blue Won";
    if (bPoint < rPoint)
      document.getElementById("game-status").innerHTML = "Red Won";
  }
};

const colorLine = (selectedLine) => {
  selectedLine.classList.remove(hoverClasses[turn]);
  selectedLine.classList.add(bgClasses[turn]);
};
const checkBox = (lineId) => {
  let g = "n";
  if (lineId[0] == "h") {
    let h1 = `h-${parseInt(lineId[2]) + 1}-${lineId[4]}`;
    let v1 = `v-${lineId[2]}-${lineId[4]}`;
    let v2 = `v-${lineId[2]}-${parseInt(lineId[4]) + 1}`;
    let i1 = selectedLines.findIndex((e) => e == h1);
    let i2 = selectedLines.findIndex((e) => e == v2);
    let i3 = selectedLines.findIndex((e) => e == v1);
    if (i1 != -1 && i2 != -1 && i3 != -1) {
      g = "d";
    }
    h1 = `h-${parseInt(lineId[2]) - 1}-${lineId[4]}`;
    v1 = `v-${parseInt(lineId[2]) - 1}-${lineId[4]}`;
    v2 = `v-${parseInt(lineId[2]) - 1}-${parseInt(lineId[4]) + 1}`;
    i1 = selectedLines.findIndex((e) => e == h1);
    i2 = selectedLines.findIndex((e) => e == v2);
    i3 = selectedLines.findIndex((e) => e == v1);
    if (i1 != -1 && i2 != -1 && i3 != -1) {
      if (g == "n") {
        g = "u";
      }
      if (g == "d") {
        g = "du";
      }
    }
  } else {
    let v1 = `v-${lineId[2]}-${parseInt(lineId[4]) + 1}`;
    let h1 = `h-${lineId[2]}-${lineId[4]}`;
    let h2 = `h-${parseInt(lineId[2]) + 1}-${lineId[4]}`;

    let i1 = selectedLines.findIndex((e) => e == h1);
    let i2 = selectedLines.findIndex((e) => e == v1);
    let i3 = selectedLines.findIndex((e) => e == h2);
    if (i1 != -1 && i2 != -1 && i3 != -1) {
      g = "r";
    }
    h1 = `v-${lineId[2]}-${parseInt(lineId[4]) - 1}`;
    v1 = `h-${lineId[2]}-${parseInt(lineId[4]) - 1}`;
    h2 = `h-${parseInt(lineId[2]) + 1}-${parseInt(lineId[4]) - 1}`;
    i1 = selectedLines.findIndex((e) => e == h1);
    i2 = selectedLines.findIndex((e) => e == h2);
    i3 = selectedLines.findIndex((e) => e == v1);
    if (i1 != -1 && i2 != -1 && i3 != -1) {
      if (g == "n") {
        g = "l";
      }
      if (g == "r") {
        g = "rl";
      }
    }
  }
  return g;
};

createGameGrid();
