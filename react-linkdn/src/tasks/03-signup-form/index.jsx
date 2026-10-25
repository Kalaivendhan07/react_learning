import { useRef, useState } from 'react';
import './style.css';

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 3) errors.name = 'Name must be at least 3 letters';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email';
  if (values.password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (values.confirm !== values.password) errors.confirm = 'Passwords do not match';
  return errors;
}

function fakeSignup(values) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.email === 'taken@acme.com') reject(new Error('This email is already registered'));
      else resolve({ name: values.name });
    }, 1500);
  });
}

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirm', label: 'Confirm password', type: 'password' },
];

export default function SignupForm() {
  const [values, setValues] = useState({ name: '', email: '', password: '', confirm: '' });
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState('');
  const [user, setUser] = useState(null);
  const sendingRef = useRef(false);

  const errors = validate(values);

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length > 0 || sendingRef.current) return;

    sendingRef.current = true;
    setSending(true);
    setServerError('');
    try {
      const result = await fakeSignup(values);
      setUser(result);
    } catch (err) {
      setServerError(err.message);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  if (user) {
    return <p className="signup-success">Welcome, {user.name}! Your account is ready.</p>;
  }

  return (
    <form className="signup" onSubmit={handleSubmit} noValidate>
      {FIELDS.map(field => {
        const showError = (touched[field.name] || submitted) && errors[field.name];
        return (
          <div key={field.name} className="signup-field">
            <label htmlFor={field.name}>{field.label}</label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={showError ? 'true' : 'false'}
              aria-describedby={field.name + '-error'}
            />
            {showError && <span id={field.name + '-error'} className="signup-error">{errors[field.name]}</span>}
          </div>
        );
      })}

      {serverError && <p className="signup-server-error">{serverError}</p>}

      <button type="submit" disabled={sending}>
        {sending ? 'Creating account...' : 'Create account'}
      </button>
      <p className="signup-hint">Tip: use taken@acme.com to see a server error.</p>
    </form>
  );
}
