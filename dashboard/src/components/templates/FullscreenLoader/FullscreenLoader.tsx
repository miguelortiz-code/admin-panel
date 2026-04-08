import { Spinner } from '../../atoms/Spinner'

export function FullscreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Spinner size="lg" />
    </div>
  )
}