import * as React from 'react';
import {Component} from 'react';
import Select from '@atlaskit/single-select';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import Checkbox from '@atlaskit/checkbox';
import Cristal, { InitialPosition, CristalProps, CristalState } from '../src';
import {ComponentWrapper, CristalCreatorWrapper, CritalOptions, CristalToggleOptions} from './styled';

export interface AppProps {

}

export interface AppState {
  initialPosition: {value: InitialPosition};
  title: string;
  isResizable: boolean;
  isDraggable: boolean;
  isVisible: boolean;
  cristals: CristalProps[];
  cristalStates: {[key: string]: CristalState};
  children: string;
}

export type StatePropName = keyof AppState;

const positionItems = [
  {
    items: [
      { value: 'top-left', content: 'Top left' },
      { value: 'top-center', content: 'Top center' },
      { value: 'top-right', content: 'Top right' },
      { value: 'center', content: 'Center' },
      { value: 'bottom-left', content: 'Bottom left' },
      { value: 'bottom-center', content: 'Bottom center' },
      { value: 'bottom-right', content: 'Bottom right' }
    ]
  }
];
const selectedItem: any = positionItems[0].items[1];
const defaultTitle = 'Fancy cristal window';
const defaultChildren = '😎';

export default class App extends Component<AppProps, AppState> {
  state: AppState = {
    title: defaultTitle,
    initialPosition: selectedItem,
    isResizable: true,
    isDraggable: true,
    isVisible: true,
    children: defaultChildren,
    cristals: [{
      children: defaultChildren,
      title: defaultTitle
    }, {
      children: '🤔',
      title: 'Fancy cristal window 2',
      initialPosition: 'bottom-left'
    }],
    cristalStates: {}
  }

  onPositionChange = (e: any) => {
    this.setState({
      initialPosition: e.item
    });
  }

onMax = (ref:React.RefObject<Cristal>) => () => {
	var cristal = ref.current;
  if (cristal!=null) {
  	cristal.setState({width:window.innerWidth,x:0,y:0,height:window.innerHeight});
  }
}
onMin = (ref:React.RefObject<Cristal>) => () => {
	var cristal = ref.current;
  if (cristal!=null) {
  	cristal.setState({width:1, x:-1, y:-1, height:1});
  }
}
  removeCristal = (index: number) => () => {
    const {cristals} = this.state;

    cristals.splice(index, 1);

    this.setState({
      cristals
    });
  }

  onMove = (state: CristalState) => {
    const {cristalStates} = this.state;
    cristalStates['1'] = state;
    // TODO: fancy render
  }


  renderCristals = () => {
    const {cristals} = this.state;
    if (!cristals.length) return;

    const content = cristals.map((cristal, index) => {
      const {children} = cristal;
      const cref = React.createRef<Cristal>();

      return (
        <Cristal
          key={index}
          onClose={this.removeCristal(index)}
          onMin={this.onMin(cref)}
          onMax={this.onMax(cref)}
          onMove={this.onMove}
	         ref={cref}
          {...cristal}
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
    const {cristals, title, children, initialPosition, isResizable, isDraggable} = this.state;

    cristals.push({
      children,
      title,
      isResizable,
      isDraggable,
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

  onCheckboxChange = (propName: StatePropName) => () => {
    const currentValue = this.state[propName];
    this.setState({ [propName]: !currentValue } as any);
  }

  render() {
    const {title, children} = this.state;

    return (
      <div>
        {this.renderCristals()}
        <Cristal
          title="Create a new cristal window"
          isResizable={false}
          isDraggable={false}
          initialPosition="top-center"
        >
          <CristalCreatorWrapper>
            <CritalOptions>
              <Select
                label="Position"
                items={positionItems}
                defaultSelected={selectedItem}
                onSelected={this.onPositionChange}
                droplistShouldFitContainer={true}
              />
              <FieldText label="Title" value={title} onChange={this.onTitleChange} />
              <FieldText label="Content" value={children} onChange={this.onChildrenChange} />
            </CritalOptions>
            <CristalToggleOptions>
              <Checkbox
                initiallyChecked={true}
                label="Resizable"
                onChange={this.onCheckboxChange('isResizable')}
              />
              <Checkbox
                initiallyChecked={true}
                label="Draggable"
                onChange={this.onCheckboxChange('isDraggable')}
              />
            </CristalToggleOptions>
            <Button shouldFitContainer appearance="primary" onClick={this.createNewCristal}>
              Create
            </Button>
          </CristalCreatorWrapper>
        </Cristal>
      </div>
    );
  }
}
