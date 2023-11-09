import React, {PropsWithChildren, ReactElement} from 'react';
import {NextPage} from "next";
import {Layout} from "../Layout";
//здась будет базовый дл всего приложения лэйаут
//если нам надо будет создать новый лэйаут, рядом создадим другую папку
export const BaseLayout: NextPage<PropsWithChildren> = (props) => {
    const {children} = props


    return (
        <Layout>{children} </Layout>
    );
};

export const getLayout = (page: ReactElement) => {
    return <BaseLayout>{page}</BaseLayout>
}