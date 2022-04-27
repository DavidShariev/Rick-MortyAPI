import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { SET_ACTIVE_CHARACTER, SET_ACTIVE_EPISODE, SET_ACTIVE_LOCATION } from '../../redux/actions';
import { getActiveData } from '../../redux/creators';
import { setActiveTypes } from '../../redux/types/actionTypes';
import { ICharacter, IEpisode, ILocation } from '../../redux/types/dataTypes';
import { IState } from '../../redux/types/stateTypes';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import "./ElementPage.scss";

export const activeElementCharacter = "character";
export const activeElementEpisode = "episode";
export const activeElementLocation = "location";

export const elementTypeCharacter = "character";
export const elementTypeLocation = "location";
export const elementTypeEpisode = "episode";

export type elementPageType = 
    typeof elementTypeCharacter |
    typeof elementTypeLocation |
    typeof elementTypeEpisode;

interface IElementPageProps{
    type: elementPageType
}

const ElementPage: FC<IElementPageProps> = (
    props: IElementPageProps
) => {
    const dispatch = useDispatch();
    let { id } = useParams();

    const id_number: number = Number(id);
    let setActiveTypes: setActiveTypes;
    switch(props.type){
        case elementTypeCharacter: {
            setActiveTypes = SET_ACTIVE_CHARACTER;
            break;
        }
        case elementTypeLocation: {
            setActiveTypes = SET_ACTIVE_LOCATION;
            break;
        }
        case elementTypeEpisode: {
            setActiveTypes = SET_ACTIVE_EPISODE;
            break;
        }
    }
    useEffect(() => {
        dispatch(getActiveData(id_number, setActiveTypes));
    }, [dispatch, id_number, setActiveTypes])

    let element: ICharacter | ILocation | IEpisode | null = null;
    element = useSelector<IState, (ICharacter | ILocation | IEpisode | null)>
        ( state => {
            switch(props.type){
                case elementTypeCharacter: return state.activeCharacter;
                case elementTypeEpisode: return state.activeEpisode;
                case elementTypeLocation: return state.activeLocation;
            }
        })
    
    let title: string;
    let elementData: JSX.Element = <div></div>;
    let elementList: JSX.Element = <div></div>;
    switch(props.type){
        case(elementTypeCharacter): {
            title = "Character";
            element = element as ICharacter;

            let origin_location_id=10;
            if(element){
                origin_location_id = 
                    Number(
                        element.origin.url.replace(/[^\d]/g, '')
                    ); //id места рождения
            }
            if(element){
                elementData = (
                <div className="elementPage__data">
                    <img className="elementPage__data-image" src={element.image} alt="" />
                    <div className="elementPage__data-info">
                        <h2>{element.name}</h2>
                        <p><strong>status:</strong> {element.status}</p>
                        <p><strong>species:</strong> {element.species}</p>
                        <p><strong>type:</strong> {element.type}</p>
                        <p><strong>gender:</strong> {element.gender}</p>
                        <NavLink to={"../locations/"+origin_location_id}>
                            <p><strong>origin:</strong> {element.origin.name}</p>
                        </NavLink>
                        
                    </div>
                </div>)
                elementList = (
                <div className="elementPage__list">
                    <h2 className="elementPage__list-title">Episode</h2>
                    {
                        element.episode.map((episode: IEpisode | string) => {
                            if (typeof episode === "object") {
                                return (
                                    <div className="elementPage__list-episode" key={episode.id}>
                                        <NavLink to={`../episodes/${episode.id}`}>
                                            <h4>{episode.name}</h4>
                                        </NavLink>
                                        <span>episode: {episode.episode}</span>
                                    </div>
                                )
                            }
                            return <div>{episode}</div>
                        })
                    }
                </div>
                )
            }
            
            break;
        }
        case(elementTypeLocation): {
            title = "Location";
            element = element as ILocation;
            if (element) {
                elementData = (
                    <div className="elementPage__data">
                        <div className="elementPage__data-info">
                            <h2>{element.name}</h2>
                            <p>type: {element.type}</p>
                            <p>{element.dimension}</p>
                        </div>
                    </div>)
                elementList = (
                    <div className="elementPage__list">
                        <h3 className="elementPage__list-title">Residents</h3>
                        {
                            element.residents.map((character: ICharacter | string) => {
                                if (typeof character === "object") {
                                    return (
                                        <div className="elementPage__list-character" key={character.id}>
                                            <NavLink to={`../characters/${character.id}`}>
                                                <h4>{character.name}</h4>
                                                <img src={character.image} alt="character shows like this"></img>
                                            </NavLink>
                                        </div>
                                    )
                                }
                                return <div>{character}</div>
                            })
                        }
                    </div>
                )
            }

            break;
        }
        case(elementTypeEpisode): {
            title = "Episode";
            element = element as IEpisode;
            if (element) {
                elementData = (
                    <div className="elementPage__data">
                        <div className="elementPage__data-info">
                            <h2>{element.name}</h2>
                            <p>episode: {element.episode}</p>
                            <p>data: {element.air_date}</p>
                        </div>
                    </div>)
                elementList = (
                    <div className="elementPage__list">
                        <h3 className="elementPage__list-title">Episode</h3>
                        {
                            element.characters.map((character: ICharacter | string) => {
                                if (typeof character === "object") {
                                    return (
                                        <div className="elementPage__list-character" key={character.id}>
                                            <NavLink to={`../characters/${character.id}`}>
                                                <h4>{character.name}</h4>
                                                <img src={character.image} alt="character shows like this"></img>
                                            </NavLink>
                                        </div>
                                    )
                                }
                                return <div>{character}</div>
                            })
                        }
                    </div>
                )
            }

            break;
        }
    }

    return (
        <div className="elementPage">
            <h1 className="elementPage__title">
                {title}
                <NavLink className="elementPage__title-out" to="../">
                    Назад
                    <ArrowCircleLeftOutlinedIcon style={{ marginLeft: "20px" }} fontSize="large" />
                </NavLink>
            </h1>

            {element ? 
                (<div className="elementPage__wrapper">
                    {elementData}
                    {elementList}
                </div>) 
                : 
                <h1>Loading...</h1>
            }
        </div>
    )
}

export default ElementPage;