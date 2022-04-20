import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CHARACTERS_DATA, SET_EPISODES_DATA } from '../../../redux/actions';
import { getListData } from '../../../redux/creators';
import { IEpisode } from '../../../redux/types/dataTypes';
import { IEpisodesData, IState } from '../../../redux/types/stateTypes';
import EpisodeLink from '../EpisodeLink/EpisodeLink';

const EpisodeList = () => {
  const dispatch = useDispatch();

  const episodesData: IEpisodesData =
    useSelector<IState, IEpisodesData>(state => state.episodesData);
  const episodesInfo = episodesData.info;
  const episodesList = episodesData.results;

  useEffect(() => {
    dispatch(getListData(1, SET_EPISODES_DATA))
  }, [dispatch]);

  const getOtherPage = (page: number) => {
    dispatch(getListData(page, SET_CHARACTERS_DATA));
  }

  return (
    <div>
      {episodesData ? 
        <div>
          {episodesList.map((episode: IEpisode) => {
            return(
              <EpisodeLink episode={episode} key={episode.id}/>
            )
          })}

          {episodesInfo.activePage === 1 ?
            null :
            <button
              onClick={getOtherPage.bind(this, episodesInfo.activePage - 1)}
            >prev</button>
          }
          <h2>{episodesInfo.activePage} - {episodesInfo.pages}</h2>
          {episodesInfo.activePage === episodesInfo.pages ?
            null :
            <button
              onClick={getOtherPage.bind(this, episodesInfo.activePage + 1)}
            >next</button>
          }
        </div>
        :
        <h1>Loading...</h1>
      }
    </div>
  )
  
}

export default EpisodeList