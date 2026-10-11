import Icon from '../ui/Icon'

// Etiqueta + control + error, con el patrón de formularios controlados del plan (sección 5.6).
export function Field({ label, htmlFor, optional, hint, error, children, className = '', extra }) {
  return (
    <div className={`field ${className}`}>
      {label && (
        <div className="field-label-row">
          <label className="field-label" htmlFor={htmlFor}>
            {label} {optional && <small>{optional === true ? '(opcional)' : optional}</small>}
          </label>
          {extra}
        </div>
      )}
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && (
        <span className="field-error" id={htmlFor ? `${htmlFor}-error` : undefined} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}

// Input con ícono a la izquierda (correo, teléfono, ubicación…).
export function IconInput({ icon, suffix, invalid, className = '', ...props }) {
  return (
    <div className="input-group">
      {icon && <Icon name={icon} className="input-icon" />}
      <input className={`input ${className}`} aria-invalid={invalid || undefined} {...props} />
      {suffix && <span className="input-suffix">{suffix}</span>}
    </div>
  )
}

// Select con flecha propia (y opcionalmente ícono a la izquierda).
export function SelectInput({ icon, invalid, children, className = '', ...props }) {
  return (
    <div className="input-group">
      {icon && <Icon name={icon} className="input-icon" />}
      <select className={`select ${className}`} aria-invalid={invalid || undefined} {...props}>
        {children}
      </select>
      <Icon name="chevron-down" className="input-chevron" />
    </div>
  )
}
