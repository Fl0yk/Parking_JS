// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { fetchNewsById } from "../http/NewsAPI";

const CurNews = observer(() => {
    const [curNews, setNews] = useState({});
    const { id } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const curPlaceData = await fetchNewsById(id);
                setNews(curPlaceData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [id]);

    return (
        <>
            <div className={"news-container"}>
                <article>
                    <h2>{ curNews.title }</h2>
                    <p className={"news"}>{ curNews.text }</p>
                </article>
            </div>
        </>
    );
});

export default CurNews;