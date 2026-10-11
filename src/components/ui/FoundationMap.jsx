import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import styles from './FoundationMap.module.css'

const pinColors = { primary: '#0b6b67', accent: '#e0654a', info: '#4f8fc4', purple: '#8a6bc2', warning: '#c98a1e', green: '#3c8d5a' }

// Mapa ilustrado (sin librerías de mapas): calles, río, parques y un pin por fundación.
export default function FoundationMap({ foundations, large = false, activeId, onSelect }) {
  const [zoom, setZoom] = useState(1)
  const [hoverId, setHoverId] = useState(null)
  const shownId = hoverId ?? activeId ?? foundations[0]?.id
  const shown = foundations.find((foundation) => foundation.id === shownId)

  return (
    <div className={`${styles.map} ${large ? styles.large : ''}`}>
      <div className={styles.canvas} style={{ transform: `scale(${zoom})` }}>
        <svg className={styles.streets} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M18 0 C19 30 17 60 24 100" />
          <path d="M72 0 C70 35 74 70 70 100" />
          <path d="M0 26 C30 22 60 36 100 24" />
          <path d="M0 70 C35 64 60 72 100 66" />
          <path className={styles.river} d="M45 0 C40 20 52 40 46 60 C42 75 50 88 47 100" />
        </svg>
        <span className={`${styles.park} ${styles.parkA}`} />
        <span className={`${styles.park} ${styles.parkB}`} />

        {foundations.map((foundation) => {
          const active = foundation.id === shownId
          return (
            <button
              key={foundation.id}
              type="button"
              className={`${styles.pin} ${active ? styles.pinActive : ''}`}
              style={{ left: `${foundation.map.x}%`, top: `${foundation.map.y}%`, '--pin': pinColors[foundation.color] ?? pinColors.primary }}
              onMouseEnter={() => setHoverId(foundation.id)}
              onMouseLeave={() => setHoverId(null)}
              onFocus={() => setHoverId(foundation.id)}
              onBlur={() => setHoverId(null)}
              onClick={() => onSelect?.(foundation.id)}
              aria-label={`${foundation.name}, ${foundation.city}`}
            >
              <span>{foundation.initials}</span>
            </button>
          )
        })}

        {shown && (
          <span className={styles.label} style={{ left: `${shown.map.x}%`, top: `${shown.map.y}%` }}>
            {shown.name}
          </span>
        )}
      </div>

      <div className={styles.zoom}>
        <button type="button" onClick={() => setZoom((value) => Math.min(1.6, value + 0.2))} aria-label="Acercar mapa">
          <Icon name="plus" strokeWidth={2.4} />
        </button>
        <button type="button" onClick={() => setZoom((value) => Math.max(1, value - 0.2))} aria-label="Alejar mapa">
          <Icon name="minus" strokeWidth={2.4} />
        </button>
      </div>

      {large && shown && (
        <div className={styles.popup}>
          <strong>{shown.name}</strong>
          <span>
            {shown.city} · Desde {shown.since}
          </span>
          <Link className="btn btn-primary btn-sm" to={`/fundaciones/${shown.id}`}>
            Ver perfil <Icon name="arrow-right" />
          </Link>
        </div>
      )}
    </div>
  )
}
