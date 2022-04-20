import React, { FC } from 'react'
import { ICharacter } from '../../../redux/types/dataTypes';
import { NavLink } from 'react-router-dom';

export interface ICharacterCompProps {
    character: ICharacter
}

const CharacterLink: FC<ICharacterCompProps> = (
    props: ICharacterCompProps
) => {
    const character = props.character;

    return (
        <div className="characterLink">
            <NavLink to={`/characters/${character.id}`}>
                <h1 className="characterLink__name">{character.name}</h1>
            </NavLink>

            <p>status: {character.status}</p>
            <p>species: {character.species}</p>
            <img src={character.image} alt="character shows like this"></img>
        </div>
    )
}

export default CharacterLink