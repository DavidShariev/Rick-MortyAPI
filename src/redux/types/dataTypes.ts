
export interface ICharacter{ //данные героя
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    } | ILocation, 
    image: string,
    episode: string[] | IEpisode[], //изначально хранит API адреса эпизодов с героем. На странице героя принимает массив эпизодов.
    url: string,
    created: string
}
export interface ICharactersInfo{ //инф. о пулле героев
    count: number,
    pages: number,
    activePage: number,
    next: string | null,
    prev: string | null
}
export interface ILocation{ //данные локации
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string[] | ICharacter[], //изначально хранит API адреса героев, относящихся к лоцации. На странице локации принимает массив данныx этих героев
    url: string,
    created: string
}
export interface ILocationsInfo{ //инф. о пулле локаций
    count: number,
    pages: number,
    activePage: number,
    next: string | null,
    prev: string | null
}
export interface IEpisode{ //данные эпизода
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[] | ICharacter[], //изначально хранит API адреса героев, относящихся к эпизоду. На странице эпизода принимает массив данных этих героев
    url: string,
    created: string
}
export interface IEpisodesInfo{ //инф. о пулле эпизодов
    count: number,
    pages: number,
    activePage: number,
    next: string | null,
    prev: string | null
}