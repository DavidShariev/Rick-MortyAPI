import React, {FC} from 'react'
import { NavLink } from 'react-router-dom'
import { IEpisode } from '../../../redux/types/dataTypes'

export interface IEpisodeCompProps {
    episode: IEpisode
}

const EpisodeLink: FC <IEpisodeCompProps> = (
    props: IEpisodeCompProps
) => {
    const episode = props.episode;

    return (
        <div className="episodeLink">
            <NavLink to={`/episodes/${episode.id}`}>
                <h1 className="episodeLink__name">{episode.name}</h1>
                <p>episode: {episode.episode}</p>
                <p>date: {episode.air_date}</p>
            </NavLink>
        </div>
    )
}

export default EpisodeLink