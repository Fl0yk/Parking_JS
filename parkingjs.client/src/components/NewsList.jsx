// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import Context from '../Context';
import { NEWS_ROUTE } from '../utils/consts';
import { fetchNews } from '../http/NewsAPI';


const NewsList = observer(() => {

    const { news } = useContext(Context);

    //������ ������ ��� ����, ����� ������ ��������� ������ 1 ��� ��� ������ ����������
    useEffect(() => {
        fetchNews().then(data => news.setNews(data));
    }, []);

    //����� ����������� ������������� �� ���������
    const history = useHistory();

    return (
        <>
            <div>
                {news.news.map(curNews =>
                    <div key={curNews.id}>
                        <article className="one-news">
                            <h3>{ curNews.title }</h3>
                            <p className="news-text">{ curNews.text }</p>
                            <a onClick={() => history.push(NEWS_ROUTE + '/' + curNews.id)}>Read more...</a>
                        </article>
                    </div>
                )}
            </div>
        </>
    );
});

export default NewsList;