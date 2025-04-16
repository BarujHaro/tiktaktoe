const Gameboard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];
    const restartB = document.getElementById('Restart');
    restartB.addEventListener('click', restartGame);
    const startB = document.getElementById('Start');
    startB.addEventListener('click', startGame);

    const cells = document.querySelectorAll(".board-cell");
    cells.forEach(cell => cell.disabled = true);

    function startGame() {
       
        cells.forEach(cell => cell.disabled = false);
        console.log("El juego ha comenzado. ¡Es el turno del jugador X!");
    } 

    const setCell = (index, marker) => {
        if (board[index] === "") { 
            board[index] = marker;
        }
    };

    const getBoard = () => board;



    function restartGame() {
        for (let i = 0; i < board.length; i++) {
            board[i] = ""; 
        }

        
        const cells = document.querySelectorAll(".board-cell");
        cells.forEach(cell => cell.textContent = "");
        players.setCurrentPlayer("X");
        players.colorSwitch("X");
     
        
    }

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; 
            }
        }
        
        return board.includes("") ? null : "tie"; 
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = ""; 

                    
        }
    };

    const getCell = (index) => board[index];

    const makeMove = (index, marker) => {
        if (board[index] === "") {
            setCell(index, marker);
            return checkWinner(); 
        }
        return null; 
    };

    return { setCell, getBoard, checkWinner, resetBoard, getCell, makeMove, restartGame };
})();

const players = (function() {
    let currentPlayer = "X"; 
    let scoreX = 0;
    let scoreO = 0;
    let message = document.querySelector('.message');
    
    
    function Score(resul){
        if(resul==="X"){
            scoreX+=1;
            document.getElementById("PlayerX").textContent = scoreX;
        }else{
            scoreO+=1;
            document.getElementById("PlayerO").textContent = scoreO;
        }

    }


    const cells = document.querySelectorAll(".board-cell");
    
    function colorSwitch(current) {
        if (current === "X") {
            document.getElementById("PXname").style.border = "2px solid #18ffff";
            document.getElementById("POname").style.backgroundColor = "";
        } else {
            document.getElementById("PXname").style.border = "2px solid #18ffff";
            document.getElementById("PXname").style.backgroundColor = "";
        }
    }
    colorSwitch(currentPlayer);


    const getCurrentPlayer = () => currentPlayer;
    const setCurrentPlayer = (player) => {
        currentPlayer = player;
        colorSwitch(currentPlayer);
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        colorSwitch(currentPlayer);
    };

    function displaym(mes,res){
        if(res==="X"||res==="O"){
            Score(res);
            message.textContent = mes;
            Gameboard.restartGame();
            setTimeout(() => {
                message.textContent = "";
            }, 3000);
        }else{
            message.textContent = "Tie";
            setTimeout(() => {
                message.textContent = "";
            }, 3000);
        }
    }
    
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (cell.textContent === "") {
                const result = Gameboard.makeMove(index, currentPlayer);
                cell.textContent = currentPlayer; 
                let mess = "";
                if (result === "X") {
                    mess = `¡${document.getElementById("PXname").value} has won!`;
                    displaym(mess, result);
                } else if (result === "O") {
                    mess = `¡${document.getElementById("POname").value} has won!`;
                    displaym(mess, result);
                } else if (result === "tie") {
                    mess = "Tie";
                    displaym(mess, result);
                } else {
                    // Cambia al siguiente jugador si no hay un ganador o un empate
                    players.switchPlayer();
                }
            }
        });
    });

    return {
        getCurrentPlayer,
        setCurrentPlayer,
        colorSwitch,
        switchPlayer
    };

})();
