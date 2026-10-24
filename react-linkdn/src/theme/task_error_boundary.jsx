import { Component } from 'react';

export default class TaskErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };                      
  }

  componentDidCatch(error, info) {
    console.error('Task crashed:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="crash" role="alert">
          <h2>This task crashed</h2>
          <pre>{String(this.state.error.message)}</pre>
          <button onClick={() => this.setState({ error: null })}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}