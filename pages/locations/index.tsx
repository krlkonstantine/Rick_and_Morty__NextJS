import React from 'react';

import {Header} from "../../components/Header/Header";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";
import {dehydrate, QueryClient, useQuery} from "@tanstack/react-query";
import {ResponseType, LocationType} from "../../assets/api/rick-and-morty-api";
import {API} from "../../assets/api/api";

const getLocations = () => {
    return fetch('https://rickandmortyapi.com/api/location',
        {method: 'GET'}).then(res => res.json())
}

export const getStaticProps = async () => {
    const queryClient = new QueryClient()

    await queryClient.fetchQuery(['locations'], getLocations)


    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const Locations = () => {
    const {data: locations} = useQuery<ResponseType<LocationType>>(['locations'], getLocations)

    if (!locations) return null

    const locationsList = locations.results.map(location =>
        <div key={location.id}>
            {location.name}
        </div>
    )
    return (
        <PageWrapper>
            <Header/>
            {locationsList}
        </PageWrapper>
    );
};

export default Locations;