import * as React from 'react';
import {Component} from 'react';
import Select from '@atlaskit/single-select';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import Cristal, { InitialPosition, CristalProps } from '../src';
import {ComponentWrapper, CristalCreatorWrapper} from './styled';

export interface AppProps {

} 

export interface AppState {
  initialPosition: {value: InitialPosition};
  title: string;
  isResizable: boolean;
  isVisible: boolean;
  cristals: CristalProps[];
  children: string;
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
const selectedItem: any = positionItems[0].items[1];
const defaultTitle = 'Cristal author';
const defaultChildren = 'Hector';

export default class App extends Component<AppProps, AppState> {
  state: AppState = {
    title: defaultTitle,
    initialPosition: selectedItem,
    isResizable: false,
    isVisible: true,
    children: defaultChildren,
    cristals: [{
      children: defaultChildren,
      title: defaultTitle,
      initialPosition: 'bottom-left'
    }]
  }

  onPositionChange = (e: any) => {
    this.setState({
      initialPosition: e.item
    });
  }

  removeCristal = (index: number) => () => {
    const {cristals} = this.state;

    cristals.splice(index, 1);

    this.setState({
      cristals
    });
  }

  renderCristals = () => {
    const {cristals} = this.state;
    if (!cristals.length) return;

    const content = cristals.map((cristal, index) => {
      const {title, initialPosition, isResizable, children} = cristal;
      return (
        <Cristal
          key={index}
          title={title}
          initialPosition={initialPosition}
          onClose={this.removeCristal(index)}
          isResizable={isResizable}
        >
          <ComponentWrapper>
            {children}
          </ComponentWrapper>          
        </Cristal>  
      )
    });

    return content;
  }

  createNewCristal = () => {
    const {cristals, title, children, initialPosition} = this.state;

    cristals.push({
      children,
      title,
      initialPosition: initialPosition.value
    });

    this.setState({cristals});
  }

  onTitleChange = (e: any) => {
    const title = e.target.value;
    
    this.setState({title});
  }

  onChildrenChange = (e: any) => {
    const children = e.target.value;
    
    this.setState({children});
  }

  render() {
    const {title, children} = this.state;

    return (
      <div>
        {this.renderCristals()}
        <CristalCreatorWrapper>
          <Select
            label="Position"
            items={positionItems}
            defaultSelected={selectedItem}
            onSelected={this.onPositionChange}
            droplistShouldFitContainer={true}
          />
          <FieldText label="Title" value={title} onChange={this.onTitleChange} />
          <FieldText label="Content" value={children} onChange={this.onChildrenChange} />
          <Button appearance="primary" onClick={this.createNewCristal}>
            Create
          </Button>
        </CristalCreatorWrapper>
      </div>
    );
  }
}