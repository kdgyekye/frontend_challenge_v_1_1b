import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';

import { initialState } from '../getStore';
import { AppFC, mapStateToProps } from '../App';

describe('Root App component rendering', () => {
  beforeEach(() => {
    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppFC started={true} onStart={() => null} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders loading state', () => {
    const props = {
      started: false,
      onStart: jest.fn(),
    };
    const { container, getByText } = render(<AppFC {...props} />);
    expect(container).toContainElement(getByText(/Loading/));
    expect(container.getElementsByClassName('app').length).toBe(0);
  });

  it('renders started state', () => {
    const props = {
      started: true,
      onStart: jest.fn(),
    };
    const { container } = render(<AppFC {...props} />);
    expect(container.getElementsByClassName('loading').length).toBe(0);
    expect(container.getElementsByClassName('app').length).toBe(1);
  });

  it('properly binds state', () => {
    const state = {
      ...initialState,
      started: true,
    };
    const props = mapStateToProps(state);
    expect(props.started).toEqual(true);
  });
});
