import { FAILURE_LOADING_DATA, SET_ACTIVE_CHARACTER, SET_ACTIVE_EPISODE, SET_ACTIVE_LOCATION, SET_CHARACTERS_DATA, SET_EPISODES_DATA, SET_LOCATIONS_DATA, START_LOADING_DATA, SUCCESS_LOADING_DATA } from './actions';
import { TypeActions } from './types/actionTypes';
import { IState } from "./types/stateTypes";

export const initialState: IState = {
    loading: false,
    error: null,
    charactersData: {
        info: {
            count: 0,
            pages: 0,
            activePage: 0,
            next: null,
            prev: null
        },
        results: []
    },
    locationsData: {
        info: {
            count: 0,
            pages: 0,
            activePage: 0,
            next: null,
            prev: null
        },
        results: []
    },
    episodesData: {
        info: {
            count: 0,
            pages: 0,
            activePage: 0,
            next: null,
            prev: null
        },
        results: []
    },
    activeCharacter: null,
    activeLocation: null,
    activeEpisode: null
}

export const reducer = (state=initialState, action: TypeActions): IState => {
    switch(action.type){
        case START_LOADING_DATA: {
            return ({...state, loading: true})
        }
        case FAILURE_LOADING_DATA: {
            return ({...state, loading: false, error: action.error})
        }
        case SUCCESS_LOADING_DATA: {
            return ({...state, loading: false, error: null})
        }
        case SET_CHARACTERS_DATA: {
            return ({...state, charactersData: action.charactersData})
        }
        case SET_LOCATIONS_DATA: {
            return ({...state, locationsData: action.locationsData})
        }
        case SET_EPISODES_DATA: {
            return ({...state, episodesData: action.episodesData})
        }
        case SET_ACTIVE_CHARACTER: {
            return ({...state, activeCharacter: action.activeCharacter})
        }
        case SET_ACTIVE_LOCATION: {
            return ({...state, activeLocation: action.activeLocation})
        }
        case SET_ACTIVE_EPISODE: {
            return ({...state, activeEpisode: action.activeEpisode})
        }
        
        default: return state
    }
}