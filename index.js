
// later if needed divide the board function into multiple small functions.

const Result = (function(){

    const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
console.log(winConditions);
return {winConditions};

})();


const Board =function(){

const win = Result;
const cells = document.querySelectorAll(".cell");
const status = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");


let currentPlayer = "X";
let running = false;

let options = ["", "", "", "", "", "", "", "", ""];
// try to initialize the game using button.
initializeGame();

function initializeGame(){
cells.forEach(cell => cell.addEventListener("click",cellClicked));
restartBtn.addEventListener("click",restartGame);
statusText.textContent = `${currentPlayer}'s turn`;
running = true;
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell,index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O":"X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell=> cell.textContent = '');
    running = true;
}

const checkWinner = ()=>{
    let roundWon = false;

    for(let i=0; i < win.winConditions.length; i++){
        const condition = win.winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins`;
        running = false;
    } else if(!options.includes("")){
        statusText.textContent = `Draw`;
    } else{
        changePlayer();
    }
}


return{changePlayer,updateCell,cellClicked,initializeGame}
};

const gaem = Board();







