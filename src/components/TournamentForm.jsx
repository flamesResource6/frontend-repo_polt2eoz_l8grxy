import { useState } from 'react'
import { apiPost } from '../utils/api'

const modes = ['Solo','Duo','Squad']

export default function TournamentForm({ onCreated }) {
  const [form, setForm] = useState({ title: '', description: '', mode: 'Squad', prize_pool: '', entry_fee: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const created = await apiPost('/api/tournaments', form)
      onCreated(created)
      setForm({ title: '', description: '', mode: 'Squad', prize_pool: '', entry_fee: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-zinc-900/60 border border-white/10 rounded-xl p-4 md:p-6 space-y-3">
      <div>
        <label className="block text-sm text-zinc-300 mb-1">Title</label>
        <input name="title" value={form.title} onChange={handleChange} required className="w-full rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" placeholder="Free Fire Max Showdown" />
      </div>
      <div>
        <label className="block text-sm text-zinc-300 mb-1">Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" placeholder="Rules, format, streaming info..." />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Mode</label>
          <select name="mode" value={form.mode} onChange={handleChange} className="w-full rounded-lg bg-zinc-800 border border-white/10 p-2 text-white">
            {modes.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Prize Pool</label>
          <input name="prize_pool" value={form.prize_pool} onChange={handleChange} className="w-full rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" placeholder="$100" />
        </div>
        <div>
          <label className="block text-sm text-zinc-300 mb-1">Entry Fee</label>
          <input name="entry_fee" value={form.entry_fee} onChange={handleChange} className="w-full rounded-lg bg-zinc-800 border border-white/10 p-2 text-white" placeholder="Free / $5" />
        </div>
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}

      <button disabled={loading} className="w-full rounded-lg bg-amber-500 text-black font-semibold py-2 hover:bg-amber-400 disabled:opacity-60">
        {loading ? 'Creating...' : 'Create Tournament'}
      </button>
    </form>
  )
}
