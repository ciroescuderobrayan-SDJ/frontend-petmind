import { useId, useState } from 'react'
import Icon from '../ui/Icon'
import { readFile } from '../../utils/files'
import styles from './FileDropzone.module.css'

// Zona para arrastrar o seleccionar archivos. Entrega [{ name, size, type, url? }].
export function FileDropzone({
  onFiles,
  accept = 'image/*',
  multiple = true,
  title = 'Sube fotos o arrástralas aquí',
  hint = 'JPG o PNG · máximo 5 MB',
  icon = 'upload',
  tone = 'primary',
  layout = 'stack',
  maxSizeMb = 5,
  className = '',
}) {
  const id = useId()
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')

  async function handleFiles(fileList) {
    const files = Array.from(fileList ?? [])
    if (files.length === 0) return
    const tooBig = files.find((file) => file.size > maxSizeMb * 1024 * 1024)
    if (tooBig) {
      setError(`"${tooBig.name}" pesa más de ${maxSizeMb} MB.`)
      return
    }
    setError('')
    const read = await Promise.all((multiple ? files : files.slice(0, 1)).map((file) => readFile(file)))
    onFiles(read)
  }

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`${styles.zone} ${styles[tone]} ${styles[layout]} ${dragging ? styles.dragging : ''}`}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          handleFiles(event.dataTransfer.files)
        }}
      >
        <Icon name={icon} className={styles.icon} />
        <span className={styles.text}>
          <span className={styles.title}>{title}</span>
          {hint && <span className={styles.hint}>{hint}</span>}
        </span>
        <input
          id={id}
          className="sr-only"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(event) => {
            handleFiles(event.target.files)
            event.target.value = ''
          }}
        />
      </label>
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

// Archivo ya cargado: "RUT.pdf · 1,2 MB · cargado" o miniatura con botón para quitar.
export function FileChip({ name, detail, onRemove, icon = 'file-check', tone = 'primary' }) {
  return (
    <div className={`${styles.chip} ${styles[`chip-${tone}`]}`}>
      <span className={styles.chipIcon}>
        <Icon name={icon} />
      </span>
      <span className={styles.chipText}>
        <strong>{name}</strong>
        {detail && <span>{detail}</span>}
      </span>
      {onRemove && (
        <button type="button" className={styles.chipRemove} onClick={onRemove} aria-label={`Quitar ${name}`}>
          <Icon name="x" />
        </button>
      )}
    </div>
  )
}
