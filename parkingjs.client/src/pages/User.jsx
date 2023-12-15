// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../Context';
import CarForm from '../components/CarCRUD';
import { fetchCars, deleteCar } from '../http/CarAPI';
import { Pokemon } from '../components/Pokemon';
import FindByBrand from '../components/FindByModel';

const User = observer(() => {
    const { user, car } = useContext(Context);
    //console.log(user);

    const [isCreate, setState] = useState(true);
    const [selectedCar, setSelctedCar] = useState({});
    useEffect(() => fetchAllCars(), []);

    const fetchAllCars = () => {
        fetchCars().then((data) => car.setCars(data));
    };

    const selectCar = (num) => {
        setState(false);
        setSelctedCar(car.cars.find((elem) => { return elem.number == num; }));
        console.log(selectedCar);
    };

    const deleteCarEv = (num) => {
        deleteCar(num).then(() => fetchAllCars());
    }
    const a = new Date();
    return (
        <>
            <h3>User menu</h3>
            <p>Name: {user.user.name}</p>
            <p>email: {user.user.email}</p>
            <br />
            <Pokemon/>
            <br />
            <h3>User Cars:</h3>
            <FindByBrand/>
            <ul>
            {car.cars.map(p => (
                <li key={p.number}>
                <hr/>
                    Number: {p.number}; Model: {p.model}; Brand: {p.brand} |
                    <a onClick={ () => selectCar(p.number) }>Update</a> |
                    <a onClick={() => deleteCarEv(p.number)}>Delete</a>
                    { console.log(typeof(p.updatedAt)) }
                    <p>Last update: local - {(new Date(p.updatedAt)).toLocaleString()} | UTC - { (new Date(p.updatedAt)).toUTCString() }</p>
                    <br />
                    <hr/>
                </li>
            ))}
            </ul>
            {!isCreate && 
                <a onClick={() => setState(true) }>Reset selected car</a>    
            }
            {isCreate ?
                <>
                    {console.log('create ')}
                    <CarForm updateList={() => fetchAllCars() } />
                </> :
                <>
                    {console.log('update ' + selectedCar.number) }
                    <CarForm isCreate={isCreate} number={selectedCar.number} model={selectedCar.model} brand={selectedCar.brand} />
                </>
            }
        </>
    );
});

export default User;