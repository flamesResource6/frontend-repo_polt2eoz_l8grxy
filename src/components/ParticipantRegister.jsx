import { useState, useEffect } from 'react'
import { apiGet, apiPost } from '../utils/api'

export default function ParticipantRegister({ tournament }) {
  const [form, setForm] = useState({ name: '', ign: '', team_name: '', contact_email: '' })
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!tournament) return
    apiGet(`/api/tournaments/${tournament.share_code}/participants`).then(setParticipants)
  }, [tournament])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await apiPost(`/api/tournaments/${tournament.share_code}/register`, form)
      const list = await apiGet(`/api/tournaments/${tournament.share_code}/participants`)
      setParticipants(list)
      setForm({ name: '', ign: '', team_name: '', contact_email: '' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-4 md:p-6">
      <h3 className="text-white font-semibold mb-3">Register Team/Player</h3>
      <form onSubmit={submit} className="grid md:grid-cols-2 gap-3">
        <input required name="name" value={form.name} onChange={handleChange} placeholder="Manager/Player Name" className="rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" />
        <input name="team_name" value={form.team_name} onChange={handleChange} placeholder="Team Name (optional)" className="rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" />
        <input name="ign" value={form.ign} onChange={handleChange} placeholder="IGN (optional)" className="rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" />
        <input type="email" name="contact_email" value={form.contact_email} onChange={handleChange} placeholder="Email (optional)" className="rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" />
        <button disabled={loading} className="md:col-span-2 rounded-lg bg-emerald-500 text-black font-semibold py-2 hover:bg-emerald-400">{loading ? 'Submitting...' : 'Register'}</button>
      </form>

      <div className="mt-4">
        <h4 className="text-zinc-300 mb-2">Participants ({participants.length})</h4>
        <div className="grid sm:grid-cols-2 gap-2">
          {participants.map(p => (
            <div key={p.id} className="rounded-lg border border-white/10 bg-zinc-800 p-2 text-sm text-white">
              <div className="font-medium">{p.team_name || p.name}</div>
              <div className="text-zinc-400">{p.ign || 'IGN N/A'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
