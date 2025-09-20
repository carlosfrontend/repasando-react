import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import confetti from "canvas-confetti";
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { resetGameStorage, saveGameStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnfromStorage = window.localStorage.getItem("turn");
    return turnfromStorage ?? TURNS.x;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
    resetGameStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    saveGameStorage({
      board: newBoard,
      turn: newTurn,
    });
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
      resetGameStorage();
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // empate
      resetGameStorage();
    }
  };

  return (
    <main className="board">
      <h1 translate="no">Tic tac toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>
      <section className="game">
        {board.map((square, index) => (
          <Square updateBoard={updateBoard} key={index} index={index}>
            {square}
          </Square>
        ))}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
