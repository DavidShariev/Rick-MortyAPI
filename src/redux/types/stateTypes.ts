import { ICharactersInfo, ICharacter, IEpisode, IEpisodesInfo, ILocation, ILocationsInfo } from "./dataTypes";

export interface IState{
    loading: boolean,
    error: Error | null,
    charactersData: ICharactersData,
    locationsData: ILocationsData,
    episodesData: IEpisodesData,
    activeCharacter: ICharacter | null,
    activeLocation: ILocation | null,
    activeEpisode: IEpisode | null,
}
export interface ICharactersData{
    info: ICharactersInfo,
    results: ICharacter[] // пулл героев
}
export interface ILocationsData{
    info: ILocationsInfo,
    results: ILocation[] // пулл локаций
}
export interface IEpisodesData{
    info: IEpisodesInfo,
    results: IEpisode[] // пулл эпизодов
}
