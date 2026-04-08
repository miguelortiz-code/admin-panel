import { Toaster } from 'sonner'
import { LoginPage } from './pages/Login'

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
      />
      <LoginPage />
    </>
  )
}