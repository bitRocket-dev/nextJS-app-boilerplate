/** @format */

// The test verifies that the Home page contains a level 1 heading (an HTML <h1> element), using the getByRole method of the testing library to search for an element with the role of "heading" and a level of 1.
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import Home from '../pages/index';
import '@testing-library/jest-dom';
import { store } from '../redux/createStore';

describe('Home', () => {
  it('renders a heading', () => {
    // The render method is used to render (or mount) the Home component within a virtual testing environment.
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );
    // The debug method is used to display in the terminal the tree of DOM nodes that corresponds to the selected element, in this case the level 1 heading.
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});
