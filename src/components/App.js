import { useState, useEffect } from 'react';
import '../App.css';
import Square from './Sqaure';
import {Patterns} from '../Patterns';
import WinnerModal from './WinnerModal';

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] =  useState("X");
  const [result, setResult] = useState({winner: "none", state: "none"});
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    checkWinner();
    checkIfTie();
  }, [board]);

  useEffect(() => {
    if(result.state !== "none"){
      setShowWinnerModal(true);
    }

    if(showWinnerModal){
      restartGame();
      setShowWinnerModal(false);
    }
  }, [result])


  const chooseSquare = (sqaure) => {
      setBoard(board.map((val, index) => {
        if((index === sqaure) && (val === "")){
          if(player === "X")
            setPlayer("O");
          else
            setPlayer("X");
          return player;
        }
        
        return val;
      }));
  };

  const checkWinner = () => {
      Patterns.forEach((pattern) => {
        const currPlayer = board[pattern[0]];
        if(currPlayer === "")
          return;

        let winningPatternFound = true;
        pattern.forEach((index) => {
          if(board[index] !== currPlayer)
            winningPatternFound = false;
        });

        if(winningPatternFound){
          setResult({winner: `Player ${currPlayer} won`, state: "won"});
        }
      });
  };


  const checkIfTie = () => {
    let isTie = true;

    board.forEach((square) => {
      if(square === ""){
        isTie = false;
      }
    })

    if(isTie)
      setResult({winner:"Tie Breaker", state: "tie"});
  }
  
  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
    setResult({winner: "none", state: "none"});
  };


  return (
    <div className="App">
      <h1 className='gameHeading'>Tic-Tac-Toe</h1><br/>
      {showWinnerModal && (
        <WinnerModal winner={result.winner} />
      )}
      <br />
      <div className="board">
          <div className="row">
            <Square val={board[0]} chooseSquare={() => {
              chooseSquare(0);
              }} 
            />
            <Square val={board[1]} chooseSquare={() => {
              chooseSquare(1);
              }}
            />
            <Square val={board[2]} chooseSquare={() => {chooseSquare(2);}} />
          </div>
          <div className="row">
            <Square val={board[3]} chooseSquare={() => {chooseSquare(3);}} />
            <Square val={board[4]} chooseSquare={() => {chooseSquare(4);}} />
            <Square val={board[5]} chooseSquare={() => {chooseSquare(5);}} />
          </div>
          <div className="row">
            <Square val={board[6]} chooseSquare={() => {chooseSquare(6);}} />
            <Square val={board[7]} chooseSquare={() => {chooseSquare(7);}} />
            <Square val={board[8]} chooseSquare={() => {chooseSquare(8);}} />
          </div>
      </div>
    </div>
  );
}

export default App;
