import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../Config';
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();

export const Carousel = ({ id, media }) => {
    const [casts, setCasts] = useState([]);

    const items = casts.map((c) => (
        <div className='carousel-item'>
            <img src={c.profile_path ? `${img_300}/${c.profile_path}`
                : noPicture} alt={c?.name}
                onDragStart={handleDragStart}
                className='carousel-img' />
            <b className='carousel-text'>{c?.name}</b>
        </div>
    ));

    const responsive = {
        0:{
            items: 3
        },
        512:{
            items: 5
        },
        1024:{
            items: 7
        }
    }

    const fetchCast = async () => {
        const { data } = await axios.get(`
        https://api.themoviedb.org/3/${media}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setCasts(data.cast);
    }

    useEffect(() => {
        fetchCast();
        // eslint-disable-next-line
    }, [])

    return (
        <AliceCarousel
            autoPlay
            disableButtonsControls
            disableDotsControls
            responsive={responsive}
            infinite
            mouseTracking
            items={items} />
    );
}