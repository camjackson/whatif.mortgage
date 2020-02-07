import 'jest-enzyme';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let originalGetBoundingClientRect: () => any;

beforeEach(() => {
  originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = () => ({
    width: 500,
    height: 250,
    x: 456,
    y: 134,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    toJSON: () => '',
  });
});

afterEach(() => {
  Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
});

global.shallow = shallow;
global.mount = mount;
