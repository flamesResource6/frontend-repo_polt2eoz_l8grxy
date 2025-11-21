import { useEffect, useMemo, useRef, useState } from 'react'
import Hero from './components/Hero'
import TournamentForm from './components/TournamentForm'
import TournamentList from './components/TournamentList'
import ParticipantRegister from './components/ParticipantRegister'
import Matches from './components/Matches'
import { apiGet } from './utils/api'

function App() {
  const [selected, setSelected] = useState(null)
  const [shareInfo, setShareInfo] = useState(null)
  const shareRef = useRef(null)

  // Load tournament by share code if provided in URL (public page)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('t')
    if (code) {
      apiGet(`/api/share/${code}`).then(setSelected).catch(() => {})
    }
  }, [])

  const onCreated = async (t) => {
    setSelected(t)
  }

  const onShareClick = async () => {
    try {
      if (!selected) return alert('Open a tournament first or create one.')
      const info = await apiGet(`/api/tournaments/${selected.id || selected.share_code}/share`)
      setShareInfo(info)
      await navigator.clipboard.writeText(info.share_url)
      alert('Share link copied to clipboard!')
    } catch (e) {
      alert('Unable to get share link')
    }
  }

  const copySite = async () => {
    const url = window.location.origin
    await navigator.clipboard.writeText(url)
    alert('Website URL copied!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        <Hero onCreateClick={() => shareRef.current?.scrollIntoView({ behavior: 'smooth' })} onShareClick={copySite} />

        <div ref={shareRef} className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TournamentForm onCreated={onCreated} />
            {selected && (
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 md:p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{selected.title}</h2>
                    <p className="text-zinc-300">Mode: {selected.mode} • Status: {selected.status}</p>
                  </div>
                  {selected.share_code && (
                    <button onClick={async () => {
                      const url = `${window.location.origin}/?t=${selected.share_code}`
                      await navigator.clipboard.writeText(url)
                      alert('Public page copied!')
                    }} className="rounded-md bg-zinc-800 border border-white/10 px-3 py-1 text-sm">Copy Public Link</button>
                  )}
                </div>
                <div className="mt-4 grid md:grid-cols-2 gap-4">
                  <ParticipantRegister tournament={selected} />
                  <Matches tournament={selected} />
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4 md:p-6">
              <h3 className="font-semibold mb-2">Explore tournaments</h3>
              <TournamentList onSelect={setSelected} onShare={(t) => setSelected(t)} />
            </div>
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
              <h4 className="font-semibold mb-2">Share website</h4>
              <p className="text-zinc-400 text-sm">Copy your website URL and share with players.</p>
              <button onClick={copySite} className="mt-2 w-full rounded-lg bg-indigo-500 hover:bg-indigo-400 py-2">Copy Website URL</button>
            </div>
          </div>
        </div>

        <footer className="text-center text-zinc-500 text-sm py-6">Built for Free Fire Max communities</footer>
      </div>
    </div>
  )
}

export default App
