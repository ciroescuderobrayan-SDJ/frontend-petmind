import { useRef } from 'react'
import styles from './OtpInput.module.css'

// Seis casillas para el código de verificación. value es un string de hasta 6 dígitos.
export function OtpInput({ value, onChange, length = 6, invalid = false }) {
  const refs = useRef([])
  const digits = Array.from({ length }, (_, index) => value[index] ?? '')

  function focus(index) {
    refs.current[Math.max(0, Math.min(length - 1, index))]?.focus()
  }

  function handleChange(index, event) {
    const typed = event.target.value.replace(/\D/g, '')
    if (!typed) return
    const next = digits.slice()
    typed.split('').forEach((digit, offset) => {
      if (index + offset < length) next[index + offset] = digit
    })
    onChange(next.join('').slice(0, length))
    focus(index + typed.length)
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace') {
      event.preventDefault()
      const next = digits.slice()
      if (next[index]) {
        next[index] = ''
      } else if (index > 0) {
        next[index - 1] = ''
        focus(index - 1)
      }
      onChange(next.join(''))
    }
    if (event.key === 'ArrowLeft') focus(index - 1)
    if (event.key === 'ArrowRight') focus(index + 1)
  }

  function handlePaste(event) {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    event.preventDefault()
    onChange(pasted)
    focus(pasted.length)
  }

  return (
    <div className={styles.otp} role="group" aria-label="Código de verificación">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            refs.current[index] = element
          }}
          className={`${styles.box} ${digit ? styles.filled : ''} ${invalid ? styles.invalid : ''}`}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={length}
          value={digit}
          aria-label={`Dígito ${index + 1}`}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
        />
      ))}
    </div>
  )
}
