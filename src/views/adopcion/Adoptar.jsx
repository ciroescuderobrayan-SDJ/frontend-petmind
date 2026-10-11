import { useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import PetCard from '../../components/cards/PetCard'
import Icon from '../../components/ui/Icon'
import { Breadcrumbs, Pagination } from '../../components/ui/Navigation'
import { ChipSelect, DualRange, SegmentedControl, Toggle } from '../../components/ui/Controls'
import { EmptyState } from '../../components/ui/Decor'
import { SelectInput } from '../../components/forms/Field'
import { usePets } from '../../context/PetsContext'
import { useFoundations } from '../../context/FoundationsContext'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { adoptableStatuses, sizes } from '../../data/pets'
import { formatAge } from '../../utils/dates'
import { formatNumber } from '../../utils/format'
import styles from './Adoptar.module.css'

const AGE_MAX = 180
const PAGE_SIZE = 8

const emptyFilters = {
  q: '',
  foundationId: '',
  species: [],
  sizes: [],
  age: [0, AGE_MAX],
  sex: 'todos',
  cities: [],
  goodWithKids: false,
  goodWithCats: false,
  sterilized: false,
  specialNeeds: false,
}

const agePresets = [
  { value: 'cualquiera', label: 'Cualquier edad', range: [0, AGE_MAX] },
  { value: 'cachorro', label: 'Cachorro (menos de 1 año)', range: [0, 11] },
  { value: 'adulto', label: 'Adulto (1 a 7 años)', range: [12, 84] },
  { value: 'senior', label: 'Senior (más de 7 años)', range: [85, AGE_MAX] },
]

const sortOptions = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'nombre', label: 'Nombre (A-Z)' },
  { value: 'menor', label: 'Menor edad' },
  { value: 'mayor', label: 'Mayor edad' },
]

const speciesLabels = { Perro: 'Perros', Gato: 'Gatos', Otro: 'Otros' }

function initialFromUrl(params) {
  return {
    ...emptyFilters,
    q: params.get('q') ?? '',
    foundationId: params.get('fundacion') ?? '',
    species: params.get('especie') ? [params.get('especie')] : [],
  }
}

function ageText([low, high]) {
  if (low === 0 && high === AGE_MAX) return 'Todas'
  return `${formatAge(Math.max(low, 1))} – ${high >= AGE_MAX ? '15+ años' : formatAge(high)}`
}

