import React, {FC, PropsWithChildren} from 'react';
import {useRouter} from "next/router";

export const LoginNavigate: FC<PropsWithChildren<{}>> = ({children}) => {
    const router = useRouter()

    const isAuth = true //имитация запроса, заглушка
    //const isAuth = useSelector(state => state.auth.isAuth)

    if (!isAuth) router.push('/test')
    return (

        <>{children}</>
    );
};

