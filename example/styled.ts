import styled, {injectGlobal} from 'styled-components';

injectGlobal`
  body {
    font-family: system-ui;
    font-weight: 500;
    background: linear-gradient(165deg,#f5abae,#fce3e9);
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
  }
`;

export const ComponentWrapper = styled.div`

`;

export const CristalCreatorWrapper = styled.div`
  
`;

export const CritalOptions = styled.div`
  display: flex;  
  margin-bottom: 15px;

  > div {
    margin: 0 5px;
  }
`

export const CristalToggleOptions = styled.div`
  display: flex;
  margin-bottom: 15px;
`;