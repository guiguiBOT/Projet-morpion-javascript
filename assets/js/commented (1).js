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
    ["", "", "", "", "", "", ""]
]

// Récupération de l'élément html qui contient la grille de jeu
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
        console.log(id);
        let i = parseInt(id[0]);
        console.log(i);
        let j = parseInt(id[1]);
        console.log(j);
        console.log(gameMode);
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
                if (gameMode === "morpionPvc") {
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
                console.log(gridP4);
                displayGrid();
                moves++;
                checkWinner();
                switchPlayer();
                if (gameMode === "P4Pvc") {
                    playComputer();
                }
            }
        }
    }
}

// Création de la fonction qui vérifie si il existe une combinaison gagnante pour le morpion
function checkWinner() {
    if (gameMode === "morpionPvp" || gameMode === "morpionPvc") {
        for (let i = 0; i < 3; i++) {
            // Vérrification si une ligne contient trois symboles identiques
            if (
                gridMorpion[i][0] !== "" &&
                gridMorpion[i][0] === gridMorpion[i][1] &&
                gridMorpion[i][1] === gridMorpion[i][2]
            ) {
                winner = gridMorpion[i][0];
            }
        }
        for (let j = 0; j < 3; j++) {
            // Vérification si une colonne contient trois symboles identiques
            if (
                gridMorpion[0][j] !== "" &&
                gridMorpion[0][j] === gridMorpion[1][j] &&
                gridMorpion[1][j] === gridMorpion[2][j]
            ) {
                winner = gridMorpion[0][j];
            }
        }
        // Vérification de la diagonale descendante
        if (
            gridMorpion[0][0] !== "" &&
            gridMorpion[0][0] === gridMorpion[1][1] &&
            gridMorpion[1][1] === gridMorpion[2][2]
        ) {
            winner = gridMorpion[0][0];
        }
        // Vérification de la diagonale montante
        if (
            gridMorpion[0][2] !== "" &&
            gridMorpion[0][2] === gridMorpion[1][1] &&
            gridMorpion[1][1] === gridMorpion[2][0]
        ) {
            winner = gridMorpion[0][2];
        }
        // vérification si le gagnant est défini
        if (winner !== "") {
            // Incrémentation des variables qui contiennent le nombre de victoire
            // et affichage des score dans le scoreboard
            if (winner === "X") {
                xWins++;
                scoreX.innerHTML = xWins;
            } else if (winner === "O") {
                oWins++;
                scoreO.innerHTML = oWins;
            }
        }
        // Vérification si le nombre de coups joués possibles a été atteint
        // incrémentation de la variable qui contient le nombre de draw
        // affichage dans le scoreboard
        else if (moves === 9) {
            drawCount++;
            draws.innerHTML = drawCount;
        }
    // Vérification si il existe une combinaison gagnante pour le puissance 4
    } else if (gameMode === "P4Pvp" || gameMode === "P4Pvc") {
        // Création d'une boucle for pour parcourir les lignes
        for (let i = 0; i < 6; i++) {
            // Création d'une deuxième boucle pour parcourir les colonnes
            for (let j = 0; j < 4; j++) {
                // Vérification si une ligne contient 4 symboles identiques
                if (
                    gridP4[i][j] !== "" &&
                    gridP4[i][j] === gridP4[i][j + 1] &&
                    gridP4[i][j + 1] === gridP4[i][j + 2] &&
                    gridP4[i][j + 2] === gridP4[i][j + 3]
                ) {
                    // Définition du gagnant
                    winner = gridP4[i][j];
                }
            }
        }
        // Vérification si une colonne contient 4 symboles identiques
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
        // Vérification des diagonales montantes
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
        // Vérification des diagonales descendantes
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
        // Vérification si un gagnant est défini
        if (winner !== "") {
            // Incrémentation des variables qui contiennent le nombre de victoire
            // et affichage des score dans le scoreboard
            if (winner === "X") {
                xWins++;
                scoreX.innerHTML = xWins;
            } else if (winner === "O") {
                oWins++;
                scoreO.innerHTML = oWins;
            }
        }
        // Vérification si le nombre de coups joués possibles a été atteint
        // incrémentation de la variable qui contient le nombre de draw
        // affichage dans le scoreboard
        else if (moves === 42) {
            drawCount++;
            draws.innerHTML = drawCount;
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
    randomMorpionI = Math.floor(Math.random() * 3);
    randomMorpionJ = Math.floor(Math.random() * 3);
    randomP4I = Math.floor(Math.random() * 7);
}

// Création de la fonction pour faire jouer l'ordinateur
async function playComputer() {
    console.log("playcomputer");
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
        if (gridP4[i][0] === "") {
            while (i < 7 && gridP4[i][j + 1] === "") {
                j++
            }
            gridP4[i][j] = player;
            displayGrid();
            checkWinner();
            switchPlayer();
        } else {
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
    moves = 0;
    currentPlayer.innerHTML = "X";
    displayGrid();
}