import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import Paginat from '../../components/Pagination/Pagination';
import Genres from '../../components/Genres/Genres';
import useGenre from '../../hooks/useGenre';



export default function Movies() {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumberOfPAges] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforUrl = useGenre(selectedGenres);

    const fetchMovies = async () => { 
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforUrl}`)

        setContent(data.results);
        setNumberOfPAges(data.total_pages)
    }

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genreforUrl]);

    return (
        <div>
            <span className='page-title'>Discover Movies</span>
            <Genres
                type="movie"
                genres={genres}
                setGenres={setGenres}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
                />
            <div className='container'>
                {
                    content && content.map((c) =>
                        <Card key={c.id}
                            id={c.id}
                            name={c.name || c.title}
                            poster={c.poster_path}
                            vote={c.vote_average}
                            release={c.first_air_date || c.release_date}
                            media="movie"
                        />
                    )
                }
            </div>
            {numOfPages > 1 && (
                <Paginat setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}
