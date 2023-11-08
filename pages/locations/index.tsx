import React from 'react';
import {API} from "../../assets/api/api";
import {ResponseType, LocationType} from "../../assets/api/rick-and-morty-api";
import {Header} from "../../components/Header/Header";
import {PageWrapper} from "../../components/PageWrapper/PageWrapper";

export const getStaticProps = async () => {
    const locations = await API.rickAndMorty.getLocations()

    return {
        props: {
            locations
        }
    }
}
type PropsType = {
    locations: ResponseType<LocationType>
}

const Locations = (props: PropsType) => {
    const {locations} = props

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