import React from 'react';
import { DivCarouselItem } from './style';

// Caso tenha erro de esse comando npm install styled-components

export const CarouselItem=({children, width})=> {
    return (
    <>
    <DivCarouselItem style={{width:width}}>
    {children}
    </DivCarouselItem>
    </>
    )
}

export default CarouselItem