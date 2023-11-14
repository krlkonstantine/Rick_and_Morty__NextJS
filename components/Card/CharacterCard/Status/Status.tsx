import React from 'react';
import Image, {StaticImageData} from "next/image";

type PropsType = {
    src: StaticImageData
};

export const Status = (props: PropsType) => {
    const { src} = props
    return (
        <>
            <Image width={24} height={24} src={src} alt={'image showing if character is alive or not'}/>
        </>
    );
}

