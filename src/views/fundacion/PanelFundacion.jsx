import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Field, SelectInput } from '../../components/forms/Field'
import { FileDropzone } from '../../components/forms/FileDropzone'
import Icon from '../../components/ui/Icon'
import { useAdoptions } from '../../context/AdoptionsContext'
import { useAuth } from '../../context/AuthContext'
import { useCampaigns } from '../../context/CampaignsContext'
import { useDonations } from '../../context/DonationsContext'
import { useFoundations } from '../../context/FoundationsContext'
import { usePets } from '../../context/PetsContext'
import { useReports } from '../../context/ReportsContext'
import { useToast } from '../../context/ToastContext'
import { boardStages, stageLabels } from '../../data/adoptions'
import { campaignCategories } from '../../data/campaigns'
import { petStatuses, sizes, species } from '../../data/pets'
import { formatCOP, formatCOPShort } from '../../utils/format'
import styles from './Fundacion.module.css'

const newPet = { name: '', species: 'Perro', sex: 'Hembra', ageMonths: '12', size: 'Mediano', city: '', photo: '', status: 'Disponible', story: [''], traits: [], health: { vaccinated: false, dewormed: false, sterilized: false, microchip: false }, goodWithKids: false, goodWithDogs: false, goodWithCats: false }
const newCampaign = { title: '', headline: '', category: 'Tratamiento', summary: '', photo: '', expenses: [{ concept: '', amount: '' }], urgent: false, endDate: '' }
const titles = { resumen: 'Panel de fundaciÃ³n', mascotas: 'Mis mascotas', solicitudes: 'Solicitudes de adopciÃ³n', campanas: 'CampaÃ±as', donaciones: 'Donaciones', reportes: 'Reportes cercanos', mensajes: 'Mensajes', equipo: 'Equipo', documentos: 'Documentos' }

