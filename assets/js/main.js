// Création d'un tableau pour représenter la grille du morpion
let gridMorpion = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]

// Création d'un tableau pour représenter la grille du puissance 4
let gridP4 = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    
]

// Récupération de l'élément html qui contient la grille de jeu
let gameover = false
let board = document.querySelector('#board')
// Création des variables de jeu
let player = "X";
let winner = "";
let xWins = 0;
let oWins = 0;
let drawCount = 0;
let moves = 0;
let gameMode = "";

// Récupération des boutons
let btnMorpionPvp = document.querySelector('#btn1');
let btnMorpionPvc = document.querySelector('#btn2');
let btnP4Pvp = document.querySelector('#btn3');
let btnP4Pvc = document.querySelector('#btn4');
let reset = document.querySelector('#btn5');

// Récupération des éléments du scoreboard
let displayWinner = document.getElementById('displayWinner');
let currentPlayer = document.getElementById('currentPlayer');
let scoreX = document.getElementById('score1');
let scoreO = document.getElementById('score2');
let draws = document.getElementById('score3');

// Affichage du joueur qui comment la partie
currentPlayer.innerHTML = "X";

// ajout d'un écouteur d'évènement au clic sur les boutons pour modifier le mode de jeu
btnMorpionPvp.addEventListener("click", () => {
    gameMode = "morpionPvp"
    displayGrid();
});
btnMorpionPvc.addEventListener("click", () => {
    gameMode = "morpionPvc"
    displayGrid();
});
btnP4Pvp.addEventListener("click", () => {
    gameMode = "P4Pvp"
    displayGrid();
});
btnP4Pvc.addEventListener("click", () => {
    gameMode = "P4Pvc"
    displayGrid();
});
reset.addEventListener("click", () => {
    resetGame();
})

// Création de la fonction pour afficher la grille du jeu choisi
function displayGrid() {
    if (gameMode === "morpionPvp" || gameMode === "morpionPvc") {
        board.innerHTML = "";
        for (let i = 0; i < 3; i++) {
            let row = document.createElement("div");
            row.classList.add('row');
            for (let j = 0; j < 3; j++) {
                let cell = document.createElement("div");
                cell.classList.add('cell')
                cell.id = i + "" + j;
                cell.innerHTML = gridMorpion[i][j];
                cell.addEventListener("click", handleClick)
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }
    if (gameMode === "P4Pvp" || gameMode === "P4Pvc") {
        board.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            let row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 7; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cellP4');
                cell.id = i + "" + j;
                cell.innerHTML = gridP4[i][j];
                cell.addEventListener("click", handleClick)
                row.appendChild(cell);
            }
            board.appendChild(row)
        }
    }
}

// Création de la fonction pour gérer le clic sur les cells
function handleClick(event) {
    if (winner === "") {
        let id = event.target.id;
        let i = parseInt(id[0]);
        let j = parseInt(id[1]);
        if (gameMode === "morpionPvp" || gameMode === "morpionPvc") {
            if (gridMorpion[i][j] !== "") {
                console.log("Choisissez une case vide !");
                return
            }
            else if (gridMorpion[i][j] === "") {
                gridMorpion[i][j] = player;
                if (player === "X") {
                    currentPlayer.innerHTML = "O";
                } else {
                    currentPlayer.innerHTML = 'X';
                }
                displayGrid();
                moves++;
                checkWinner();
                switchPlayer();
                if (gameMode === "morpionPvc" && !gameover) {
                    playComputer();
                }
            }
        }
        if (gameMode === "P4Pvp" || gameMode === "P4Pvc") {
            if (gridP4[i][j] !== "") {
                console.log("Choisissez une case vide !");
                return
            }
            else if (gridP4[i][0] === "") {
                while (i < 6 && gridP4[i][j + 1] === "") {
                    j++
                }
                gridP4[i][j] = player;
                if (player === "X") {
                    currentPlayer.innerHTML = "O";
                } else {
                    currentPlayer.innerHTML = 'X';
                }
                displayGrid();
                moves++;
                checkWinner();
                switchPlayer();
                if (gameMode === "P4Pvc" && !gameover) {
                    playComputer();
                }
            }
        }
    }
}

