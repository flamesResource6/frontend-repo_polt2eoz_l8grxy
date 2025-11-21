import { useEffect, useState } from 'react'
import { apiGet } from '../utils/api'
import { Share2, Users, Calendar } from 'lucide-react'

export default function TournamentList({ onSelect, onShare }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    apiGet('/api/tournaments').then(data => {
      if (mounted) setItems(data)
    }).finally(() => mounted && setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="text-zinc-400">Loading tournaments...</div>

  if (!items.length) return <div className="text-zinc-400">No tournaments yet. Create one above.</div>

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map(t => (
        <div key={t.id} className="rounded-xl border border-white/10 bg-zinc-900/60 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-white font-semibold">{t.title}</h3>
              <p className="text-zinc-400 text-sm line-clamp-2">{t.description}</p>
              <div className="mt-2 flex items-center gap-4 text-xs text-zinc-400">
                <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" /> {t.mode}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.status}</span>
                {t.prize_pool && <span>Prize: {t.prize_pool}</span>}
              </div>
            </div>
            <button onClick={() => onShare(t)} className="shrink-0 rounded-md border border-white/10 px-2 py-1 text-xs text-white hover:bg-zinc-800 inline-flex items-center gap-1"><Share2 className="w-3 h-3" /> Share</button>
          </div>

          <div className="mt-3 flex gap-2">
            <button onClick={() => onSelect(t)} className="rounded-md bg-amber-500 text-black text-sm px-3 py-1 font-semibold hover:bg-amber-400">Open</button>
            <a href={`/?t=${t.share_code}`} className="rounded-md bg-zinc-800 text-white text-sm px-3 py-1 border border-white/10 hover:bg-zinc-700">Public Page</a>
          </div>
        </div>
      ))}
    </div>
  )
}
