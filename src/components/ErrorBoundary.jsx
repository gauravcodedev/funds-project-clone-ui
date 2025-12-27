import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console (in production, you'd send this to an error reporting service)
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Optionally reload the page
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </Typography>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1, textAlign: 'left' }}>
                <Typography variant="caption" component="pre" sx={{ fontSize: '0.75rem', overflow: 'auto' }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              onClick={this.handleReset}
              sx={{ mt: 2 }}
            >
              Go to Home Page
            </Button>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

