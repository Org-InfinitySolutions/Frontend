import React, { useEffect, useState } from "react";
import { CarouselContainer, Indicadores, Inner, Next, Prev } from "./style";
import { useSwipeable } from "react-swipeable";

export const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

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

  const getVisibleItems = () => {
    if (deviced.mobile) return 1;
    if (deviced.tablet) return 2;
    return 4; // desktop
  };

const getTransform = () => {
    if (deviced.mobile) {
        return `translateX(-${activeIndex * 17}%)`;
    } else if (deviced.tablet) {
        return `translateX(-${activeIndex * 50}%)`;
    } else if (deviced.desktop) {
        return `translateX(-${activeIndex * 51}%)`;
    } 
}

  const updateIndex = (newIndex) => {
    const visible = getVisibleItems();
    const maxIndex = Math.max(0, React.Children.count(children) - visible);
    if (newIndex < 0) newIndex = 0;
    if (newIndex > maxIndex) newIndex = maxIndex;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [activeIndex, paused, children]); 

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    delta: 10,
  });

  const foto = () => {
    if (deviced.mobile) return { width: "30px", height: "30px" };
    if (deviced.tablet) return { width: "35px", height: "35px" };
    return { width: "40px", height: "40px" };
  };

  return (
    <CarouselContainer
      {...handlers}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Indicadores>
        {activeIndex > 0 && (
          <Prev onClick={() => updateIndex(activeIndex - 1)}>
            <img src="./src/assets/setaEsquerda.png" alt="seta esquerda" style={foto()} />
          </Prev>
        )}
        <Inner style={{ transform: getTransform() }}>
          {React.Children.map(children, (child) => child)}
        </Inner>
        {activeIndex < React.Children.count(children) - getVisibleItems() && (
          <Next onClick={() => updateIndex(activeIndex + 1)}>
            <img src="./src/assets/setaDireita.png" alt="seta direita" style={foto()} />
          </Next>
        )}
      </Indicadores>
    </CarouselContainer>
  );
};
