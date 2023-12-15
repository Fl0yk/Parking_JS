// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import Context from '../Context';
import { fetchCars } from '../http/CarAPI';

const FindByBrand = observer(() => {

    //��������� ������������� �� ��������
    const { car } = useContext(Context);
    //������������ ��� ���������� ���������� ����������
    const [brand, setBrand] = useState('');

    let cars;

    fetchCars().then(data =>
        cars = data
    );

    function handleSubmit(event) {
        event.preventDefault();
        console.log(cars);
        console.log();
        if (brand) {
            //���� ����� - �� ������ ������, �� ���� ��������� ����������
            car.setCars(cars.filter(function (value) {
                //��������� ���� � ������
                return value.brand.includes(brand);
            }))
        } else {
            car.setCars(cars);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Input brand:
                    <input type="text" name="brand_input" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </label>
                <br />
                <button className='sbm' type='submit'>
                    Find by brand
                </button>
            </form>
        </>
    );
});

export default FindByBrand;