// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../Context';
import { fetchPlaces } from '../http/PlaceAPI';

const PlaceFilter = observer(() => {

    const { place } = useContext(Context);

    const [minValue, setMin] = useState(0);
    const [maxValue, setMax] = useState(9999);

    function handleSubmit(event) {
        event.preventDefault();
        fetchPlaces().then(data => 
            place.setPlaces(data.filter(function (value) {
                return value.price <= maxValue && value.price >= minValue;
            }))
        );
    }

    function reset() {
        fetchPlaces().then(data => place.setPlaces(data));
        setMax(9999);
        setMin(0);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Min:
                    <input type="number" name="min_value" min="0" max='9999' value={ minValue } onChange={(e) => setMin(e.target.value) } />
                </label>
                -
                <label>
                    Max:
                    <input type="number" name="max_value" min='0' max='9999' value={ maxValue } onChange={(e) => setMax(e.target.value)} />
                </label>
                <br />
                <button className='sbm' type='submit'>
                    Filter
                </button>
                <button className='sbm' onClick={ reset }>
                    Reset
                </button>
            </form>
        </>
    );
});

export default PlaceFilter;