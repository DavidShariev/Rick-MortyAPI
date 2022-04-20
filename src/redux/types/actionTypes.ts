import { START_LOADING_DATA, FAILURE_LOADING_DATA, SUCCESS_LOADING_DATA, SET_LOCATIONS_DATA, SET_CHARACTERS_DATA, SET_EPISODES_DATA, SET_ACTIVE_CHARACTER, SET_ACTIVE_LOCATION, SET_ACTIVE_EPISODE } from "../actions";
import { ICharacter, IEpisode, ILocation } from "./dataTypes";
import { ICharactersData, IEpisodesData, ILocationsData } from "./stateTypes";

export interface IStartLoadingData {
    type: typeof START_LOADING_DATA
}
export interface IFailureLoadingData {
    type: typeof FAILURE_LOADING_DATA;
    error: Error
}
export interface ISuccessLoadingData {
    type: typeof SUCCESS_LOADING_DATA,
}
export interface ISetCharactersData {
    type: typeof SET_CHARACTERS_DATA,
    charactersData: ICharactersData
}
export interface ISetLocationsData {
    type: typeof SET_LOCATIONS_DATA,
    locationsData: ILocationsData
}
export interface ISetEpisodesData {
    type: typeof SET_EPISODES_DATA,
    episodesData: IEpisodesData
}
export interface ISetActiveCharacter {
    type: typeof SET_ACTIVE_CHARACTER,
    activeCharacter: ICharacter
}
export interface ISetActiveLocation {
    type: typeof SET_ACTIVE_LOCATION,
    activeLocation: ILocation
}
export interface ISetActiveEpisode {
    type: typeof SET_ACTIVE_EPISODE,
    activeEpisode: IEpisode
}

export type TypeActions = //типы экшинов
    IStartLoadingData |
    IFailureLoadingData |
    ISuccessLoadingData |
    ISetCharactersData |
    ISetLocationsData |
    ISetEpisodesData |
    ISetActiveCharacter |
    ISetActiveEpisode |
    ISetActiveLocation;

export type SetDataTypes = //тип для определений загрузки данных в методе запроса данных
    typeof SET_CHARACTERS_DATA |
    typeof SET_LOCATIONS_DATA |
    typeof SET_EPISODES_DATA;

export type setActiveTypes = 
    typeof SET_ACTIVE_CHARACTER |
    typeof SET_ACTIVE_LOCATION |
    typeof SET_ACTIVE_EPISODE;