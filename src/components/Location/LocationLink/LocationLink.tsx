import React, { FC } from 'react'
import { NavLink } from 'react-router-dom';
import { ILocation } from '../../../redux/types/dataTypes'

export interface ILocationLinkCompProps{
    location: ILocation
}

const LocationLink: FC <ILocationLinkCompProps> = (
    props: ILocationLinkCompProps
) => {
    const location = props.location;

    return (
        <div className="locationLink">
            <NavLink to={`/locations/${location.id}`}>
                <h1>{location.name}</h1>
                <p>type: {location.type}</p>
            </NavLink>
            
        </div>
    )
}

export default LocationLink