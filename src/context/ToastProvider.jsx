import { useCallback, useMemo, useRef, useState } from 'react'
import { ToastContext } from './ToastContext'
import Icon from '../components/ui/Icon'
import styles from './ToastProvider.module.css'

// Avisos cortos ("Enlace copiado", "Cambios guardados"…) en la esquina inferior.
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (message, { tone = 'success', duration = 3200 } = {}) => {
      counter.current += 1
      const id = counter.current
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }])
      window.setTimeout(() => dismiss(id), duration)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.region} role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.tone] ?? ''}`}>
            <Icon name={toast.tone === 'error' ? 'alert-circle' : 'check-circle'} />
            <span>{toast.message}</span>
            <button type="button" className={styles.close} onClick={() => dismiss(toast.id)} aria-label="Cerrar aviso">
              <Icon name="x" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
