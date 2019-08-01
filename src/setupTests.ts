import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

global.render = render;
