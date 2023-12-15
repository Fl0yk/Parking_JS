import { observer } from "mobx-react-lite"
import axios from "axios";
import { useEffect, useState } from "react";

export const RandomJoke = observer(() => {
    const url = 'https://official-joke-api.appspot.com/random_joke';
    const [setup, setSetup] = useState('Bad setup');
    const [punch, setPunch] = useState('Bad punch');
    useEffect(() => {
        axios.get(url)
            .then(response => {
                // Обработка успешного ответа
                setSetup(response.data['setup']);
                setPunch(response.data['punchline']);
            })
            .catch(error => {
                // Обработка ошибки
                console.error('Bad API request:', error.message);
            });
    }, []);
    return (
        <>
            <h2>Random joke</h2>
            <p>{setup}</p>
            <p>Punchline: {punch}</p>
        </>
    );
});