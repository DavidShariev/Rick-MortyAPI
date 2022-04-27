import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SET_CHARACTERS_DATA, SET_EPISODES_DATA, SET_LOCATIONS_DATA } from '../../redux/actions';
import { getListData } from '../../redux/creators';
import { SetDataTypes } from '../../redux/types/actionTypes';
import { ICharacter, ICharactersInfo, IEpisode, IEpisodesInfo, ILocation, ILocationsInfo, listElementType } from '../../redux/types/dataTypes';
import { ICharactersData, IEpisodesData, ILocationsData } from '../../redux/types/stateTypes';
import { IState } from '../../redux/types/stateTypes';
import ListLink, { characterType, episodeType, listLinkElementType, locationType } from './ListLink/ListLink';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import "./List.scss";

export const charactersType = "characters";
export const episodesType = "episodes";
export const locationsType = "locations";

type listType = typeof charactersType | typeof episodesType | typeof locationsType;

type listDataType = ICharactersData | IEpisodesData | ILocationsData;
type listInfoType = ICharactersInfo | IEpisodesInfo | ILocationsInfo;
type listResultsType = ICharacter[] | IEpisode[] | ILocation[];

interface ListProps{
    type: listType;
}

const List: FC<ListProps> = (props) => {

    let listTitle: string; //заголовок страницы
    let getListDataType: SetDataTypes; //тип метода получения данных с сервера
    let elementType: listLinkElementType; //тип элемента для компонента ссылки
    switch(props.type){
        case(charactersType): {
            listTitle = "Characters";
            getListDataType = SET_CHARACTERS_DATA;
            elementType = characterType;
            break;
        }
        case(episodesType): {
            listTitle = "Epiosodes";
            getListDataType = SET_EPISODES_DATA;
            elementType = episodeType; 
            break;
        }
        case(locationsType): {
            listTitle = "Locations";
            getListDataType = SET_LOCATIONS_DATA;
            elementType = locationType;
            break;
        }
    }

    const dispatch = useDispatch();
    const listData: ICharactersData | ILocationsData | IEpisodesData
        = useSelector<IState, listDataType>(state => {
            switch(props.type){
                case charactersType: return state.charactersData;
                case episodesType: return state.episodesData;
                case locationsType: return state.locationsData;
            }
        })
    const listInfo: listInfoType = listData.info;
    const listResults: listResultsType = listData.results;

    useEffect(() => {
        dispatch(getListData(1, getListDataType))
    }, [dispatch, getListDataType]);

    const getOtherPage = (page: number) => {
        dispatch(getListData(page, getListDataType))
    }

    return (
        <div className="listPage" style={{paddingLeft: "400px"}}>
            <h1 className="listPage__title">{listTitle}
                <NavLink className="listPage__title-out" to="../">
                    Назад
                    <ArrowCircleLeftOutlinedIcon style={{marginLeft: "20px"}} fontSize="large" />
                </NavLink>
            </h1>
            {(listData) ?
                <div className="listPage__list">
                    {
                        listResults.map( (element: listElementType) => {
                            return(
                                <ListLink element={element} type={elementType} key={element.id}/>
                            )
                        })
                    }
                    <div className="listPage__nav">
                        {listInfo.activePage === 1 ?
                            <button className="listPage__nav-btn listPage__nav-btn--prev listPage__nav-btn--unactive">
                                Назад
                            </button> :
                            <button
                                onClick={getOtherPage.bind(this, listInfo.activePage - 1)}
                            >Назад</button>
                        }
                        <h2>{listInfo.activePage} - {listInfo.pages}</h2>
                        {listInfo.activePage === listInfo.pages ?
                            <button className="listPage__nav-btn listPage__nav-btn--next listPage__nav-btn--unactive">
                                Далее
                            </button>
                            :
                            <button
                                onClick={getOtherPage.bind(this, listInfo.activePage + 1)}
                            >Далее</button>
                        }
                    </div>
                </div> 
                :
                <div className="listPage__lsit">
                    <h1>Loading...</h1>
                </div>

                
            }
            
        </div>
    )
}

export default List