// Céation de la fonction pour vérifier si il existe une combinaison gagnante
function checkWinner() {
    if (gameMode === "morpionPvp" || gameMode === "morpionPvc") {
        for (let i = 0; i < 3; i++) {
            if (
                gridMorpion[i][0] !== "" &&
                gridMorpion[i][0] === gridMorpion[i][1] &&
                gridMorpion[i][1] === gridMorpion[i][2]
            ) {
                winner = gridMorpion[i][0];
            }
        }
        for (let j = 0; j < 3; j++) {
            if (
                gridMorpion[0][j] !== "" &&
                gridMorpion[0][j] === gridMorpion[1][j] &&
                gridMorpion[1][j] === gridMorpion[2][j]
            ) {
                winner = gridMorpion[0][j];
            }
        }
        if (
            gridMorpion[0][0] !== "" &&
            gridMorpion[0][0] === gridMorpion[1][1] &&
            gridMorpion[1][1] === gridMorpion[2][2]
        ) {
            winner = gridMorpion[0][0];
        }
        if (
            gridMorpion[0][2] !== "" &&
            gridMorpion[0][2] === gridMorpion[1][1] &&
            gridMorpion[1][1] === gridMorpion[2][0]
        ) {
            winner = gridMorpion[0][2];
        }
        if (winner !== "") {
            gameover = true
            if (winner === "X") {
                xWins++;
                scoreX.innerHTML = xWins;
                displayWinner.innerHTML = "Player X a gagné !";
                return
            } else if (winner === "O") {
                oWins++;
                scoreO.innerHTML = oWins;
                displayWinner.innerHTML = "Player O a gagné !";
                return
            }
        }
        else if (moves === 9) {
            gameover = true
            drawCount++;
            draws.innerHTML = drawCount;
            displayWinner.innerHTML = "Match nul !";
            return
        }
    } else if (gameMode === "P4Pvp" || gameMode === "P4Pvc") {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                if (
                    gridP4[i][j] !== "" &&
                    gridP4[i][j] === gridP4[i][j + 1] &&
                    gridP4[i][j + 1] === gridP4[i][j + 2] &&
                    gridP4[i][j + 2] === gridP4[i][j + 3]
                ) {
                    winner = gridP4[i][j];
                }
            }
        }
        for (let j = 0; j < 7; j++) {
            for (let i = 0; i < 3; i++) {
                if (
                    gridP4[i][j] !== "" &&
                    gridP4[i][j] === gridP4[i + 1][j] &&
                    gridP4[i + 1][j] === gridP4[i + 2][j] &&
                    gridP4[i + 2][j] === gridP4[i + 3][j]
                ) {
                    winner = gridP4[i][j];
                }
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if (
                    gridP4[i][j] !== "" &&
                    gridP4[i][j] === gridP4[i + 1][j + 1] &&
                    gridP4[i + 1][j + 1] === gridP4[i + 2][j + 2] &&
                    gridP4[i + 2][j + 2] === gridP4[i + 3][j + 3]
                ) {
                    winner = gridP4[i][j];
                }
            }
        }
        for (let i = 3; i < 6; i++) {
            for (let j = 0; j < 4; j++) {
                if (
                    gridP4[i][j] !== "" &&
                    gridP4[i][j] === gridP4[i - 1][j + 1] &&
                    gridP4[i - 1][j + 1] === gridP4[i - 2][j + 2] &&
                    gridP4[i - 2][j + 2] === gridP4[i - 3][j + 3]
                ) {
                    winner = gridP4[i][j];
                }
            }
        }
        if (winner !== "") {
            if (winner === "X") {
                xWins++;
                scoreX.innerHTML = xWins;
                displayWinner.innerHTML = "Player X a gagné !";
                return
            } else if (winner === "O") {
                oWins++;
                scoreO.innerHTML = oWins;
                displayWinner.innerHTML = "Player O a gagné !";
                return
            }
        }
        else if (moves === 42) {
            drawCount++;
            draws.innerHTML = drawCount;
            displayWinner.innerHTML = "Match nul !";
            return
        }
    }
}



// Création de la fonction pour switch le joueur en cours
function switchPlayer() {
    if (player === "X") {
        player = "O"
    }
    else {
        player = "X";
    }
}

// Création de la fonction random
let randomMorpionI = 0;
let randomMorpionJ = 0;
let randomP4I = 0;
function randomize() {
    randomMorpionI = randomNumber(0,2)
    randomMorpionJ =randomNumber(0,2)
    randomP4I = randomNumber(0,5)
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Création de la fonction pour faire jouer l'ordinateur
function playComputer() {
    if (gameMode === "morpionPvc" && winner === "") {
        randomize();
        let i = randomMorpionI;
        let j = randomMorpionJ;
        if (gridMorpion[i][j] === "") {
            gridMorpion[i][j] = player;
            displayGrid();
            moves++;
            checkWinner();
            switchPlayer();
        } else {
            i = 0;
            j = 0;
            playComputer();
        }
    }
    else if (gameMode === "P4Pvc" && winner === "") {
        randomize();
        let i = randomP4I;
        let j = 0;
        console.log(i);
        if (gridP4[i][0] === "") {
            while (gridP4[i][j + 1] === "") {
                j++
            }
            gridP4[i][j] = player;
            displayGrid();
            checkWinner();
            switchPlayer();
        } else {
            i = 0;
            j = 0;
            playComputer();
        }
    }
}

// Création de la fonction pour reset le jeu
// Réinitialisation des tableaux
function resetGame() {
    gridMorpion = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    gridP4 = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""]
    ]

    player = "X";
    winner = "";
    gameover = false;
    moves = 0;
    currentPlayer.innerHTML = "X";
    displayWinner.innerHTML = "";
    displayGrid();
}