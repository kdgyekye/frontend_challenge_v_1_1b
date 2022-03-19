import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getUserChoices, IAppState, getCompChoices, newGame } from '../../getStore';
import { Character } from '../../utils/characters';
import {useNavigate} from 'react-router-dom';

interface Summary {
  user: string;
  computer: string;
  round: number;
}

const cols = ['round', 'user', 'computer'];
const GameSummary = (props: any) => {
  const { userChoices, compChoices, playNewGame } = props;
  const gameSummary: Summary[] = [];

  for (var i = 0; i < userChoices.length; i++) {
    gameSummary.push({
      round: i + 1,
      user: userChoices[i]?.name,
      computer: compChoices[i]?.name,
    });
  }

  const navigate = useNavigate();

  console.log(gameSummary);
  return (
    <Fragment>
      <div className="absolute flex justify-center w-full h-full overflow-auto bg-gray-700 text-gray-100">
        <div className="mb-10 ">
          <div 
            className='mt-5 border flex justify-center items-center cursor-pointer hover:bg-blue-700 hover:text-white'
            onClick={() => {
                playNewGame()
                navigate('/')}
            }
            >
              <div className='p-2'>Play New Game</div>
              </div>  
          <h1 className="text-3xl font-bold my-5">Game Summary</h1>
          <table>
            <thead>
              <tr>
                {cols.map((col: string, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gameSummary?.map((summary, i) => (
                <tr key={i} className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  {cols.map((col: string, j) => (
                    <Fragment key={j}>
                      <td
                        key={j}
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium text-gray-900">
                        {summary[col as keyof Summary]}
                      </td>
                    </Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: IAppState) => {
  return {
    userChoices: getUserChoices(state),
    compChoices: getCompChoices(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        playNewGame: () => {
            dispatch(newGame())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameSummary);
