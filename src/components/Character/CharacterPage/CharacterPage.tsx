import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { SET_ACTIVE_CHARACTER } from "../../../redux/actions";
import { getActiveData } from "../../../redux/creators";
import { ICharacter, IEpisode } from "../../../redux/types/dataTypes";
import { IState } from "../../../redux/types/stateTypes";

const Character = () => {
  const dispatch = useDispatch();
  let { character_id } = useParams();
  const id = Number(character_id);

  const loading = useSelector<IState, boolean>( state => state.loading );
  const character = useSelector<IState, (ICharacter | null)>
    (state => state.activeCharacter);

  useEffect(() => {
    dispatch(getActiveData(id, SET_ACTIVE_CHARACTER));
  }, [dispatch, id])

  return (
    <div className="character">
      {(character && !loading) ? (
        <div >
          <img src={character.image} alt="character shows like this"></img>
          <div>
            <h1>{character.name}</h1>
            <p>status: {character.status}</p>
            <p>species: {character.species}</p>
            <p>type: {character.type}</p>
            <p>gender: {character.gender}</p>
            <p>origin: {character.origin.name}</p>
            <p>location: {character.location.name}</p>
            <p>created: {new Date(character.created).toUTCString()}</p>

            <div className="character__episodeList">
              <h2>Episode:</h2>
              {
                character.episode.map((episode: IEpisode | string) => {
                  if (typeof episode === "object") {
                    return (
                      <div className="character__episodeList-episode" key={episode.id}>
                        <NavLink to={`../episodes/${episode.id}`}>
                          <h3>{episode.name}</h3>
                        </NavLink>  
                        <span>episode: {episode.episode}</span>
                      </div>
                    )
                  }
                  return <div>{episode}</div>
                })
              }
            </div>
          </div>
        </div>
      ) : <h1>Loading...</h1>}
    </div>
  )
}

export default Character;