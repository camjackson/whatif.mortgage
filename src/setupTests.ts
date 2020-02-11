import 'jest-enzyme';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let originalGetBoundingClientRect: () => any;

beforeEach(() => {
  let getBoundingRectCallCount = -1;

  originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  Element.prototype.getBoundingClientRect = () => {
    getBoundingRectCallCount++;

    // Order is inside-out, so it's grid line label, then svg element
    const elementWidths = [45, 500];

    return {
      width: elementWidths[getBoundingRectCallCount],
      height: 250,
      x: 456,
      y: 134,
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      toJSON: () => '',
    };
  };
});

afterEach(() => {
  Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
});
