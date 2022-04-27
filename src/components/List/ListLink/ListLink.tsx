import { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { ICharacter, ILocation, IEpisode } from '../../../redux/types/dataTypes';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import "./ListLink.scss";

export const characterType = "character";
export const locationType = "location";
export const episodeType = "episode";

export type listLinkElementType = typeof characterType | typeof locationType | typeof episodeType;

interface ListLinkProps{
    element: ICharacter | ILocation | IEpisode;
    type: listLinkElementType;
}

const ListLink: FC<ListLinkProps> = (props: ListLinkProps) => {

    let element = props.element;

    let componentResult: JSX.Element;
    switch(props.type){
        case(characterType): {
            element = element as ICharacter;
            componentResult = (
                <div className="elementLink">
                    <img className="elementLink__image" src={element.image} alt="character looks like this " />
                    <h3 className="elementLink__name">{element.name}</h3>
                    <p>species: <strong>{element.species}</strong></p>

                    <NavLink className="elementLink__link" to={`/characters/${element.id}`}>
                        Подробнее
                        <DoubleArrowRoundedIcon fontSize='large' />
                    </NavLink>
                </div>
            )

            break;
        }
        case(locationType): {
            element = element as ILocation;
            componentResult = (
                <div className="elementLink">
                    <h4 className="elementLink__name">
                        <strong>{element.name}</strong>
                    </h4>
                    <p>type: <strong>{element.type}</strong></p>

                    <NavLink className="elementLink__link" to={`/locations/${element.id}`}>
                        Подробнее
                        <DoubleArrowRoundedIcon fontSize='large' />
                    </NavLink>
                </div>
            )

            break;
        }
        case(episodeType): {
            element = element as IEpisode;
            componentResult = (
                <div className="elementLink">
                    <h4 className="elementLink__name">
                        <strong>{element.name}</strong>
                    </h4>
                    <p>episode: <strong>{element.episode}</strong></p>

                    <NavLink className="elementLink__link" to={`/episodes/${element.id}`}>
                        Подробнее
                        <DoubleArrowRoundedIcon fontSize='large' />
                    </NavLink>
                </div>
            )

            break;
        }
    }

    return componentResult;
}

export default ListLink