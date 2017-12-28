import * as React from 'react';
import {Component} from 'react';
import Cristal, {CristalHeader, CristalContent} from '../src';
import {ComponentWrapper} from './styled';

const customCristal = (
  <Cristal>
    <CristalHeader />
    <CristalContent>
      <ComponentWrapper>
        Hector
      </ComponentWrapper>
    </CristalContent>
  </Cristal>
);

// const defaultCristal = (
//   <Cristal>
//     <ComponentWrapper>
//       Hector
//     </ComponentWrapper>
//   </Cristal>
// );

export default class App extends Component {
  render() {
    return (
      <div>
        {customCristal}
        
      </div>
    );
  }
}