import React from 'react';
import {API} from "assets/api/api";
import {ResponseType, CharacterType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "components/PageWrapper/PageWrapper";
//import {CharacterCard} from "components/Card/CharacterCard/CharacterCard";
import {getLayout} from "components/Layout/BaseLayout/BaseLayout";
import dynamic from "next/dynamic";

const CharacterCard = dynamic(()=> import('components/Card/CharacterCard/CharacterCard')
    .then(module=> module.CharacterCard))
//в импорт вставляем путь к нужной нам компоненте
//и этот импорт вернет промис, который содержит модуль с нашей комп
//эти танцы с бубном из за именнованного испорта, когда п дефолту такого не надо
export const getStaticProps = async () => {
    const characters = await API.rickAndMorty.getCharacters()

    return {
        props: {
            characters
        },
        //revalidate.ts: 60
        //данные подгружаются заранее, но добавив
        //ревалидейт, через 60 сек мы снова их запросим
        //но ТОЛЬКО в случае перезгрузки страницы позже 60 сек
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