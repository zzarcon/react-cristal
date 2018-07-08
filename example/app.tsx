import * as React from 'react';
import {Component} from 'react';
import Select from '@atlaskit/single-select';
import Cristal, { InitialPosition } from '../src';
import {ComponentWrapper} from './styled';

export interface AppProps {

} 

export interface AppState {
  initialPosition: {value: InitialPosition};
  title: string;
  isResizable: boolean;
  isVisible: boolean;
}

const positionItems = [
  {
    items: [
      { value: 'top-left', content: 'Top left' },
      { value: 'top-right', content: 'Top right' },
      { value: 'bottom-left', content: 'Bottom left' },
      { value: 'bottom-right', content: 'Bottom right' }
    ]
  }
];
const selectedItem: any = positionItems[0].items[2];

export default class App extends Component<AppProps, AppState> {
  state: AppState = {
    title: 'Cristal author',
    initialPosition: selectedItem,
    isResizable: false,
    isVisible: true
  }

  onPositionChange = (e: any) => {
    this.setState({
      initialPosition: e.item
    });
  }

  onClose = () => {
    this.setState({isVisible: false});
  }

  renderCristal = () => {
    const {isVisible, initialPosition, title, isResizable} = this.state;
    if (!isVisible) return;

    return (
      <Cristal
        title={title}
        initialPosition={initialPosition.value}
        onClose={this.onClose}
        isResizable={isResizable}
      >
        <ComponentWrapper>
          Hector
        </ComponentWrapper>
      </Cristal>
    );
  }

  render() {
    return (
      <div>
        {this.renderCristal()}
        <Select
          label="Position"
          items={positionItems}
          defaultSelected={selectedItem}
          onSelected={this.onPositionChange}
          droplistShouldFitContainer={true}
        />
      </div>
    );
  }
}