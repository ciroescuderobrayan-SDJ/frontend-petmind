import { ThemeProvider } from './context/ThemeProvider'
import AppRoutes from './routes/routes'

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
