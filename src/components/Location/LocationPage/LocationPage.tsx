import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { IState } from '../../../redux/types/stateTypes';
import { ILocation, ICharacter } from '../../../redux/types/dataTypes';
import { getActiveData } from '../../../redux/creators';
import { SET_ACTIVE_LOCATION } from '../../../redux/actions';

const LocationPage = () => {
  const dispatch = useDispatch();
  let { location_id } = useParams();
  const id = Number(location_id); //заметка: поймать ошибку при некоректном location_id

  const location = useSelector<IState, (ILocation | null)>
    (state => state.activeLocation);
  
  useEffect( () => {
    dispatch(getActiveData(id, SET_ACTIVE_LOCATION));
  }, [dispatch, id]);

  return (
    <div className="location">
      {
        location ? (
          <div>
            <h1>{location.name}</h1>
            <p>type: {location.type}</p>
            <p>{location.dimension}</p>

            <div className="location__residents">
              {
                location.residents.map( (character: ICharacter | string) => {
                  if(typeof character === "object"){
                    return(
                      <div className="episode__charactersList-character" key={character.id}>
                        <NavLink to={`../characters/${character.id}`}>
                          <h3>{character.name}</h3>
                          <img src={character.image} alt="character shows like this"></img>
                        </NavLink>
                      </div>
                    )
                  }
                  return <div>{character}</div>
                } )
              }
            </div>
          </div>
        )
        :
        <h1>Loading...</h1>


      }
    </div>
  )
}

export default LocationPage