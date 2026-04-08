import { Spinner } from '../../../components/atoms/Spiner/Spinner'

export function FullscreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Spinner />
    </div>
  )
}