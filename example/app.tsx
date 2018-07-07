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
    initialPosition: selectedItem
  }

  onPositionChange = (e: any) => {
    this.setState({
      initialPosition: e.item
    });
  }

  onClose = () => {
    console.log('onClose')
  }

  render() {
    const {initialPosition, title} = this.state;

    return (
      <div>
        <Cristal 
          title={title}
          initialPosition={initialPosition.value}
          onClose={this.onClose}
        >
          <ComponentWrapper>
            Hector
          </ComponentWrapper>
        </Cristal>
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