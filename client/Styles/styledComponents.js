import styled from 'styled-components';
import React from 'react';
import BarChart from './../components/BarChart.jsx'

//TODO: look up how to style root and body with styled components 

export const MainWrapper = styled.main`
  font-family: font-family: 'Noto Sans', sans-serif;
  text-align: center;
  margin: 0.75em;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
  `;
  
  export const Title = styled.h1`
  color: #001230;
  font-family: 'Major Mono Display', monospace;
  `;
  
  export const ChartWrapper = styled.section`
  overflow-x: scroll;
  box-shadow: 9 px 9 px 16 px - 4 px rgba(0, 0, 0, 1);
`;


export const OptionsWrapper = styled.section`
  font-size: 1.2em;
  display: flex;
  flex-wrap: wrap;
  width: 70%;
  margin: 3em auto;
  justify-content: center;
  line-height: 2em;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  max-width: 15em;
  justify-content: space-between;
`;

export const Input = styled.input`
  margin: 0 2em;
  width: 3em;
  font-size: inherit;
`;

export const FooterWrapper = styled.footer`
  font-size: 0.9em;
  margin: 3em 0 1em 0;
`;

