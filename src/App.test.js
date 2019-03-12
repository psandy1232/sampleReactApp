import React from 'react';
import {render, fireEvent} from 'react-testing-library'
import App from './App';

it('renders without crashing', () => {
  const {getByTestId,container} = render(<App/>);
  fireEvent.change(getByTestId('testinput'), {target: {value: 'upper'}});
  fireEvent.click(getByTestId('btnsub'));
  expect(container).toMatchSnapshot();
});
