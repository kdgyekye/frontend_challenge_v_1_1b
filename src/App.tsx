import { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//component imports
import Home from './pages/home/home';
import SelectCharacter from './pages/select-character/selectCharacter';
import Fight from './pages/fight/fight';
import GameSummary from './pages/game-summary/gameSummary';

import './App.css';
import { IAppState, isAppStarted, appStartAction, getUserSelectedCharacter, setComputerPreference } from './getStore';
import { Character } from './utils/characters';

export interface IAppProps {
  started: boolean;
  onStart: () => void;
  setComputerPreference: () => void;
  userCharacter: Character | null;
}

export const AppFC: FC<IAppProps> = ({ started, onStart, userCharacter, setComputerPreference }) => {
  useEffect(() => {
    if (!started) {
      onStart();
    }
  }, [started, onStart]);

  useEffect(() => {
    setComputerPreference();
  },[])

  if (!started) {
    return <span className="loading">Loading...</span>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select-character" element={<SelectCharacter />} />
        <Route 
          path="/fight" 
          element={
            userCharacter?
            <Fight />
            :
            <SelectCharacter />
          } 
          />
        <Route path="/game-summary" element={<GameSummary />} />
      </Routes>
    </Router>
  );
};

export const mapStateToProps = (state: IAppState) => {
  const started = isAppStarted(state);
  const userCharacter = getUserSelectedCharacter(state);
  return {
    started,
    userCharacter
  };
};

export const mapDispatchToProps = (dispatch:any) => ({
  onStart: () => dispatch(appStartAction()),
  setComputerPreference: () => dispatch(setComputerPreference()),
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppFC);
export default App;
