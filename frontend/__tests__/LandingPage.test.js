import { render, screen, cleanup } from '@testing-library/react';
import LandingPage from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  }
}));

describe('Landing Page', () => {
  // Cleanup after each test
  afterEach(() => {
    cleanup();
  });

  test('should render the app title', () => {
    render(<LandingPage />);
    const headerElement = screen.getByText('Espressly');
    expect(headerElement).toBeInTheDocument();
  });

  test('should render the login button', () => {
    render(<LandingPage />);
    const buttonElement = screen.getByText('Get Started!');
    expect(buttonElement).toBeInTheDocument();
  });

  test("should render the app's features", () => {
    render(<LandingPage />);
    const featureElement = screen.getByText('Features');
    expect(featureElement).toBeInTheDocument();
  });
});
