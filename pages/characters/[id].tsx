import React from 'react';
import {API} from "../../assets/api/api";
import { CharacterType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {GetStaticProps} from "next";


export const getStaticProps: GetStaticProps<PropsType> = async ({params}) => {
    //типизируем фнк (: GetStaticProps) чтобы у нас протипизировался обж
    //приходщий в виде параметров. По факту прих.контекст, обычно пишется ctx
    //в нем есть айдишка, которая есть и в адресной строке где открылся character
    //тут мы для удобства сразу деструктурируем, дост. св-во params
    const {id} = params || {}
    //деструктурируем сразу с проверкой, есть айди ок, нету просто возм из {}


    const character = await API.rickAndMorty.getCharacter(id as string)
    //как строка айдишку передаем, чтобы не ругался

    if (!character) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            character
        }
    }
}

type PropsType = {
    character: CharacterType
}

const Character = (props: PropsType) => {
    const {character} = props


    return (
        <PageWrapper>
            <CharacterCard key={character.id} character={character}/>
        </PageWrapper>
    );
};
Character.getLayout = getLayout
export default Character;