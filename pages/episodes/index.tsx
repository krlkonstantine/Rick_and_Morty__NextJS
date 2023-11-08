import React from 'react';
import {API} from "../../assets/api/api";
import {ResponseType, CharacterType, EpisodeType} from "../../assets/api/rick-and-morty-api";
import {Header} from "../../components/Header/Header";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";

export const getStaticProps = async () => {
    const episodes = await API.rickAndMorty.getEpisodes()

    return {
        props: {
            episodes
        }
    }
}
//получаем персонажей с апишки, возвращаем их  в объекте пропс
//далее типизируем и отдаем объект компоненту
type PropsType = {
    episodes: ResponseType<EpisodeType>
}

const Episodes = (props: PropsType) => {
    const {episodes} = props

    const episodeList = episodes.results.map(episode =>
        <div key={episode.id}>
            {episode.name}
        </div>
    )
    return (
        <PageWrapper>
            <Header/>
            {episodeList}
        </PageWrapper>
    );
};

export default Episodes;