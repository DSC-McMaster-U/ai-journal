import { render, screen, cleanup } from '@testing-library/react';
import Todo from '../exampleTestComponent/Todo';

describe('Todo Component', () => {
  // Cleanup after each test
  afterEach(() => {
    cleanup();
  });

  test('should render the todo component', () => {
    render(<Todo />);
    const todoElement = screen.getByTestId('todo-1');
    expect(todoElement).toBeInTheDocument();
  });

  test('should have correct text content', () => {
    render(<Todo />);
    const todoElement = screen.getByTestId('todo-1');
    expect(todoElement).toHaveTextContent('Todo');
  });
});
