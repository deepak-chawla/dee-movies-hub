import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import Paginat from '../../components/Pagination/Pagination';

export default function Trending() {

    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);

    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        setContent(data.results);
        
    }

    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [page]);


    return (
        <div>
            <span className='page-title'>Today Trending</span>
            <div className='container'>
                {
                    content && content.map((c) =>
                        <Card key={c.id}
                        id={c.id}
                        name={c.name || c.title}
                        poster={c.poster_path}
                        vote={c.vote_average}
                        release={c.first_air_date || c.release_date}
                        media={c.media_type}
                        />
                    )
                }
            </div>
            <Paginat setPage={setPage}/>
        </div>
    )
}
