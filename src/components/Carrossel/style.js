import styled from "styled-components";

export const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  padding: 0 30px;
`;

export const Inner = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  transition: transform 0.3s;
  will-change: transform;

  @media (max-width: 768px) {
    gap: 30px;
  }
`;

export const DivCarouselItem = styled.button`
  flex: 0 0 calc(25% - 22.5px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 98%;
  border: none;
  background-color: #000000;
  color: #ffffff;

  p {
    white-space: normal;
  }

  @media (max-width: 1024px) {
    flex: 0 0 calc(50% - 15px);
  }

  @media (max-width: 768px) {
    flex: 0 0 calc(15% - 7.5px);
  }
`;

export const Indicadores = styled.div`
  display: flex;
  padding: 14px 0px;
  position: relative;
  align-items: center;
`;

export const Prev = styled.button`
  position: absolute;
  z-index: 4;
  align-self: center;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 2.5em;
  &:hover {
    transform: scale(1.2);
    transition: all 0.3s ease;
  }
`;

export const Next = styled.button`
  position: absolute;
  z-index: 4;
  right: 0%;
  align-self: center;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 2.5em;
  &:hover {
    transform: scale(1.2);
    transition: all 0.3s ease;
  }
`;