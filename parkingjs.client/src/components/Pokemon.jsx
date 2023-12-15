import { observer } from "mobx-react-lite"
import axios from "axios";
import { useEffect, useState } from "react";

export const Pokemon = observer(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const [pokName, setPokName] = useState('Pokemon not found');
    const [pokImage, setPokImage] = useState('');

    function getRandomInt(max) {
        return Math.floor(Math.random() * max + 1);
    }

    useEffect(() => {
        axios.get(url + getRandomInt(1000))
            .then(response => {
                // Обработка успешного ответа
                setPokName(response.data['name']);
                setPokImage(response.data['sprites']['front_default']);
            })
            .catch(error => {
                // Обработка ошибки
                console.error('Bad API request:', error.message);
            });
    }, []);
    return (
        <>
            <h2>POKEMOOOON { pokName }</h2>
            <img src={ pokImage } alt="Hmmm..." width="250" height="250" />
        </>
    );
});