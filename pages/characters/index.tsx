import React from 'react';
import {API} from "../../assets/api/api";
import {ResponseType, CharacterType} from "../../assets/api/rick-and-morty-api";
import {Header} from "../../components/Header/Header";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import Home from "../index";

export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters()

    return {
        props: {
            characters
        }
    }
}
//получаем персонажей с апишки, возвращаем их  в объекте пропс
//далее типизируем и отдаем объект компоненту
type PropsType = {
    characters: ResponseType<CharacterType>
}

const Characters = (props: PropsType) => {
    const {characters} = props

    const charactersList = characters.results.map(character =>
        <CharacterCard key={character.id} character={character}/>

    )
    return (
        <PageWrapper>
            {charactersList}
        </PageWrapper>
    );
};
Characters.getLayout = getLayout
export default Characters;