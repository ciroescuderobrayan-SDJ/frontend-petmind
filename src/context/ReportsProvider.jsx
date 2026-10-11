import { ReportsContext } from './ReportsContext'
import { initialReports } from '../data/reports'
import { usePersistentState } from '../hooks/usePersistentState'

export function ReportsProvider({ children }) {
  const [reports, setReports] = usePersistentState('reports', initialReports)

  function getReportById(id) {
    return reports.find((report) => report.id === id)
  }

  function addReport(data) {
    const report = {
      status: 'notificado',
      ...data,
      id: `RP-${Math.floor(40510 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
    }
    setReports((prev) => [report, ...prev])
    return report
  }

  function updateReport(id, changes) {
    setReports((prev) => prev.map((report) => (report.id === id ? { ...report, ...changes } : report)))
  }

  const value = { reports, getReportById, addReport, updateReport }

  return <ReportsContext.Provider value={value}>{children}</ReportsContext.Provider>
}
