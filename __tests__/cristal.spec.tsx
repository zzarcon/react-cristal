import * as React from 'react';
import {Component} from 'react';
import {shallow, mount, ReactWrapper} from 'enzyme';
import Cristal, { CristalProps } from '../src';
import { RightResizeHandle, CloseIcon, Title, ContentWrapper, Header } from '../src/styled';

describe('<Cristal />', () => {
  class Children extends Component {
    render() {
      return <div>Children</div>;
    }
  }
  const setup = (props?: Partial<CristalProps>) => {
    const className = 'dat-class';
    const title = 'such-cristal';
    const onClose = jest.fn();
    const onMove = jest.fn();
    const onResize = jest.fn();
    const children = <Children />;
    const component = mount(
      <Cristal
        title={title}
        className={className}
        onClose={onClose}
        onMove={onMove}
        onResize={onResize}
        {...props}
      >
        {children}
      </Cristal>
    );

    return {
      component,
      children,
      onClose,
      onResize,
      onMove,
      title,
      className
    };
  };

  const createEvent = (options: Object = {}): MouseEvent => {
    const event = new MouseEvent('mousemove', {});

    for (let key in options) {
      event[key] = options[key];
    }

    return event;
  }

  const triggerDrag = (component: ReactWrapper, options: Object) => {
    const event = createEvent(options)

    component.find(Header).simulate('mouseDown');
    document.dispatchEvent(event);
  }

  const triggerResize = (component: ReactWrapper, options: Object = {}) => {
    const event = createEvent(options)

    component.find(RightResizeHandle).simulate('mouseDown');
    document.dispatchEvent(event);
  }
  
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
      const {component, onMove} = setup();
      
      triggerDrag(component, {
        movementX: 10,
        movementY: 10
      });

      expect(onMove).toHaveBeenCalledTimes(1);
      expect(onMove).toBeCalledWith(expect.objectContaining({
        height: 0,
        isDragging: true,
        isResizingX: false,
        isResizingY: false,
        width: 0,
        x: 20,
        y: 20
      }));
    });

    it('should not call onMove when coordinates change and isDraggable=false', () => {
      const {component, onMove} = setup({
        isDraggable: false
      });
      
      triggerDrag(component, {
        movementX: 10,
        movementY: 10
      });

      expect(onMove).toHaveBeenCalledTimes(0);
    });

    it('should call onResize when size changes', () => {
      const {component, onResize} = setup();
      
      triggerResize(component);

      expect(onResize).toHaveBeenCalledTimes(1);
    });
  });

  describe.skip('size', () => {
    it('should set initial size when initialSize is passed', () => {

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

    it('should initially set the component into the right coords when initialPosition == Coords', () => {

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
