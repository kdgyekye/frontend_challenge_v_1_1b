import React, { Fragment, FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  IAppState,
  getUserSelectedCharacter,
  getComputerSelectedCharacter,
  userWinAction,
  compWinAction,
  getUserScore,
  getComputerScore,
  drawAction,
  getRounds,
  increaseRounds,
  getGameFinished,
  setGameFinished,
} from '../../getStore';
import { Character } from '../../utils/characters';

interface IFightProps {
  userCharacter: Character | null;
  computerCharacter: Character | null;
  userWin: () => void;
  computerWin: () => void;
  draw: () => void;
  userScore: number;
  compScore: number;
  rounds: number;
  increaseRounds: () => void;
  gameFinished: boolean;
  setGameFinished: () => void;
}

const Fight: FC<IFightProps> = (props: any) => {
  const {
    userCharacter,
    computerCharacter,
    userScore,
    compScore,
    computerWin,
    userWin,
    draw,
    rounds,
    increaseRounds,
    gameFinished,
    setGameFinished,
  } = props;
  console.log(userCharacter?.imageUrl, computerCharacter?.imageUrl);
  console.log(userScore, compScore);

  const [winner, setWinner] = useState<string>();

  const navigate = useNavigate();

  const game = (userChoice: string, computerChoice: string) => {
    const combination = userChoice + computerChoice;
    switch (combination) {
      case 'CC':
      case 'AA':
      case 'PP':
        draw();
        setWinner('Draw');
        break;

      case 'CA':
      case 'AP':
      case 'PC':
        userWin();
        setWinner('User');
        break;
      case 'PA':
      case 'AC':
      case 'CP':
        computerWin();
        setWinner('Computer');
        break;
    }
  };

  useEffect(() => {
    if (userCharacter && computerCharacter) {
      setTimeout(() => {
        game(userCharacter.value, computerCharacter.value);
        if (rounds === 20) {
          setGameFinished();
        }
      }, 500);
    }
  }, [userCharacter, computerCharacter, rounds]);

  const calculateWinner = () => {
    if (userScore > compScore) {
      return 'User Won The Game';
    } else {
      if (compScore > userScore) {
        return 'Computer Won The Game';
      } else return 'It was a tie';
    }
  };

  return (
    <Fragment>
      <div className="absolute flex justify-center items-center w-full h-full bg-gray-300">
        <div className="flex flex-col items-center mb-10">
          <div className="flex justify-center mb-10">
            {!gameFinished ? (
              <h1 className="text-xl font-bold">ROUND {rounds}</h1>
            ) : (
              <div className="flex items-center space-x-3 text-indigo-600">
                <h1 className="text-xl">GAME OVER!</h1>
                <h2 className="text-xl">{calculateWinner()}</h2>
              </div>
            )}
          </div>
          {winner ? (
            <div
              className={`flex justify-center mb-5 p-4 ${
                winner === 'Computer' ? 'bg-red-500' : winner === 'User' ? 'bg-green-500' : 'bg-yellow-500'
              }`}>
              <h2 className="text-gray-100">{`${winner?.toUpperCase()} won !`}</h2>
            </div>
          ) : null}
          <div className="flex justify-center space-x-10 mb-5">
            <div>
              <h1 className="text-xl font-bold">{userScore}</h1>
            </div>
            <div>
              <h1 className="text-xl">SCORES</h1>
            </div>
            <div>
              <h1 className="text-xl font-bold">{compScore}</h1>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-10">
            <div className="border bg-white rounded-md shadow-md hover:shadow-lg">
              <img className="w-40 h-40" src={userCharacter?.imageUrl} alt={userCharacter?.name} />
              <label className="flex justify-center">{userCharacter?.name}</label>
            </div>
            <div>
              <h1 className="text-xl">VS</h1>
            </div>
            <div className="border bg-white rounded-md shadow-md hover:shadow-lg">
              <img className="w-40 h-40" src={computerCharacter?.imageUrl} alt={computerCharacter?.name} />
              <label className="flex justify-center">{computerCharacter?.name}</label>
            </div>
          </div>
          {winner ? (
            <div className="flex justify-center mt-16 border border-yellow-500 rounded-md hover:bg-white">
              {gameFinished ? (
                <button
                  className="p-2  text-yellow-500"
                  onClick={() => {
                    navigate('/game-summary');
                  }}>
                  View Game Summary
                </button>
              ) : (
                <button
                  className="p-2  text-yellow-500"
                  onClick={() => {
                    increaseRounds();
                    navigate('/select-character');
                  }}>
                  Play Again
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    userCharacter: getUserSelectedCharacter(state),
    computerCharacter: getComputerSelectedCharacter(state),
    userScore: getUserScore(state),
    compScore: getComputerScore(state),
    rounds: getRounds(state),
    gameFinished: getGameFinished(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    userWin: () => dispatch(userWinAction()),
    computerWin: () => dispatch(compWinAction()),
    draw: () => dispatch(drawAction()),
    increaseRounds: () => dispatch(increaseRounds()),
    setGameFinished: () => dispatch(setGameFinished()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Fight);
