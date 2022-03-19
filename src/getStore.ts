import { Action, applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Character, characters } from './utils/characters';
//import {createSelector} from 'reselect'

// action type(s)
export const APP_START = 'APP_START';
export const USER_WIN = 'USER_WIN';
export const COMP_WIN = 'COMP_WIN';
export const DRAW = 'DRAW';
export const USER_WIN_ROUND = 'USER_WIN_ROUND';
export const COMP_WIN_ROUND = 'COMP_WIN_ROUND';
export const SELECT_CHARACTER = 'SELECT_CHARACTER'
export const GAME_FINISHED = 'GAME_FINISHED';
export const UPDATE_ROUNDS = 'UPDATE_ROUNDS';
export const USER_SELECTIONS = 'USER_SELECTIONS';
export const COMP_SELECTIONS = 'COMP_SELECTIONS';
export const RESET_GAME = 'RESET_GAME';
export const SET_COMP_PREFERENCE = 'SET_COMP_PREFERENCE';

export type APP_START_TYPE = typeof APP_START;
export type USER_WIN_TYPE = typeof USER_WIN;
export type COMP_WIN_TYPE = typeof COMP_WIN;
export type DRAW_TYPE = typeof DRAW;
export type USER_WIN_ROUND_TYPE = typeof USER_WIN_ROUND;
export type COMP_WIN_ROUND_TYPE = typeof COMP_WIN_ROUND;
export type SELECT_CHARACTER_TYPE = typeof SELECT_CHARACTER;
export type GAME_FINISHED_TYPE = typeof GAME_FINISHED;
export type UPDATE_ROUNDS_TYPE = typeof UPDATE_ROUNDS;
export type USER_SELECTIONS_TYPE = typeof USER_SELECTIONS;
export type COMP_SELECTIONS_TYPE = typeof COMP_SELECTIONS;
export type RESET_GAME_TYPE = typeof RESET_GAME;
export type SET_COMP_PREFERENCE_TYPE = typeof SET_COMP_PREFERENCE;

export interface IAppStartAction extends Action<APP_START_TYPE> {
  type: APP_START_TYPE;
}

export interface ICharacterSelectionAction extends Action<SELECT_CHARACTER_TYPE> {
  type: SELECT_CHARACTER_TYPE;
  payload: any
}

export interface Round {
  userSelection: Character[];
  compSelection: Character[];
}

export interface History {
  Rounds: Round[];
}

export type TAppActions = IAppStartAction | ICharacterSelectionAction;

// action builder(s)
export const appStartAction: () => IAppStartAction = () => ({
  type: APP_START,
});

export const selectCharacterAction  = (userCharacter: any, computerCharacter:any) => ({
  type: SELECT_CHARACTER,
  payload: [userCharacter, computerCharacter]
})

export const userWinAction = () => ({
  type: USER_WIN,
})

export const compWinAction = () => ({
  type: COMP_WIN,
})

export const drawAction = () => ({
  type: DRAW,
})

export const userWinRoundAction = () => ({
  type: USER_WIN_ROUND,
})

export const compWinRoundAction = () => ({
  type: COMP_WIN_ROUND,  
})

export const increaseRounds = () => ({
  type: UPDATE_ROUNDS
})

export const setGameFinished = () => ({
  type: GAME_FINISHED
})

export const newGame = () => ({
  type: RESET_GAME
})

export const setComputerPreference = () => ({
  type: SET_COMP_PREFERENCE
})

// state definition
export interface IAppState {
  started: boolean;
  userScore: number;
  computerScore: number;
  userSelectedCharacter: Character | null;
  computerSelectedCharacter: Character | null;
  gameFinished: boolean
  rounds: number
  userSelections: Character[] | []
  compSelections: Character[] | []
  computerCharacters: Character[]

}

export const initialState: IAppState = {
  started: false,
  userScore: 0,
  computerScore: 0,
  userSelectedCharacter: null,
  computerSelectedCharacter: null,
  gameFinished: false,
  rounds: 1,
  userSelections: [],
  compSelections: [],
  computerCharacters: characters
};

// app reducer
export function appReducer(state: IAppState = initialState, action: any) {
  switch (action.type) {
    case APP_START:
      return {
        ...state,
        started: true,
      };
    case SELECT_CHARACTER:
      return {
        ...state,
        userSelectedCharacter: action.payload[0],
        computerSelectedCharacter: action.payload[1],
        userSelections: [...state.userSelections, action.payload[0]],
        compSelections: [...state.compSelections, action.payload[1]]
      }
    case USER_WIN:
      return {
        ...state,
        userScore: state.userScore + 1,
      }
    case COMP_WIN:
      return {
        ...state,
        computerScore: state.computerScore + 1,
      }
    case DRAW:
      return {
        ...state,
      }  
    case UPDATE_ROUNDS:
      return {
        ...state,
        rounds: state.rounds + 1
      }        
    case GAME_FINISHED:
      return {
        ...state,
        gameFinished: !state.gameFinished
      }

    case RESET_GAME: 
      return {
        ...state,
        userScore: 0,
        computerScore: 0,
        gameFinished: !state.gameFinished,
        userSelectedCharacter: null,
        computerSelectedCharacter: null,
        rounds: 1,
        userSelections: [],
        compSelections: [],
        computerCharacters: characters
      }  
    case SET_COMP_PREFERENCE:
      return {
        ...state,
        computerCharacters: state.computerCharacters.concat(characters[Math.floor(Math.random() * characters.length)])
      }  
    default:
      return state;
  }
}

// started state selector
export const isAppStarted = (state: IAppState) => state.started;

//state selectors
export const getUserSelectedCharacter = (state: IAppState) => state.userSelectedCharacter;
export const getComputerSelectedCharacter = (state: IAppState) => state.computerSelectedCharacter;
export const getUserScore = (state: IAppState) => state.userScore;
export const getComputerScore = (state: IAppState) => state.computerScore;
export const getGameFinished = (state: IAppState) => state.gameFinished;
export const getRounds = (state: IAppState) => state.rounds;
export const getUserChoices = (state: IAppState) => state.userSelections;
export const getCompChoices = (state: IAppState) => state.compSelections;
export const getComputerCharacters = (state: IAppState) => state.computerCharacters;

export type AppStore = Store<IAppState, TAppActions | Action>;

export default function getStore(): AppStore {
  const store = createStore(appReducer, composeWithDevTools(applyMiddleware()));
  return store;
}
