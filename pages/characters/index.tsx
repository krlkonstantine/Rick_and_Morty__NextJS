import React from 'react';
import {API} from "../../assets/api/api";
import {ResponseType, CharacterType} from "../../assets/api/rick-and-morty-api";

const getStaticProps = async ()=>{
        const characters = await API.rickAndMorty.getCharacters()

    return  {
        props:{
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
    return (
        <>
            Characters
        </>
    );
};

export default Characters;