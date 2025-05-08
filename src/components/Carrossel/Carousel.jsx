// Caso tenha erro de esse comando npm install styled-components

import React, { useEffect, useState } from "react"
import { CarouselContainer, Indicadores, Inner, Next, Prev } from "./style"

import { useSwipeable } from "react-swipeable"; // de npm install react-swipeable

export const Carousel=({children})=> {

const [activeIndex, setActiveIndex] = useState(0);
const [paused, setPaused] =useState(false);


// Responsividade padrão: https://getbootstrap.com/docs/5.0/layout/breakpoints/
const deviced = {
    mobile: window.innerWidth <= 768,
    tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    desktop: window.innerWidth > 1024,
}

const getTransform = () => {
    if (deviced.mobile) {
        return `translateX(-${activeIndex * 23}%)`;
    } else if (deviced.tablet) {
        return `translateX(-${activeIndex * 20.5}%)`;
    } else {
        return `translateX(-${activeIndex * 15.5}%)`;
    }
}

const updateIndex = (newIndex) =>{
    if(newIndex <0){
    newIndex = 0;
    }
    else if (newIndex>= React.Children.count(children)){
        newIndex = React.Children.count(children) -1;
    }
    setActiveIndex(newIndex)
};

useEffect(()=>{
    const interval = setInterval(()=>{
        if(!paused){
            updateIndex(activeIndex +1);
        }
    }, 6000);
    return()=>{
        if(interval){
            clearInterval(interval)
        }
    }
})

const handlers = useSwipeable({
    onSwipedLeft:()=>updateIndex(activeIndex+1),
    onSwipedRight:()=>updateIndex(activeIndex-1)
})
    return (
  <>
  <CarouselContainer
   {...handlers}
  onMouseEnter={()=> setPaused(true)}
  onMouseLeave={()=> setPaused(false)}
  >
  <Indicadores>
        <Prev onClick={()=>{
            updateIndex(activeIndex -1)
        }}>
            <img src="./src/assets/setaEsquerda.png" alt="seta esquerda"
            style={{ width: "30px", height: "30px" }}
            />
        </Prev>
        <Inner style={{transform:getTransform()}}> 
        {React.Children.map(children,(child, index)=>{
            return React.cloneElement(child, {width:"25%"})
        })}
        </Inner>
        
        <Next onClick={()=>{
            updateIndex(activeIndex +1)
        }}>
             <img src="./src/assets/setaDireita.png" alt="seta direita"
              style={{ width: "30px", height: "30px" }}
            />
        </Next>
    </Indicadores>
  </CarouselContainer>
  </>
      
    )
  }
  
