import { Component } from 'react';
import formatTime from './formatTime';

export default class ClassStopwatch extends Component {
  state = { elapsed: 0, running: false, laps: [] };
  startedAt = 0;
  timer = null;

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.running && this.state.running) {
      this.startedAt = Date.now() - this.state.elapsed;
      this.timer = setInterval(() => {
        this.setState({ elapsed: Date.now() - this.startedAt });
      }, 100);
    }
    if (prevState.running && !this.state.running) {
      clearInterval(this.timer);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      formatTime(nextState.elapsed) !== formatTime(this.state.elapsed) ||
      nextState.running !== this.state.running ||
      nextState.laps !== this.state.laps
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  toggle = () => {
    this.setState(s => ({ running: !s.running }));
  };

  lap = () => {
    this.setState(s => ({ laps: [...s.laps, s.elapsed] }));
  };

  reset = () => {
    this.setState({ elapsed: 0, running: false, laps: [] });
  };

  render() {
    const { elapsed, running, laps } = this.state;
    return (
      <div className="watch">
        <h3>Class version</h3>
        <p className="watch-time">{formatTime(elapsed)}</p>
        <div className="watch-buttons">
          <button onClick={this.toggle}>{running ? 'Pause' : elapsed > 0 ? 'Resume' : 'Start'}</button>
          <button onClick={this.lap} disabled={!running}>Lap</button>
          <button onClick={this.reset}>Reset</button>
        </div>
        <ol className="watch-laps">
          {laps.map((lap, i) => <li key={i}>{formatTime(lap)}</li>)}
        </ol>
      </div>
    );
  }
}