// 02 · Adopción / 01 · Listado de mascotas con filtros
const Adoptar = () => {
  const { pets } = usePets()
  const { foundations, getFoundationById } = useFoundations()
  const { user, updateUser } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const [filters, setFilters] = useState(() => initialFromUrl(params))
  const [sort, setSort] = useState('recientes')
  const [view, setView] = useState('grid')
  const [page, setPage] = useState(1)
  const [showAllCities, setShowAllCities] = useState(false)
  const resultsRef = useRef(null)

  // Si llega otra búsqueda por la URL (buscador de la Navbar), se reinician los filtros.
  const [lastSearch, setLastSearch] = useState(location.search)
  if (lastSearch !== location.search) {
    setLastSearch(location.search)
    setFilters(initialFromUrl(params))
    setPage(1)
  }

  const adoptable = useMemo(() => pets.filter((pet) => adoptableStatuses.includes(pet.status)), [pets])

  const cityCounts = useMemo(() => {
    const counts = {}
    adoptable.forEach((pet) => {
      counts[pet.city] = (counts[pet.city] ?? 0) + 1
    })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [adoptable])

  const results = useMemo(() => {
    const text = filters.q.trim().toLowerCase()
    const list = adoptable.filter((pet) => {
      if (text && !pet.name.toLowerCase().includes(text)) return false
      if (filters.foundationId && pet.foundationId !== filters.foundationId) return false
      if (filters.species.length && !filters.species.includes(pet.species)) return false
      if (filters.sizes.length && !filters.sizes.includes(pet.size)) return false
      if (pet.ageMonths < filters.age[0] || pet.ageMonths > filters.age[1]) return false
      if (filters.sex !== 'todos' && pet.sex !== filters.sex) return false
      if (filters.cities.length && !filters.cities.includes(pet.city)) return false
      if (filters.goodWithKids && !pet.goodWithKids) return false
      if (filters.goodWithCats && !pet.goodWithCats) return false
      if (filters.sterilized && !pet.health?.sterilized) return false
      if (filters.specialNeeds && !pet.specialNeeds) return false
      return true
    })
    const sorted = [...list]
    if (sort === 'recientes') sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    if (sort === 'nombre') sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'))
    if (sort === 'menor') sorted.sort((a, b) => a.ageMonths - b.ageMonths)
    if (sort === 'mayor') sorted.sort((a, b) => b.ageMonths - a.ageMonths)
    return sorted
  }, [adoptable, filters, sort])

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const waiting = foundations.reduce((total, foundation) => total + (foundation.verified ? foundation.stats.pets : 0), 0)

  function update(changes) {
    setFilters((prev) => ({ ...prev, ...changes }))
    setPage(1)
  }

  function clearFilters() {
    setFilters(emptyFilters)
    setPage(1)
  }

  const agePreset = agePresets.find((preset) => preset.range[0] === filters.age[0] && preset.range[1] === filters.age[1])?.value ?? 'personalizada'

  // Etiquetas de los filtros activos, cada una con su forma de quitarse.
  const activeChips = [
    filters.q && { key: 'q', label: `“${filters.q}”`, remove: () => update({ q: '' }) },
    filters.foundationId && { key: 'f', label: getFoundationById(filters.foundationId)?.name ?? 'Fundación', remove: () => update({ foundationId: '' }) },
    ...filters.species.map((value) => ({ key: `s-${value}`, label: speciesLabels[value], remove: () => update({ species: filters.species.filter((item) => item !== value) }) })),
    ...filters.sizes.map((value) => ({ key: `t-${value}`, label: value, remove: () => update({ sizes: filters.sizes.filter((item) => item !== value) }) })),
    (filters.age[0] !== 0 || filters.age[1] !== AGE_MAX) && { key: 'age', label: ageText(filters.age), remove: () => update({ age: [0, AGE_MAX] }) },
    filters.sex !== 'todos' && { key: 'sex', label: filters.sex, remove: () => update({ sex: 'todos' }) },
    ...filters.cities.map((value) => ({ key: `c-${value}`, label: value, remove: () => update({ cities: filters.cities.filter((item) => item !== value) }) })),
    filters.goodWithKids && { key: 'kids', label: 'Apto con niños', remove: () => update({ goodWithKids: false }) },
    filters.goodWithCats && { key: 'cats', label: 'Convive con gatos', remove: () => update({ goodWithCats: false }) },
    filters.sterilized && { key: 'ster', label: 'Esterilizado', remove: () => update({ sterilized: false }) },
    filters.specialNeeds && { key: 'special', label: 'Necesidades especiales', remove: () => update({ specialNeeds: false }) },
  ].filter(Boolean)

  function createAlert() {
    if (!user) {
      navigate('/login', { state: { from: '/adoptar' } })
      return
    }
    const parts = [filters.species.map((value) => speciesLabels[value].toLowerCase()).join(' y ') || 'mascotas', filters.sizes.join(', ').toLowerCase(), filters.cities.length ? `en ${filters.cities.join(', ')}` : '']
    const label = parts.filter(Boolean).join(' ')
    updateUser({ alert: { label, species: filters.species[0] ?? '', size: filters.sizes[0] ?? '', city: filters.cities[0] ?? '', lastMatch: null } })
    showToast(`Alerta creada: te avisaremos cuando lleguen ${label}.`)
  }

  const visibleCities = showAllCities ? cityCounts : cityCounts.slice(0, 4)

  return (
    <div className="page page-tint-mint">
      <title>Adoptar | PetMind</title>

      <div className="container">
        <section className={styles.hero}>
          <div>
            <Breadcrumbs items={[{ label: 'Inicio', to: '/' }, { label: 'Adoptar' }]} />
            <h1 className={styles.title}>
              Encuentra a tu <span>nuevo compañero</span>
            </h1>
            <p className={styles.lead}>Todas las mascotas están con fundaciones verificadas, vacunadas y listas para conocer a su familia.</p>
          </div>
          <div className={styles.heroPets} aria-hidden="true">
            <img className={styles.heroPetA} src="/img/fotos/mascota-nala-gata.jpg" alt="" />
            <img className={styles.heroPetB} src="/img/fotos/mascota-rocky-perro.jpg" alt="" />
            <img className={styles.heroPetC} src="/img/fotos/mascota-canela-perra.jpg" alt="" />
            <span className={styles.heroNote}>
              {formatNumber(waiting)} esperan un hogar <Icon name="heart" />
            </span>
          </div>
        </section>

        <form
          className={styles.searchBar}
          role="search"
          onSubmit={(event) => {
            event.preventDefault()
            resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
        >
          <label className={styles.searchField}>
            <span>Busco un</span>
            <SelectInput value={filters.species.length === 1 ? filters.species[0] : 'todos'} onChange={(event) => update({ species: event.target.value === 'todos' ? [] : [event.target.value] })}>
              <option value="todos">Perro o gato</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Otro">Otro</option>
            </SelectInput>
          </label>
          <label className={styles.searchField}>
            <span>Ciudad</span>
            <SelectInput value={filters.cities.length === 1 ? filters.cities[0] : 'todas'} onChange={(event) => update({ cities: event.target.value === 'todas' ? [] : [event.target.value] })}>
              <option value="todas">Todas</option>
              {cityCounts.map(([city]) => (
                <option key={city}>{city}</option>
              ))}
            </SelectInput>
          </label>
          <label className={styles.searchField}>
            <span>Edad</span>
            <SelectInput value={agePreset} onChange={(event) => update({ age: agePresets.find((preset) => preset.value === event.target.value)?.range ?? [0, AGE_MAX] })}>
              {agePresets.map((preset) => (
                <option key={preset.value} value={preset.value}>
                  {preset.label}
                </option>
              ))}
              {agePreset === 'personalizada' && <option value="personalizada">{ageText(filters.age)}</option>}
            </SelectInput>
          </label>
          <label className={styles.searchField}>
            <span>Tamaño</span>
            <SelectInput value={filters.sizes.length === 1 ? filters.sizes[0] : 'todos'} onChange={(event) => update({ sizes: event.target.value === 'todos' ? [] : [event.target.value] })}>
              <option value="todos">Todos</option>
              {sizes.map((size) => (
                <option key={size}>{size}</option>
              ))}
            </SelectInput>
          </label>
          <button type="submit" className={`btn btn-primary ${styles.searchButton}`}>
            <Icon name="search" /> Buscar
          </button>
        </form>

        <div className={styles.layout}>
          <aside className={styles.sidebar} aria-label="Filtros">
            <div className={styles.filters}>
              <div className={styles.filtersHeader}>
                <h2>Filtros</h2>
                <button type="button" className="link-button" onClick={clearFilters}>
                  Limpiar
                </button>
              </div>

              <div className={styles.filterGroup}>
                <h3>Especie</h3>
                <ChipSelect
                  size="sm"
                  label="Especie"
                  options={[
                    { value: 'Perro', label: 'Perros' },
                    { value: 'Gato', label: 'Gatos' },
                    { value: 'Otro', label: 'Otros' },
                  ]}
                  values={filters.species}
                  onChange={(species) => update({ species })}
                />
              </div>

              <div className={styles.filterGroup}>
                <h3>Tamaño</h3>
                <ChipSelect size="sm" label="Tamaño" options={sizes} values={filters.sizes} onChange={(value) => update({ sizes: value })} />
              </div>

              <div className={styles.filterGroup}>
                <div className={styles.filterTitleRow}>
                  <h3>Edad</h3>
                  <span>{ageText(filters.age)}</span>
                </div>
                <DualRange min={0} max={AGE_MAX} step={1} value={filters.age} onChange={(age) => update({ age })} labels={['Cachorro', 'Adulto', 'Senior']} label="Edad en meses" />
              </div>

              <div className={styles.filterGroup}>
                <h3>Sexo</h3>
                <SegmentedControl size="sm" label="Sexo" options={[{ value: 'todos', label: 'Todos' }, 'Hembra', 'Macho']} value={filters.sex} onChange={(sex) => update({ sex })} />
              </div>

              <div className={styles.filterGroup}>
                <h3>Ciudad</h3>
                <ul className={styles.cityList}>
                  {visibleCities.map(([city, count]) => (
                    <li key={city}>
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={filters.cities.includes(city)}
                          onChange={(event) => update({ cities: event.target.checked ? [...filters.cities, city] : filters.cities.filter((item) => item !== city) })}
                        />
                        <span>{city}</span>
                      </label>
                      <span className={styles.cityCount}>{count}</span>
                    </li>
                  ))}
                </ul>
                {cityCounts.length > 4 && (
                  <button type="button" className={`link-button ${styles.moreCities}`} onClick={() => setShowAllCities((prev) => !prev)}>
                    {showAllCities ? 'Ver menos ciudades' : 'Ver más ciudades'}
                  </button>
                )}
              </div>

              <div className={`${styles.filterGroup} ${styles.toggles}`}>
                <h3>Características</h3>
                <Toggle label="Apto con niños" checked={filters.goodWithKids} onChange={(value) => update({ goodWithKids: value })} />
                <Toggle label="Convive con gatos" checked={filters.goodWithCats} onChange={(value) => update({ goodWithCats: value })} />
                <Toggle label="Esterilizado" checked={filters.sterilized} onChange={(value) => update({ sterilized: value })} />
                <Toggle label="Necesidades especiales" checked={filters.specialNeeds} onChange={(value) => update({ specialNeeds: value })} />
              </div>
            </div>

            <div className={styles.alertCard}>
              <span className="script">¿No lo encuentras?</span>
              <h2>Activa una alerta</h2>
              <p>Te avisamos cuando llegue una mascota con estos filtros.</p>
              <button type="button" className="btn btn-white btn-sm" onClick={createAlert}>
                <Icon name="bell" /> Crear alerta
              </button>
            </div>
          </aside>

          <section className={styles.results} ref={resultsRef} aria-live="polite">
            <div className={styles.resultsHeader}>
              <p className={styles.count}>
                <strong>{results.length}</strong> {results.length === 1 ? 'mascota encontrada' : 'mascotas encontradas'}
              </p>
              <ul className={styles.activeChips}>
                {activeChips.map((chip) => (
                  <li key={chip.key}>
                    <button type="button" className={styles.activeChip} onClick={chip.remove} aria-label={`Quitar filtro ${chip.label}`}>
                      {chip.label} <Icon name="x" strokeWidth={2.4} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className={styles.resultsTools}>
                <SelectInput aria-label="Ordenar" value={sort} onChange={(event) => setSort(event.target.value)} className={styles.sortSelect}>
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </SelectInput>
                <div className={styles.viewToggle} role="group" aria-label="Vista">
                  <button type="button" className={view === 'grid' ? styles.viewActive : ''} onClick={() => setView('grid')} aria-pressed={view === 'grid'} aria-label="Ver en cuadrícula">
                    <Icon name="grid" />
                  </button>
                  <button type="button" className={view === 'list' ? styles.viewActive : ''} onClick={() => setView('list')} aria-pressed={view === 'list'} aria-label="Ver en lista">
                    <Icon name="list" />
                  </button>
                </div>
              </div>
            </div>

            <div className={view === 'grid' ? styles.grid : styles.list}>
              {pageItems.map((pet) => (
                <PetCard key={pet.id} pet={pet} variant={view === 'list' ? 'list' : 'default'} />
              ))}
              {currentPage === totalPages && (
                <EmptyState
                  illustration
                  className={styles.moreCard}
                  title={results.length ? 'Hay más peludos esperando' : 'No encontramos mascotas con esos filtros'}
                  text={results.length ? 'Amplía tu búsqueda a otras ciudades o tamaños.' : 'Prueba quitando algunos filtros o crea una alerta.'}
                  action={results.length ? 'Ampliar búsqueda' : 'Limpiar filtros'}
                  onAction={clearFilters}
                />
              )}
            </div>

            <div className={styles.pagination}>
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onChange={(value) => {
                  setPage(value)
                  resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Adoptar
