// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import Context from '../Context';
import { CURRENT_PLACE_ROUTE } from '../utils/consts';
import { fetchPlaces } from '../http/PlaceAPI';


const PlaceList = observer(() => {
    const { place } = useContext(Context);
    //ћожем динамически передвигатьс€ по страницам
    const history = useHistory();

    useEffect(() => {
        fetchPlaces().then(data => place.setPlaces(data));
    }, []);

    return (
        <>
            <div className="parking-lot">
                {place.places.map(p => (
                    <div
                        key={p.id}
                        className={`parking-place ${p.isEmpty ? 'empty' : 'occupied'}`}
                        onClick={() => history.push(CURRENT_PLACE_ROUTE + '/' + p.id)}
                    >
                        {p.id}
                        <br />
                        {p.price }$
                    </div>
                ))}
            </div>
        </>
    );
});

export default PlaceList;