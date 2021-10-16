import { Badge } from '@material-ui/core'
import React from 'react'
import { img_300, unavailable } from '../../Config'
import ItemModal from '../Modal/ItemModal'
import './Card.css'
export default function Card({
    id,
    name,
    poster,
    vote,
    release,
    media
}) {
    return (
        <ItemModal id={id} media={media}>
            <Badge badgeContent={vote} color={vote>6 ? 'primary': 'secondary'}/>
            <img className='poster' alt={name} src={poster? `${img_300}${poster}`: unavailable}/>
            <b className='title'>{name}</b>
            <span className='subtitle'>{media === 'tv'? "Tv Series": "Movie"}
            <span className='subtitle'>{release}</span>
            </span>
        </ItemModal>
    )
}
