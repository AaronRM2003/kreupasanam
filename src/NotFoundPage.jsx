// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.subtitle}>Oops! Page not found</p>
      <p style={styles.message}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" style={styles.button}>
        Go to Home
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    color: '#1a1a1a',
    textAlign: 'center',
    backgroundColor:'white'
  },
  title: {
    fontSize: '7rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    letterSpacing: '-3px',
  },
  subtitle: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1rem',
    maxWidth: '400px',
    marginBottom: '2rem',
    color: '#555',
  },
  button: {
    textDecoration: 'none',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
};
