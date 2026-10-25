import { useRef } from 'react';

export default function OtpInput({ length = 6, value, onChange, onComplete }) {
  const inputs = useRef([]);

  function focusBox(index) {
    const box = inputs.current[index];
    if (box) box.focus();
  }

  function update(newDigits) {
    onChange(newDigits);
    if (newDigits.every(d => d !== '')) onComplete(newDigits.join(''));
  }

  function handleChange(e, index) {
    const digit = e.target.value.replace(/\D/g, '').slice(-1);
    if (!digit) return;
    const newDigits = [...value];
    newDigits[index] = digit;
    update(newDigits);
    focusBox(index + 1);
  }

  function handleKeyDown(e, index) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newDigits = [...value];
      if (value[index]) {
        newDigits[index] = '';
      } else if (index > 0) {
        newDigits[index - 1] = '';
        focusBox(index - 1);
      }
      onChange(newDigits);
    }
    if (e.key === 'ArrowLeft') focusBox(index - 1);
    if (e.key === 'ArrowRight') focusBox(index + 1);
  }

  function handlePaste(e, index) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '');
    if (!pasted) return;
    const newDigits = [...value];
    let last = index;
    for (let i = 0; i < pasted.length && index + i < length; i++) {
      newDigits[index + i] = pasted[i];
      last = index + i;
    }
    update(newDigits);
    focusBox(Math.min(last + 1, length - 1));
  }

  return (
    <div className="otp-boxes" role="group" aria-label="One time password">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={el => (inputs.current[index] = el)}
          value={digit}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={e => handlePaste(e, index)}
          onFocus={e => e.target.select()}
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          aria-label={'Digit ' + (index + 1)}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
}