export default function PanelFundacion() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { petId, campaignId, id: requestId } = useParams()
  const section = pathname.split('/')[2] || 'resumen'
  const { user, updateUser } = useAuth()
  const { getFoundationById } = useFoundations()
  const foundation = getFoundationById(user.foundationId)
  const { pets, addPet, updatePet, deletePet } = usePets()
  const { requests, moveRequest, addMessage, addNote } = useAdoptions()
  const { campaigns, addCampaign, updateCampaign, deleteCampaign } = useCampaigns()
  const { donations } = useDonations()
  const { reports, updateReport } = useReports()
  const { showToast } = useToast()
  const [petForm, setPetForm] = useState(() => {
    const existing = pets.find((pet) => pet.id === petId && pet.foundationId === user.foundationId)
    return existing ? { ...existing, story: [existing.story?.[0] || ''] } : pathname.endsWith('/nueva') && section === 'mascotas' ? { ...newPet } : null
  })
  const [campaignForm, setCampaignForm] = useState(() => {
    const existing = campaigns.find((campaign) => campaign.id === campaignId && campaign.foundationId === user.foundationId)
    return existing ? { ...existing, expenses: existing.expenses?.length ? existing.expenses.map((expense) => ({ ...expense })) : [{ concept: '', amount: '' }] } : pathname.endsWith('/nueva') && section === 'campanas' ? { ...newCampaign } : null
  })
  const [selectedRequest, setSelectedRequest] = useState(() => requests.find((request) => request.id === requestId && request.foundationId === user.foundationId) || null)
  const [chat, setChat] = useState('')
  const [note, setNote] = useState('')
  const [search, setSearch] = useState('')
  const [petFilter, setPetFilter] = useState('Todas')
  const [team, setTeam] = useState(user.team || [{ name: 'Laura Restrepo', email: 'huellitas@correo.com', role: 'Administradora' }, { name: 'Marta GÃ³mez', email: 'marta@huellitas.org', role: 'Voluntaria' }])
  const ownPets = pets.filter((pet) => pet.foundationId === user.foundationId)
  const ownRequests = requests.filter((request) => request.foundationId === user.foundationId && request.stage !== 'borrador')
  const ownCampaigns = campaigns.filter((campaign) => campaign.foundationId === user.foundationId)
  const ownReports = reports.filter((report) => report.notified?.some((item) => item.foundationId === user.foundationId))
  const ownDonations = donations.filter((donation) => campaigns.some((campaign) => campaign.id === donation.campaignId && campaign.foundationId === user.foundationId))
  const latest = useMemo(() => [...ownRequests].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)), [ownRequests])

  function savePet(event) {
    event.preventDefault()
    if (!petForm.name.trim() || !petForm.city.trim() || !petForm.photo) return showToast('Completa nombre, ciudad y una foto principal.', { tone: 'error' })
    const data = { ...petForm, ageMonths: Number(petForm.ageMonths) || 12, foundationId: user.foundationId, city: petForm.city.trim(), story: [petForm.story[0] || ''], gallery: petForm.photo ? [{ src: petForm.photo }] : [], traits: petForm.traits.filter(Boolean) }
    if (petForm.id) updatePet(petForm.id, data); else addPet(data)
    setPetForm(null)
    navigate('/fundacion/mascotas')
    showToast(petForm.id ? 'Actualizamos la ficha de la mascota.' : 'Publicamos la mascota.', { tone: 'success' })
  }

  function saveCampaign(event) {
    event.preventDefault()
    const expense = campaignForm.expenses[0]
    if (!campaignForm.title.trim() || !campaignForm.summary.trim() || !campaignForm.photo || !expense.concept.trim() || Number(expense.amount) <= 0) return showToast('Completa los datos de campaÃ±a y un gasto vÃ¡lido.', { tone: 'error' })
    const data = { ...campaignForm, foundationId: user.foundationId, location: `${foundation?.city || user.city}, Colombia`, expenses: campaignForm.expenses.map((item) => ({ ...item, amount: Number(item.amount) })), story: [campaignForm.summary], status: 'Activa' }
    if (campaignForm.id) updateCampaign(campaignForm.id, data); else addCampaign(data)
    setCampaignForm(null)
    navigate('/fundacion/campanas')
    showToast(campaignForm.id ? 'Actualizamos la campaÃ±a.' : 'Creamos la campaÃ±a.', { tone: 'success' })
  }

  function advanceRequest(request, stage) {
    moveRequest(request.id, stage, { by: foundation?.representative || user.representative || user.name })
    setSelectedRequest((current) => current?.id === request.id ? { ...current, stage } : current)
    showToast(`La solicitud pasÃ³ a ${stageLabels[stage] || stage}.`, { tone: 'success' })
  }

  function sendChat(event) {
    event.preventDefault()
    if (!chat.trim() || !selectedRequest) return
    addMessage(selectedRequest.id, { from: 'foundation', author: foundation?.representative || user.name, text: chat.trim() })
    setChat('')
  }

  function saveNote(event) {
    event.preventDefault()
    if (!note.trim() || !selectedRequest) return
    addNote(selectedRequest.id, { text: note.trim(), author: foundation?.representative || user.name })
    setNote('')
    showToast('Guardamos la nota interna.')
  }

  const heading = titles[section] || titles.resumen
  return <div className={styles.page}>
    <title>{`${heading} | PetMind`}</title>
    <header className={styles.heading}><div><span className="eyebrow">{foundation?.name || 'Tu organizaciÃ³n'}</span><h1>{heading}</h1><p>Gestiona desde aquÃ­ el cuidado y los procesos de tu fundaciÃ³n.</p></div>{section === 'mascotas' && <button className="btn btn-primary" onClick={() => { setPetForm({ ...newPet }); navigate('/fundacion/mascotas/nueva') }} type="button"><Icon name="plus"/>Publicar mascota</button>}{section === 'campanas' && <button className="btn btn-primary" onClick={() => { setCampaignForm({ ...newCampaign }); navigate('/fundacion/campanas/nueva') }} type="button"><Icon name="plus"/>Crear campaÃ±a</button>}</header>
    {section === 'resumen' && <><div className={styles.stats}><Metric label="Mascotas activas" value={ownPets.filter((pet) => pet.status !== 'Adoptado').length} icon="paw"/><Metric label="Solicitudes nuevas" value={ownRequests.filter((item) => ['nueva', 'revision'].includes(item.stage)).length} icon="file"/><Metric label="CampaÃ±as activas" value={ownCampaigns.filter((item) => item.status === 'Activa').length} icon="heart"/><Metric label="Donaciones recibidas" value={formatCOPShort(ownDonations.filter((item) => item.status === 'aprobada').reduce((sum, item) => sum + item.amount, 0))} icon="star"/></div><div className={styles.columns}><section className={styles.card}><div className={styles.sectionHead}><h2>Solicitudes recientes</h2><Link to="/fundacion/solicitudes">Ver tablero <Icon name="arrow-right"/></Link></div>{latest.slice(0, 4).map((item) => <button type="button" key={item.id} className={styles.recent} onClick={() => { setSelectedRequest(item); navigate('/fundacion/solicitudes') }}><span><strong>{item.applicant?.name}</strong><small>{item.id} Â· {item.petId}</small></span><span className={styles.pill}>{stageLabels[item.stage]}</span></button>)}</section><section className={styles.card}><div className={styles.sectionHead}><h2>Calidad del perfil pÃºblico</h2><Link to={`/fundaciones/${user.foundationId}`}>Ver perfil <Icon name="arrow-right"/></Link></div><div className={styles.progress}><span style={{ width: '78%' }}/></div><strong>78% completo</strong><p>Agrega fotos y documentos recientes para que las familias conozcan mejor tu trabajo.</p><Link className="btn btn-secondary btn-sm" to="/fundacion/documentos">Revisar documentos</Link></section></div><section className={styles.card}><div className={styles.sectionHead}><h2>Tus mascotas</h2><Link to="/fundacion/mascotas">Administrar <Icon name="arrow-right"/></Link></div><div className="card-grid">{ownPets.filter((pet) => pet.status !== 'Adoptado').slice(0, 3).map((pet) => <article className={styles.miniPet} key={pet.id}><img src={pet.photo} alt=""/><strong>{pet.name}</strong><span>{pet.status}</span></article>)}</div></section></>}
    {section === 'mascotas' && <section className={styles.card}><div className={styles.toolbar}><input className="input" placeholder="Buscar por nombre" value={search} onChange={(event) => setSearch(event.target.value)}/><select className="select" value={petFilter} onChange={(event) => setPetFilter(event.target.value)}><option>Todas</option>{petStatuses.map((status) => <option key={status}>{status}</option>)}</select></div>{petForm && <PetEditor value={petForm} setValue={setPetForm} onSubmit={savePet} onClose={() => setPetForm(null)}/>}<div className={styles.petList}>{ownPets.filter((pet) => (petFilter === 'Todas' || pet.status === petFilter) && pet.name.toLowerCase().includes(search.toLowerCase())).map((pet) => <article className={styles.petRow} key={pet.id}><img src={pet.photo} alt=""/><div><strong>{pet.name}</strong><span>{pet.species} Â· {pet.city} Â· {pet.status}</span><small>{pet.views || 0} visitas al perfil</small></div><button className="btn btn-secondary btn-sm" onClick={() => setPetForm({ ...pet, story: [pet.story?.[0] || ''] })} type="button">Editar</button><button className="btn btn-ghost btn-sm" onClick={() => { if (window.confirm(`Â¿Eliminar la ficha de ${pet.name}?`)) deletePet(pet.id) }} type="button">Eliminar</button></article>)}</div></section>}
    {section === 'solicitudes' && <section className={styles.card}><p className={styles.hint}>Mueve cada solicitud de etapa con el selector o usa las teclas del teclado.</p><div className={styles.board}>{boardStages.map((stage) => <div className={styles.column} key={stage.value}><h2>{stage.label}<span>{ownRequests.filter((item) => item.stage === stage.value).length}</span></h2>{ownRequests.filter((item) => item.stage === stage.value).map((item) => <button type="button" className={`${styles.requestCard} ${selectedRequest?.id === item.id ? styles.activeRequest : ''}`} key={item.id} onClick={() => setSelectedRequest(item)}><strong>{item.applicant?.name}</strong><span>{item.petId} Â· {item.id}</span><small>{item.compatibility || 'â€”'}% afinidad</small><select aria-label={`Etapa de ${item.applicant?.name}`} value={item.stage} onClick={(event) => event.stopPropagation()} onChange={(event) => advanceRequest(item, event.target.value)}>{boardStages.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}<option value="no-seleccionada">No seleccionada</option></select></button>)}</div>)}</div>{selectedRequest && <RequestDetails item={selectedRequest} pets={pets} chat={chat} setChat={setChat} sendChat={sendChat} note={note} setNote={setNote} saveNote={saveNote} onMove={advanceRequest}/>}</section>}
    {section === 'campanas' && <section className={styles.card}>{campaignForm && <CampaignEditor value={campaignForm} setValue={setCampaignForm} onSubmit={saveCampaign} onClose={() => setCampaignForm(null)}/>}<div className={styles.petList}>{ownCampaigns.map((campaign) => <article className={styles.petRow} key={campaign.id}><img src={campaign.photo} alt=""/><div><strong>{campaign.title}</strong><span>{campaign.status} Â· {formatCOP(campaign.raised)} recaudados</span><small>Meta: {formatCOP(campaignGoalLocal(campaign))}</small></div><button className="btn btn-secondary btn-sm" onClick={() => setCampaignForm({ ...campaign, expenses: campaign.expenses?.length ? campaign.expenses.map((expense) => ({ ...expense })) : [{ concept: '', amount: '' }] })} type="button">Editar</button><button className="btn btn-ghost btn-sm" onClick={() => updateCampaign(campaign.id, { status: campaign.status === 'Activa' ? 'Pausada' : 'Activa' })} type="button">{campaign.status === 'Activa' ? 'Pausar' : 'Reactivar'}</button><button className="btn btn-ghost btn-sm" onClick={() => { if (window.confirm('Â¿Eliminar esta campaÃ±a?')) deleteCampaign(campaign.id) }} type="button">Eliminar</button></article>)}</div></section>}
    {section === 'donaciones' && <section className={styles.card}><div className={styles.tableWrap}><table><thead><tr><th>Fecha</th><th>Donante</th><th>CampaÃ±a</th><th>Monto</th><th>Estado</th></tr></thead><tbody>{ownDonations.map((item) => <tr key={item.id}><td>{new Date(item.date).toLocaleDateString('es-CO')}</td><td>{item.anonymous ? 'AnÃ³nimo' : item.donorName || 'Donante'}</td><td>{campaigns.find((campaign) => campaign.id === item.campaignId)?.title}</td><td>{formatCOP(item.amount)}</td><td>{item.status}</td></tr>)}</tbody></table>{!ownDonations.length && <Empty text="Cuando recibas aportes para tus campaÃ±as, aparecerÃ¡n aquÃ­."/>}</div></section>}
    {section === 'reportes' && <section className={styles.reportList}>{ownReports.map((report) => { const relation = report.notified.find((item) => item.foundationId === user.foundationId); return <article className={styles.card} key={report.id}><span className={styles.pill}>{report.urgency} Â· {report.species}</span><h2>{report.type} Â· {report.address}</h2><p>{report.description}</p><small>{report.id} Â· {new Date(report.createdAt).toLocaleString('es-CO')} Â· {relation?.distance}</small>{report.status === 'notificado' && <button type="button" className="btn btn-primary btn-sm" onClick={() => { updateReport(report.id, { status: 'en-camino', notified: report.notified.map((item) => item.foundationId === user.foundationId ? { ...item, status: 'tomado' } : item) }); showToast('Tomaste el caso. Se notificÃ³ a quien lo reportÃ³.', { tone: 'success' }) }}>Tomar el caso</button>}{report.status === 'en-camino' && <button type="button" className="btn btn-secondary btn-sm" onClick={() => updateReport(report.id, { status: 'resuelto' })}>Marcar resuelto</button>}</article>})}{!ownReports.length && <Empty text="No hay reportes cercanos asignados por ahora."/>}</section>}
    {section === 'mensajes' && <section className={styles.card}>{ownRequests.filter((item) => item.messages?.length).map((item) => <div className={styles.messageRow} key={item.id}><div><strong>{item.applicant?.name} Â· {item.petId}</strong>{item.messages.slice(-2).map((message) => <p key={message.id}>{message.author}: {message.text}</p>)}</div><button className="btn btn-secondary btn-sm" onClick={() => { setSelectedRequest(item); navigate('/fundacion/solicitudes') }} type="button">Responder</button></div>)}{!ownRequests.some((item) => item.messages?.length) && <Empty text="Tus conversaciones con adoptantes aparecerÃ¡n aquÃ­."/>}</section>}
    {section === 'equipo' && <TeamPanel team={team} setTeam={(next) => { setTeam(next); updateUser({ team: next }) }} showToast={showToast}/>}
    {section === 'documentos' && <DocumentsPanel user={user} updateUser={updateUser} showToast={showToast}/>}
  </div>
}

