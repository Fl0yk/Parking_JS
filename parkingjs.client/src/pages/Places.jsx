// eslint-disable-next-line no-unused-vars
import React from 'react';
import PlaceFilter from '../components/PlaceFilter';
import PlaceList from '../components/PlaceList';
import { RandomJoke } from '../components/RandomJoke';

const Places = () => {
    return (
        <>
            <h2>Places</h2>
            <PlaceFilter />
            <PlaceList />
            <RandomJoke/>
        </>
    );
};

export default Places;