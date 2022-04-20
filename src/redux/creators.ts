import { Dispatch } from "react";
import { FAILURE_LOADING_DATA, SET_ACTIVE_CHARACTER, SET_ACTIVE_EPISODE, SET_ACTIVE_LOCATION, SET_CHARACTERS_DATA, SET_EPISODES_DATA, SET_LOCATIONS_DATA, START_LOADING_DATA, SUCCESS_LOADING_DATA } from "./actions";
import { TypeActions, IFailureLoadingData, ISetCharactersData, ISetEpisodesData, ISetLocationsData, IStartLoadingData, ISuccessLoadingData, SetDataTypes, setActiveTypes, ISetActiveCharacter, ISetActiveLocation, ISetActiveEpisode } from "./types/actionTypes";
import { ICharacter, IEpisode, ILocation } from "./types/dataTypes";
import { ICharactersData, IEpisodesData, ILocationsData } from "./types/stateTypes";

export const startLoadingData = (): IStartLoadingData => {
    return {
        type: START_LOADING_DATA
    }
}
export const failureLoadingData = (error: Error): IFailureLoadingData => {
    return {
        type: FAILURE_LOADING_DATA,
        error
    }
}
export const successLoadingData = (): ISuccessLoadingData => {
    return {
        type: SUCCESS_LOADING_DATA
    }
}

export const setCharactersData = (charactersData: ICharactersData): ISetCharactersData => {
    return {
        type: SET_CHARACTERS_DATA,
        charactersData
    }
}
export const setLocationsData = (locationsData: ILocationsData): ISetLocationsData => {
    return {
        type: SET_LOCATIONS_DATA,
        locationsData
    }
}
export const setEpisodesData = (episodesData: IEpisodesData): ISetEpisodesData => {
    return {
        type: SET_EPISODES_DATA,
        episodesData
    }
}
export const setActiveCharacter = (activeCharacter: ICharacter): ISetActiveCharacter => {
    return({
        type: SET_ACTIVE_CHARACTER,
        activeCharacter
    });
} 
export const setActiveLocation = (activeLocation: ILocation): ISetActiveLocation => {
    return({
        type: SET_ACTIVE_LOCATION,
        activeLocation
    })
}
export const setActiveEpisode = (activeEpisode: IEpisode): ISetActiveEpisode => {
    return({
        type: SET_ACTIVE_EPISODE,
        activeEpisode
    })
}

export const getListData = ( page: number=1, type: SetDataTypes) => {
    return(dispatch: Dispatch<TypeActions>) => {
        dispatch(startLoadingData());
        const methodId = //определение нопходимого метода запроса и установки данных
            [SET_CHARACTERS_DATA, SET_LOCATIONS_DATA, SET_EPISODES_DATA].indexOf(type);
        const address = //определение адресса, к которому необходимо обратиться
            [
                `https://rickandmortyapi.com/api/character/?page=${page}`,
                `https://rickandmortyapi.com/api/location?page=${page}`,
                `https://rickandmortyapi.com/api/episode?page=${page}`
            ][methodId]
        const setDataFunc = //определение экшена
            [
                setCharactersData,
                setLocationsData,
                setEpisodesData
            ][methodId]
        
        return fetch(address)
            .then(
                response => response.json(),
                error => dispatch(failureLoadingData(error))
            )
            .then(
                json => {
                    dispatch(successLoadingData());
                    return dispatch(setDataFunc({
                        ...json,
                        info: {
                            ...json.info,
                            activePage: page
                        }
                    }))

                }
            )
    }
}
export const getActiveData = (id: number, type: setActiveTypes) => {
    return(dispatch: Dispatch<TypeActions>) => {
        dispatch(startLoadingData());
        const methodId =
            [SET_ACTIVE_CHARACTER, SET_ACTIVE_LOCATION, SET_ACTIVE_EPISODE].indexOf(type);
        const address =
            [
                `https://rickandmortyapi.com/api/character/${id}`,
                `https://rickandmortyapi.com/api/location/${id}`,
                `https://rickandmortyapi.com/api/episode/${id}`
            ][methodId];
        const setActiveMethod = // определения actionCreator'a
            [
                setActiveCharacter,
                setActiveLocation,
                setActiveEpisode
            ][methodId];
        const list = //определение свойства активного элемента, в который необходимо загрузить конкртеные данные
            [
                "episode",
                "residents",
                "characters"
            ][methodId]
        
        return fetch(address)
            .then(
                response => response.json(),
                error => dispatch(failureLoadingData(error))
            )
            .then(
                (json) => {
                    const activeElement = json;

                    const datas: ICharacter[] | IEpisode[] | ILocation[] = [] //массив конкретных данных: для героя - эпизоды в которых он учавствал, для локации - резиденты, для эпизода - герои
                    
                    //заметка: ошибка при неудачном обращение к серверу
                    const promises = activeElement[list].map( async (url: string) => { //массив промисов по запросу
                        await fetch(url)
                            .then(
                                response => response.json())
                            .then(json => datas.push(json))
                    })
                    Promise.all(promises).then( () => {
                        activeElement[list] = datas;
                        dispatch(setActiveMethod(activeElement))
                    })

                    return dispatch(successLoadingData());
                }
            )
    }
}

