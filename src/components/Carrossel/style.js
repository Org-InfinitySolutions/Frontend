// Caso tenha erro de esse comando npm install styled-components
import styled from "styled-components";

// ocultando o que está fora da viewport
export const CarouselContainer = styled.div`
  overflow: hidden;
  position: relative;
`;

//nowrap para não quebrar linha dos items,
// o transision faz a animação para o item ativo de 0.3s
export const Inner = styled.div`
    white-space:nowrap;
    transition:transform 0.3s;
    margin-left: 40px;
    margin-right: 40px;

  @media (max-width: 768px) {
    margin-left: 30px;
    margin-right: 30px;
    }

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-left: 20px;
    margin-right: 20px%;
    }
`;

export const DivCarouselItem = styled.button`
display:inline-flex;
align-items: center;
justify-content:center;
height: 98%;
width: 18%;
border: none;
background-color: #000000;
color: #ffffff;
margin: 30px;

    p {
    white-space: normal;
    }

  @media (max-width: 768px) {
    width: 10%;
    margin: 50px;
    height: 95%;
    }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 15%;
    margin: 2.25%;
    height: 95%;
    }

  @media (min-width: 1024px) {
    width: 15%;
    margin: 1%;
    height: 95%;
    }
`;


export const Indicadores = styled.div`
display: inline-flex;
  padding: 14px 0px;
`;

export const Prev = styled.button`
  position: absolute;
  z-index: 4;
  left: 30px;
  align-self: center;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 2.5em;
&:hover {
    transform: scale(1.2);
    transition: all 0.3s ease;
  };
  
`;

export const Next = styled.button`
  display:flex;
  position: absolute;
  z-index: 4;
  right: 30px;
  align-self: center;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 2.5em;
&:hover {
    transform: scale(1.2);
    transition: all 0.3s ease;
  };
`;