function Metric({ label, value, icon }) { return <article className={styles.metric}><Icon name={icon}/><strong>{value}</strong><span>{label}</span></article> }
function Empty({ text }) { return <div className="empty-state"><Icon name="inbox"/><h3>Sin registros todavÃ­a</h3><p>{text}</p></div> }
function PetEditor({ value, setValue, onSubmit, onClose }) {
  const patch = (key, next) => setValue((current) => ({ ...current, [key]: next }))
  return <form className={styles.editor} onSubmit={onSubmit}><div className={styles.sectionHead}><h2>{value.id ? 'Editar ficha' : 'Nueva mascota'}</h2><button className="btn btn-ghost btn-sm" type="button" onClick={onClose}>Cerrar</button></div><div className="form-row"><Field label="Nombre" htmlFor="pet-name"><input id="pet-name" className="input" required value={value.name} onChange={(event) => patch('name', event.target.value)}/></Field><Field label="Ciudad" htmlFor="pet-city"><input id="pet-city" className="input" required value={value.city} onChange={(event) => patch('city', event.target.value)}/></Field></div><div className="form-row"><Field label="Especie" htmlFor="pet-species"><SelectInput id="pet-species" value={value.species} onChange={(event) => patch('species', event.target.value)}>{species.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field><Field label="TamaÃ±o" htmlFor="pet-size"><SelectInput id="pet-size" value={value.size} onChange={(event) => patch('size', event.target.value)}>{sizes.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field><Field label="Estado" htmlFor="pet-status"><SelectInput id="pet-status" value={value.status} onChange={(event) => patch('status', event.target.value)}>{petStatuses.map((item) => <option key={item}>{item}</option>)}</SelectInput></Field></div><Field label="Edad en meses" htmlFor="pet-age"><input id="pet-age" className="input" type="number" min="1" value={value.ageMonths} onChange={(event) => patch('ageMonths', event.target.value)}/></Field><Field label="Historia de la mascota" htmlFor="pet-story"><textarea id="pet-story" className="textarea" value={value.story?.[0] || ''} onChange={(event) => patch('story', [event.target.value])}/></Field><Field label="Foto principal" htmlFor="pet-photo"><FileDropzone multiple={false} title="Subir foto principal" onFiles={(files) => patch('photo', files[0]?.url || '')}/>{value.photo && <img className={styles.preview} src={value.photo} alt="Vista previa de la mascota"/>}<input id="pet-photo" type="url" className="input" placeholder="o pega una URL de imagen" value={value.photo} onChange={(event) => patch('photo', event.target.value)}/></Field><fieldset className={styles.checks}><legend>Salud y convivencia</legend>{Object.entries({ vaccinated: 'Vacunada', dewormed: 'Desparasitada', sterilized: 'Esterilizada', goodWithKids: 'Convive con niÃ±os', goodWithDogs: 'Convive con perros', goodWithCats: 'Convive con gatos' }).map(([key, label]) => <label key={key}><input type="checkbox" checked={Boolean(value[key] ?? value.health?.[key])} onChange={(event) => key in value.health ? patch('health', { ...value.health, [key]: event.target.checked }) : patch(key, event.target.checked)}/>{label}</label>)}</fieldset><div className={styles.previewCard}><strong>Vista previa</strong><span>{value.name || 'Nombre'} Â· {value.species} Â· {value.city || 'Ciudad'}</span><span>{value.status}</span></div><button className="btn btn-primary" type="submit">{value.id ? 'Guardar cambios' : 'Publicar mascota'}</button></form>
}
function CampaignEditor({ value, setValue, onSubmit, onClose }) {
  const patch = (key, next) => setValue((current) => ({ ...current, [key]: next }))
  const expense = value.expenses[0]
  return <form className={styles.editor} onSubmit={onSubmit}><div className={styles.sectionHead}><h2>{value.id ? 'Editar campaÃ±a' : 'Nueva campaÃ±a'}</h2><button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>Cerrar</button></div><Field label="Nombre de campaÃ±a" htmlFor="campaign-title"><input id="campaign-title" className="input" required value={value.title} onChange={(event) => patch('title', event.target.value)}/></Field><Field label="CategorÃ­a" htmlFor="campaign-category"><SelectInput id="campaign-category" value={value.category} onChange={(event) => patch('category', event.target.value)}>{campaignCategories.map((item) => <option key={item.value}>{item.value}</option>)}</SelectInput></Field><Field label="DescripciÃ³n y propÃ³sito" htmlFor="campaign-summary"><textarea id="campaign-summary" required className="textarea" value={value.summary} onChange={(event) => patch('summary', event.target.value)}/></Field><div className="form-row"><Field label="Concepto del gasto" htmlFor="campaign-expense"><input id="campaign-expense" className="input" required value={expense.concept} onChange={(event) => patch('expenses', [{ ...expense, concept: event.target.value }, ...value.expenses.slice(1)])}/></Field><Field label="Monto" htmlFor="campaign-amount"><input id="campaign-amount" className="input" type="number" min="1" required value={expense.amount} onChange={(event) => patch('expenses', [{ ...expense, amount: event.target.value }, ...value.expenses.slice(1)])}/></Field></div><Field label="Imagen de campaÃ±a" htmlFor="campaign-photo"><FileDropzone multiple={false} title="Subir imagen" onFiles={(files) => patch('photo', files[0]?.url || '')}/>{value.photo && <img className={styles.preview} src={value.photo} alt="Vista previa de la campaÃ±a"/>}<input id="campaign-photo" className="input" placeholder="o pega una URL de imagen" value={value.photo} onChange={(event) => patch('photo', event.target.value)}/></Field><label className="checkbox"><input type="checkbox" checked={value.urgent} onChange={(event) => patch('urgent', event.target.checked)}/>Marcar como campaÃ±a urgente</label><div className={styles.previewCard}><strong>Vista previa pÃºblica</strong><span>{value.title || 'Nombre de campaÃ±a'} Â· {value.category}</span><span>Meta: {formatCOP(Number(expense.amount))}</span></div><button className="btn btn-primary" type="submit">{value.id ? 'Guardar campaÃ±a' : 'Crear campaÃ±a'}</button></form>
}
function RequestDetails({ item, pets, chat, setChat, sendChat, note, setNote, saveNote, onMove }) {
  const [showDetails, setShowDetails] = useState(false)
  const pet = pets.find((entry) => entry.id === item.petId)
  return <div className={styles.details}><div className={styles.sectionHead}><h2>{item.applicant?.name} Â· {pet?.name || item.petId}</h2><button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowDetails((open) => !open)}>{showDetails ? 'Ocultar ficha' : 'Ver ficha completa'}</button></div><p>{item.applicant?.city} Â· Afinidad {item.compatibility ?? 'â€”'}%</p>{showDetails && <div className={styles.answerGrid}>{Object.entries(item.answers || {}).filter(([, value]) => typeof value !== 'object' && value !== '').map(([key, value]) => <p key={key}><strong>{key}:</strong> {String(value)}</p>)}</div>}<div className={styles.chatLog}>{(item.messages || []).map((message) => <p className={message.from === 'foundation' ? styles.outgoing : ''} key={message.id}><strong>{message.author}:</strong> {message.text}</p>)}</div><form className={styles.inlineForm} onSubmit={sendChat}><input className="input" placeholder="Escribe un mensaje al adoptante" value={chat} onChange={(event) => setChat(event.target.value)}/><button className="btn btn-primary" type="submit">Enviar</button></form><form className={styles.inlineForm} onSubmit={saveNote}><input className="input" placeholder="AÃ±adir nota privada" value={note} onChange={(event) => setNote(event.target.value)}/><button className="btn btn-secondary" type="submit">Guardar nota</button></form><div className={styles.decisionActions}><button className="btn btn-secondary" type="button" onClick={() => onMove(item, 'entrevista')}>Agendar entrevista</button><button className="btn btn-primary" type="button" onClick={() => onMove(item, 'aprobada')}>Aprobar solicitud</button><button className="btn btn-ghost" type="button" onClick={() => onMove(item, 'no-seleccionada')}>No seleccionar</button></div></div>
}
function TeamPanel({ team, setTeam, showToast }) { const [name, setName] = useState(''); return <section className={styles.card}><h2>Personas con acceso</h2>{team.map((member, index) => <div className={styles.teamRow} key={`${member.email}-${index}`}><span><strong>{member.name}</strong><small>{member.email} Â· {member.role}</small></span><button className="btn btn-ghost btn-sm" type="button" onClick={() => setTeam(team.filter((_, item) => item !== index))}>Quitar</button></div>)}<form className={styles.inlineForm} onSubmit={(event) => { event.preventDefault(); if (!name.trim()) return; setTeam([...team, { name: name.trim(), email: `${name.toLowerCase().replace(/\s/g, '.')}@equipo.org`, role: 'Voluntaria' }]); setName(''); showToast('Agregamos a la persona al equipo.') }}><input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Nombre de la persona"/><button className="btn btn-primary">Agregar miembro</button></form><p className={styles.hint}>En esta demo, los miembros son registros locales; no se envÃ­an invitaciones por correo.</p></section> }
function DocumentsPanel({ user, updateUser, showToast }) { const [docs, setDocs] = useState(user.documents || [{ name: 'RUT fundaciÃ³n.pdf', status: 'Verificado' }, { name: 'Certificado de existencia.pdf', status: 'Verificado' }]); return <section className={styles.card}><h2>Documentos de la fundaciÃ³n</h2><p className={styles.hint}>Carga documentos de verificaciÃ³n y revisa su estado.</p><FileDropzone accept=".pdf,image/*" title="Subir documento" onFiles={(files) => { const next = [...docs, ...files.map((file) => ({ name: file.name, status: 'Pendiente de revisiÃ³n' }))]; setDocs(next); updateUser({ documents: next }); showToast('Documento agregado. Queda pendiente de revisiÃ³n.') }}/>{docs.map((doc) => <div className={styles.teamRow} key={doc.name}><span><strong>{doc.name}</strong><small>{doc.status}</small></span><Icon name={doc.status === 'Verificado' ? 'check-circle' : 'clock'}/></div>)}</section> }
function campaignGoalLocal(campaign) { return (campaign.expenses || []).reduce((sum, item) => sum + Number(item.amount || 0), 0) }
