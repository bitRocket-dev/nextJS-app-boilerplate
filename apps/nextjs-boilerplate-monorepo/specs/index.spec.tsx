/** @format */
import React from 'react';

import { render } from '@testing-library/react';

import Home from '../pages';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Home />);
    expect(baseElement).toBeTruthy();
  });
});
