// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { fetchPlaceById, reservePlace } from "../http/PlaceAPI";
import Context from '../Context';

const CurPlace = observer(() => {
    const { user } = useContext(Context);
    const [curPlace, setPlace] = useState({});
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const curPlaceData = await fetchPlaceById(id);
            setPlace(curPlaceData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {

        fetchData();
        
    }, []);

    function reserve() {
        reservePlace(curPlace.id);
        fetchData();
    }

    return (
        <>
            <h3>Current place</h3>
            <p>Number: {curPlace.id}</p>
            <p>Prie: {curPlace.price}</p>
            <p>Is empty: {curPlace.isEmpty ? 'Yes' : 'No'}</p>
            {user.isAuth &&
                <button className={'sbm'} onClick={reserve}>
                    Reserve place
                </button>
            }
        </>
    );
});

export default CurPlace;