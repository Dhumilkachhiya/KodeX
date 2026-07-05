import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '../redux/store';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';

// Mocking the toast library which often causes issues in test environments
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: () => <div></div>,
}));

// We must also mock Firebase if it's imported in the auth components
vi.mock('../utils/googleAuth.js', () => ({
  handleGoogleAuth: vi.fn(),
}));

describe('KodeX Auth UI Tests', () => {
  // TC-UI-01: Registration page renders all fields
  test('renders registration form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </Provider>
    );
    
    // Check for essential form fields
    expect(screen.getByPlaceholderText(/john_doe/i)).toBeInTheDocument(); // Username
    expect(screen.getByPlaceholderText(/example.com/i)).toBeInTheDocument(); // Email
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument(); // Password
    
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  // TC-UI-02: Login page renders fields
  test('renders login form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    // Check for essential form fields
    expect(screen.getByPlaceholderText(/example.com/i)).toBeInTheDocument(); // Email
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument(); // Password
    
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
