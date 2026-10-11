import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import styles from './Navigation.module.css'

// Inicio > Adoptar > Luna
export function Breadcrumbs({ items, light = false }) {
  return (
    <nav aria-label="Ruta de navegación" className={`${styles.breadcrumbs} ${light ? styles.breadcrumbsLight : ''}`}>
      <ol>
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`}>
              {item.to && !last ? <Link to={item.to}>{item.label}</Link> : <span aria-current={last ? 'page' : undefined}>{item.label}</span>}
              {!last && <Icon name="chevron-right" className={styles.separator} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Pestañas. variant "underline" (perfil de la mascota) o "pills" (paneles, con contador).
export function Tabs({ tabs, value, onChange, variant = 'underline', label, className = '' }) {
  return (
    <div className={`${styles.tabs} ${styles[variant]} ${className}`} role="tablist" aria-label={label}>
      {tabs.map((tab) => {
        const active = tab.value === value
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={`${styles.tab} ${active ? styles.tabActive : ''}`}
            onClick={() => onChange(tab.value)}
          >
            {tab.icon && <Icon name={tab.icon} className={styles.tabIcon} />}
            {tab.label}
            {tab.count !== undefined && <span className={styles.tabCount}>{tab.count}</span>}
          </button>
        )
      })}
    </div>
  )
}

// Pregunta frecuente que se abre y se cierra.
export function AccordionItem({ question, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className={`${styles.accordion} ${open ? styles.accordionOpen : ''}`}>
      <button type="button" className={styles.accordionButton} aria-expanded={open} aria-controls={id} onClick={() => setOpen((prev) => !prev)}>
        <span>{question}</span>
        <Icon name={open ? 'minus' : 'plus'} />
      </button>
      <div id={id} className={styles.accordionPanel} hidden={!open}>
        {children}
      </div>
    </div>
  )
}

// ‹ 1 2 3 … 14 ›
export function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  const pages = []
  for (let number = 1; number <= totalPages; number += 1) {
    if (number === 1 || number === totalPages || Math.abs(number - page) <= 1 || (page <= 3 && number <= 3)) {
      pages.push(number)
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…')
    }
  }

  return (
    <nav className={styles.pagination} aria-label="Paginación">
      <button type="button" className={styles.pageButton} onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="Página anterior">
        <Icon name="chevron-left" />
      </button>
      {pages.map((number, index) =>
        number === '…' ? (
          <span key={`gap-${index}`} className={styles.pageGap}>
            …
          </span>
        ) : (
          <button
            key={number}
            type="button"
            className={`${styles.pageButton} ${number === page ? styles.pageActive : ''}`}
            onClick={() => onChange(number)}
            aria-current={number === page ? 'page' : undefined}
          >
            {number}
          </button>
        ),
      )}
      <button type="button" className={styles.pageButton} onClick={() => onChange(page + 1)} disabled={page === totalPages} aria-label="Página siguiente">
        <Icon name="chevron-right" />
      </button>
    </nav>
  )
}

// Menú desplegable (avatar de la Navbar, "más acciones" de las tablas).
export function Dropdown({ trigger, children, align = 'end', label = 'Abrir menú', className = '', buttonClassName = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    function handleClick(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false)
    }
    function handleKey(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  return (
    <div className={`${styles.dropdown} ${className}`} ref={ref}>
      <button type="button" className={buttonClassName} aria-haspopup="menu" aria-expanded={open} aria-label={label} onClick={() => setOpen((prev) => !prev)}>
        {trigger}
      </button>
      {open && (
        <div className={`${styles.menu} ${styles[`menu-${align}`]}`} role="menu" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  )
}

export function DropdownItem({ icon, children, onClick, to, danger = false }) {
  const content = (
    <>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </>
  )
  const className = `${styles.menuItem} ${danger ? styles.menuItemDanger : ''}`

  if (to) {
    return (
      <Link to={to} className={className} role="menuitem">
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={className} role="menuitem" onClick={onClick}>
      {content}
    </button>
  )
}
