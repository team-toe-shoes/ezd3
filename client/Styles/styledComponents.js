import styled from 'styled-components';

export const MainWrapper = styled.main`
  font-family: font-family: 'Noto Sans', sans-serif;
  text-align: center;
  margin: 0.75em;
  width: 100%;
  padding: 0 10%;
  overflow-x: hidden;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  color: #001230;
  font-family: 'Major Mono Display', monospace;
  font-size: 4em;
  margin: 0.5em 0 1.5em 0;
`;

export const ChartWrapper = styled.section`
  overflow-x: auto;
  overflow-y: auto;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OptionsWrapper = styled.section`
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  line-height: 2em;
  margin: 40px 10px 0 18px;
  min-width: 192px;
`;

export const GraphAndOptionsWrapper = styled.section`
  display: grid;
  grid-template-columns: auto 1fr;
  margin: 3em 0;
  height: 400px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: baseline;
  max-width: 15em;
  justify-content: space-between;
  font-family: 'Cantarell', sans-serif;
  font-size: 1em;
  padding: 0.2em;
  cursor: pointer;

  & > * {
    cursor: pointer;
  }

  &:hover {
    background-color: #f4f6f7;
  }
`;

export const Input = styled.input`
  margin: 0 2em;
  width: 3em;
  font-size: inherit;
  text-align: center;
  margin: 0;

  &[name="yTitle"], &[name="xTitle"], &[name="chartTitle"] {
    width: 6em;
  }
`;

export const FooterWrapper = styled.footer`
  font-size: 0.9em;
  margin: 3em 0 1em 0;
`;
