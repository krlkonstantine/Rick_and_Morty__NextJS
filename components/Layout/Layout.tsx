import React, {PropsWithChildren} from 'react';
import {NextPage} from "next";
import {Header} from "../Header/Header";
import styled from "styled-components";

export const Layout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props
    //у нас поулчается есть оберточная комонента, в которую оборачиваем нужные нам компоненты
    //таким образом мы поулчим дивку с хэддером ну и саму компоненту(страницу) - чилдрен
    return (
        <Container>
            <Header/>
            <div>{children}</div>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
`

const Main = styled.div`
  width: 100%;
  padding-bottom: 10px;
  overflow: hidden;
`