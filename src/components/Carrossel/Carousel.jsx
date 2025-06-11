// Caso tenha erro de esse comando npm install styled-components

import React, { useEffect, useState } from "react"
import { CarouselContainer, Indicadores, Inner, Next, Prev } from "./style"

import { useSwipeable } from "react-swipeable"; // de npm install react-swipeable

export const Carousel=({children})=> {

const [activeIndex, setActiveIndex] = useState(0);
const [paused, setPaused] =useState(false);

// Responsividade padrão: https://getbootstrap.com/docs/5.0/layout/breakpoints/
const getDevice = () => ({
    mobile: window.innerWidth <= 768,
    tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
    desktop: window.innerWidth > 1024,
});
const [deviced, setDeviced] = useState(getDevice());

useEffect(() => {
    const onResize = () => setDeviced(getDevice());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
}, []);

const foto = () => {
    if (deviced.mobile) {
        return { width: "30px", height: "30px" };
    } else if (deviced.tablet) {
        return { width: "35px", height: "35px" };
    } else if (deviced.desktop) {
        return { width: "40px", height: "40px" };
    } 
}

const getTransform = () => {
    if (deviced.mobile) {
        return `translateX(-${activeIndex * 14.8}%)`;
    } else if (deviced.tablet) {
        return `translateX(-${activeIndex * 15.5}%)`;
    } else if (deviced.desktop) {
        return `translateX(-${activeIndex * 11}%)`;
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
  onSwipedLeft: () => updateIndex(activeIndex + 1),
  onSwipedRight: () => updateIndex(activeIndex - 1),
  preventDefaultTouchmoveEvent: true, 
  trackTouch: true,
  delta: 10,
})
    return (
  <>
  <CarouselContainer
   {...handlers}
  onMouseEnter={()=> setPaused(true)}
  onMouseLeave={()=> setPaused(false)}
  >
  <Indicadores>
    
          {activeIndex > 0 && (
            <Prev onClick={() => {
                updateIndex(activeIndex - 1);
              }}
            >
            <img src="./src/assets/setaEsquerda.png" alt="seta esquerda"
            style={foto()}
            />
            </Prev>
          )}

          
        <Inner style={{transform:getTransform()}}> 
        {React.Children.map(children,(child)=>{
              const width = deviced.mobile
                ? "100%"
                : deviced.tablet
                ? "50%"
                : deviced.desktop
                ? "33.33%"
                : "100%";
              return React.cloneElement(child, { width });
            })}
        </Inner>
            
        {activeIndex < React.Children.count(children) - 1 && (
            <Next
              onClick={() => {
                updateIndex(activeIndex + 1);
            }}
        >
             <img src="./src/assets/setaDireita.png" alt="seta direita"
              style={foto()}
            />
        </Next>
            )}
    </Indicadores>
  </CarouselContainer>
  </>
      
    )
  }
  
