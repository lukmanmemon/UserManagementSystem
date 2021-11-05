import { render, screen, fireEvent } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow} from 'enzyme';
import Popup from 'reactjs-popup';
import App from './App';

configure({ adapter: new Adapter() });

test('renders application', () => {
  render(<App />);
});

test('correct title is displayed', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('header')).toHaveTextContent("User Management System")
});

test('alert on submit with empty input', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  const { getByText } = render(<App />);
  fireEvent.click(getByText('New user'));
  expect(alertMock).toHaveBeenCalled()
});
