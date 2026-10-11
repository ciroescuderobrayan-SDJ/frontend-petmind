import { useState } from 'react'
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom'
import Icon from '../../components/ui/Icon'
import { SegmentedControl } from '../../components/ui/Controls'
import { Field, IconInput, SelectInput } from '../../components/forms/Field'
import { documentTypes } from '../../data/donations'
import { isValidEmail, onlyDigits } from '../../utils/format'
import styles from './DonarFlujo.module.css'

function validate(draft) {
  const errors = {}
  if (!draft.name.trim()) errors.name = 'Escribe tus nombres.'
  if (!draft.lastName.trim()) errors.lastName = 'Escribe tus apellidos.'
  const doc = onlyDigits(draft.docNumber)
  if (draft.docType === 'PA' ? draft.docNumber.trim().length < 5 : doc.length < 6 || doc.length > 11) errors.docNumber = 'Revisa el número de documento.'
  if (!isValidEmail(draft.email)) errors.email = 'Escribe un correo válido: ahí llega el certificado.'
  if (onlyDigits(draft.phone).length !== 10) errors.phone = 'El celular debe tener 10 dígitos.'
  if (draft.company) {
    if (!draft.companyName.trim()) errors.companyName = 'Escribe la razón social.'
    if (!/^\d{3}\.?\d{3}\.?\d{3}-?\d$/.test(draft.companyNit.trim())) errors.companyNit = 'Formato: 901.234.567-8'
  }
  return errors
}

// 03 · Donaciones / 04 · Donar paso 2 — Tus datos
export default function DonarDatos() {
  const { draft, update, beneficiary } = useOutletContext()
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})

  if (!draft.stepOneDone) return <Navigate to=".." relative="path" replace />

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    update({ [name]: type === 'checkbox' ? checked : value })
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const newErrors = validate(draft)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return
    update({ stepTwoDone: true })
    navigate('../pago', { relative: 'path' })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div>
        <h1 className={styles.title}>Tus datos</h1>
        <p className={styles.lead}>Los usamos para enviarte el comprobante y el certificado de donación.</p>
      </div>

      <div className="form-row">
        <Field label="Nombres" htmlFor="don-name" error={errors.name}>
          <input id="don-name" className="input" name="name" autoComplete="given-name" value={draft.name} onChange={handleChange} aria-invalid={Boolean(errors.name) || undefined} />
        </Field>
        <Field label="Apellidos" htmlFor="don-lastname" error={errors.lastName}>
          <input id="don-lastname" className="input" name="lastName" autoComplete="family-name" value={draft.lastName} onChange={handleChange} aria-invalid={Boolean(errors.lastName) || undefined} />
        </Field>
        <Field label="Tipo de documento" htmlFor="don-doctype">
          <SelectInput id="don-doctype" name="docType" value={draft.docType} onChange={handleChange}>
            {documentTypes
              .filter((type) => type.value !== 'NIT')
              .map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
          </SelectInput>
        </Field>
        <Field label="Número de documento" htmlFor="don-doc" error={errors.docNumber}>
          <input id="don-doc" className="input" name="docNumber" inputMode={draft.docType === 'PA' ? 'text' : 'numeric'} value={draft.docNumber} onChange={handleChange} aria-invalid={Boolean(errors.docNumber) || undefined} />
        </Field>
        <Field label="Correo electrónico" htmlFor="don-email" error={errors.email}>
          <IconInput id="don-email" icon="mail" type="email" name="email" autoComplete="email" value={draft.email} onChange={handleChange} invalid={Boolean(errors.email)} />
        </Field>
        <Field label="Celular" htmlFor="don-phone" error={errors.phone}>
          <IconInput id="don-phone" icon="phone" type="tel" inputMode="numeric" name="phone" autoComplete="tel-national" value={draft.phone} onChange={handleChange} invalid={Boolean(errors.phone)} />
        </Field>
      </div>

      <Field label="¿Necesitas el certificado a nombre de una empresa?">
        <div className={styles.companyToggle}>
          <SegmentedControl
            label="Certificado a nombre de una empresa"
            options={[
              { value: 'no', label: 'No, a mi nombre' },
              { value: 'si', label: 'Sí, empresa' },
            ]}
            value={draft.company ? 'si' : 'no'}
            onChange={(value) => update({ company: value === 'si' })}
          />
        </div>
      </Field>

      {draft.company && (
        <div className="form-row">
          <Field label="Razón social" htmlFor="don-company" error={errors.companyName}>
            <input id="don-company" className="input" name="companyName" value={draft.companyName} onChange={handleChange} aria-invalid={Boolean(errors.companyName) || undefined} />
          </Field>
          <Field label="NIT" htmlFor="don-nit" error={errors.companyNit}>
            <input id="don-nit" className="input" name="companyNit" placeholder="901.234.567-8" value={draft.companyNit} onChange={handleChange} aria-invalid={Boolean(errors.companyNit) || undefined} />
          </Field>
        </div>
      )}

      <div className={styles.checks}>
        <label className="checkbox">
          <input type="checkbox" name="updates" checked={draft.updates} onChange={handleChange} />
          Quiero recibir actualizaciones {beneficiary === 'la campaña' ? 'de la campaña' : `de ${beneficiary}`} por correo
        </label>
        <label className="checkbox">
          <input type="checkbox" name="showName" checked={draft.showName} onChange={handleChange} disabled={draft.anonymous} />
          {draft.anonymous ? 'Elegiste donar de forma anónima: tu nombre no aparecerá' : 'Mostrar mi nombre en la lista de donantes'}
        </label>
      </div>

      <div className={styles.actions}>
        <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate('..', { relative: 'path' })}>
          <Icon name="chevron-left" /> Anterior
        </button>
        <button type="submit" className="btn btn-accent btn-lg">
          Continuar al pago <Icon name="arrow-right" />
        </button>
      </div>
    </form>
  )
}
