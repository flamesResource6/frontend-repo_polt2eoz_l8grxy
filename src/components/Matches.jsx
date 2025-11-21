import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../utils/api'

export default function Matches({ tournament }) {
  const [matches, setMatches] = useState([])
  const [form, setForm] = useState({ round_name: 'Qualifiers', map_name: 'Bermuda' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!tournament) return
    apiGet(`/api/tournaments/${tournament.share_code}/matches`).then(setMatches)
  }, [tournament])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const createMatch = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiPost(`/api/tournaments/${tournament.share_code}/matches`, form)
      const list = await apiGet(`/api/tournaments/${tournament.share_code}/matches`)
      setMatches(list)
      setForm({ round_name: 'Qualifiers', map_name: 'Bermuda' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 md:p-6">
      <h3 className="text-white font-semibold mb-3">Matches</h3>
      <form onSubmit={createMatch} className="grid md:grid-cols-3 gap-3">
        <input name="round_name" value={form.round_name} onChange={handleChange} className="rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" />
        <input name="map_name" value={form.map_name} onChange={handleChange} className="rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" />
        <button disabled={loading} className="rounded-lg bg-indigo-500 text-white font-semibold py-2 hover:bg-indigo-400">{loading ? 'Adding...' : 'Add Match'}</button>
      </form>

      <div className="mt-4 grid gap-2">
        {matches.map(m => (
          <div key={m.id} className="rounded-lg border border-white/10 bg-zinc-800 p-3 text-white flex items-center justify-between">
            <div>
              <div className="font-medium">{m.round_name}</div>
              <div className="text-zinc-400 text-sm">{m.map_name} • {m.status}</div>
            </div>
            {m.room_id && <div className="text-xs text-zinc-300">Room: {m.room_id}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
