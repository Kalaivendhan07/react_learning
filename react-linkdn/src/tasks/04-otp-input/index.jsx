import { useEffect, useState } from 'react';
import OtpInput from './OtpInput';
import './style.css';

const LENGTH = 6;
const CORRECT_CODE = '123456';

function emptyDigits() {
  return Array(LENGTH).fill('');
}

export default function OtpPage() {
  const [digits, setDigits] = useState(emptyDigits);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [seconds, setSeconds] = useState(30);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (seconds === 0) return;
    const id = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  function handleComplete(code) {
    if (code === CORRECT_CODE) {
      setStatus('ok');
      setMessage('Verified!');
    } else {
      setStatus('error');
      setMessage('Wrong code, try again');
      setDigits(emptyDigits());
      setResetKey(k => k + 1);
    }
  }

  function resend() {
    setSeconds(30);
    setDigits(emptyDigits());
    setStatus('');
    setMessage('A new code was sent');
    setResetKey(k => k + 1);
  }

  return (
    <div className="otp">
      <p>Enter the 6-digit code we sent to your phone. (Hint: {CORRECT_CODE})</p>
      <OtpInput key={resetKey} length={LENGTH} value={digits} onChange={setDigits} onComplete={handleComplete} />
      {message && <p className={'otp-message ' + status}>{message}</p>}
      {seconds > 0 ? (
        <p className="otp-timer">Resend code in {seconds}s</p>
      ) : (
        <button onClick={resend}>Resend code</button>
      )}
    </div>
  );
}
