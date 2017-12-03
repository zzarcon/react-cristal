import * as React from 'react';
import {Component} from 'react';
import Cristal from '../src';
import {ComponentWrapper} from './styled';

export default class App extends Component {
  render() {
    return (
      <Cristal>
        <ComponentWrapper>
          Hector
        </ComponentWrapper>
      </Cristal>
    );
  }
}