import { render, screen, fireEvent } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure} from 'enzyme';
import App from './App';

configure({ adapter: new Adapter() });

test('renders application', () => {
  render(<App />);
});

test('correct title is displayed', () => {
  render(<App />);
  expect(screen.getByTestId('header')).toHaveTextContent("User Management System")
});
