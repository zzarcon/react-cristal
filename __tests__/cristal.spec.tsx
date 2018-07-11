import * as React from 'react';
import {Component} from 'react';
import {shallow, mount} from 'enzyme';
import Cristal from '../src';
import { RightResizeHandle, CloseIcon, Title, ContentWrapper } from '../src/styled';

describe('<Cristal />', () => {
  class Children extends Component {
    render() {
      return <div>Children</div>;
    }
  }
  const setup = () => {
    const className = 'dat-class';
    const title = 'such-cristal';
    const onClose = jest.fn();
    const children = <Children />;
    const component = mount(
      <Cristal
        title={title}
        className={className}
        onClose={onClose}
      >
        {children}
      </Cristal>
    );

    return {
      component,
      children,
      onClose,
      title,
      className
    };
  };
  
  describe('render', () => {
    it('should render children', () => {
      const {component} = setup();

      expect(component.find(ContentWrapper).find(Children)).toHaveLength(1);
    });

    it('should render resize handlers when is resizable', () => {
      const {component} = setup();

      expect(component.find(RightResizeHandle)).toHaveLength(1);
      component.setProps({isResizable: false});
      expect(component.find(RightResizeHandle)).toHaveLength(0);
    });

    it('should render the title', () => {
      const {component, title} = setup();

      expect(component.find(Title).text()).toEqual(title);
    });

    it('should append the given class names', () => {
      const {component, className} = setup();

      expect(component.instance().props['className']).toEqual(className);
    });
  });

  describe('callbacks', () => {
    it('should call onClose when cross icon is clicked', () => {
      const {component, onClose} = setup();

      component.find(CloseIcon).simulate('click');
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onMove when coordinates change', () => {

    });

    it('should call onResize when size changes', () => {

    });
  });

  describe.skip('z-index', () => {
    it('should set a new z-index when component mounts', () => {

    });

    it('should incrise the z-index of the cristal component when is clicked', () => {

    });
  });

  describe.skip('Position', () => {
    it('should initially render the component in a valid position', () => {

    });

    it('should use "initialPosition" for the initial render', () => {

    });
  });

  describe.skip('drag', () => {
    it('should update element position', () => {

    });
  });

  describe.skip('resize', () => {
    it('should update component size', () => {

    });
    
    it('should respect axis', () => {

    });
  });
});
