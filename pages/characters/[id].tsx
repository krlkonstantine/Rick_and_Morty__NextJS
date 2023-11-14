import React from 'react';
import {API} from "../../assets/api/api";
import {CharacterType} from "../../assets/api/rick-and-morty-api";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {CharacterCard} from "../../components/Card/CharacterCard/CharacterCard";
import {getLayout} from "../../components/Layout/BaseLayout/BaseLayout";
import {GetStaticPaths, GetStaticProps} from "next";
import {useRouter} from "next/router";
import styled from "styled-components";

export const getStaticPaths: GetStaticPaths = async () => {
    //тоже асинк фнк, вызывается на сервере и используется
    // для вызывания нескольких статических страниц сразу
    //если мы знаем что 20 персонажей и хоти сгенерить
    //заранее странички для лучшего пользов.опыта, чтобы
    //наши стр быстрее отдавались и кешировались
    //работает в связке с гетСтатикПропс, генерирует пути
    //для предзапроса даннах, а гСтатПропс генерит саму страничку
    //должен возвращать массив путей
    const {results} = await API.rickAndMorty.getCharacters()

    const paths = results.map(character => (
        {params: {id: String(character.id)}}
    ))
    //должен возвращать массив объектов парамс у каждого из которых обж айди

    return {
        paths,
        fallback: true
        //у нас апишка достает только 20 пользователей (перв стр)
        //и по дефолту заранаее кешируются только 20 страниц
        //но если вдруг мы запаршиваем 31-ую стр, он сгенерит и ее
    }
    //что поулчаем в итоге: мы сгенерили characters, присволи их result
    //далее мы мапим каждого перса, и для каждого создаем объект params,
    //содержащий в др.объекте его айди. Все эти объекты
    //запаковываем в массив и каждый оъект по сути это путь
    //по которому будем запрашивать конкретнго перса заранее
}
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
    const router = useRouter()

    if (router.isFallback) return <h1>Loading...</h1>

    const {character} = props

    const characterId = router.query.id

    const goToCharacters = () => router.push('/characters')
        //метод пуш объекта роутер аналог navigate от useNavigate
        //TODO можно добавить функционал достать рандомного перса

    return (
        <PageWrapper>
            <CharacterContainer>
                <IdText>Id: {characterId}</IdText>
                <CharacterCard key={character.id} character={character}/>
                <Button onClick={goToCharacters}>Back to characters</Button>
            </CharacterContainer>

        </PageWrapper>
    );
};
Character.getLayout = getLayout
export default Character;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  &:hover {
  }
`
const Button = styled.button`

  border-radius: 8px;
  background-color: darkgray;
  width: 340px;
  height: 60px;
  font-size: 30px;
  color: white;
  border: none;
  transition: 0.3s all;

  &:hover {
    background-color: #fa52d3;
    border: 1px solid darkgray;
  }
`

const IdText = styled.div`
font-size: 38px;
`