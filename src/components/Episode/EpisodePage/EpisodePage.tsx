import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { IState } from '../../../redux/types/stateTypes';
import { ICharacter, IEpisode } from '../../../redux/types/dataTypes';
import { getActiveData } from '../../../redux/creators';
import { SET_ACTIVE_EPISODE } from '../../../redux/actions';

const EpisodePage = () => {
  const dispatch = useDispatch();
  let { episode_id } = useParams(); 
  const id = Number(episode_id); //заметка: поимать ошибку при некоректном episode_id

  const episode = useSelector<IState, (IEpisode | null)>
    (state => state.activeEpisode);
  
  useEffect(() => {
    dispatch(getActiveData(id, SET_ACTIVE_EPISODE));
  }, [dispatch, id]);

  return (
    <div className="episode">
      {episode ? (
        <div>
          <h1>{episode.name}</h1>
          <p>episode: {episode.episode}</p>
          <p>data: {episode.air_date}</p>

          <div className="episode__charactersList">
            <h2>characters: </h2>
            {
              episode.characters.map( (character: ICharacter | string) => {
                if(typeof character === "object"){
                  return (
                    <div className="episode__charactersList-character" key={character.id}>
                      <NavLink to={`../characters/${character.id}`}>
                        <h3>{character.name}</h3>
                        <img src={character.image} alt="character shows like this"></img>
                      </NavLink>
                    </div>
                  )
                }
                return <div>{character}</div>
              })
            }
          </div>
        </div>
      )
      :
      <h1>Loading...</h1>}
    </div>
  )
}

export default EpisodePage