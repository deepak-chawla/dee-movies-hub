import { Chip } from '@material-ui/core';
import axios from 'axios'
import React, { useEffect } from 'react'

export default function Genres({
    type,
    genres,
    setPage,
    setGenres,
    selectedGenres,
    setSelectedGenres,
}) {

    const fetchGenres = async () => {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        
        setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();

        return () =>{
            setGenres({});
        }
        // eslint-disable-next-line
    },[]);

    const handleAddGenres = (genre)=>{
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g)=> g.id !== genre.id));
        setPage(1);
    }

    const handleRemoveGenres = (genre)=>{
        setSelectedGenres(selectedGenres.filter((g)=> g.id !== genre.id));
        setGenres([...genres, genre]);
        
        setPage(1);
    }

    return (
        <div style={{padding: "6px 0"}}>
            {
             selectedGenres && selectedGenres.map((genre) => 
             <Chip key={genre.id} 
             size={'small'} 
             label={genre.name} 
             style={{margin: 2}} 
             color='primary'
             clickable
             onDelete={()=>handleRemoveGenres(genre)}
             />)
            }
            {
             genres && genres.map((genre) => 
             <Chip key={genre.id} 
             size={'small'} 
             label={genre.name} 
             style={{margin: 2}} 
             clickable
             onClick={()=>handleAddGenres(genre)}
             />)
            }
        </div>
    )
}
