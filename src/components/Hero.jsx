import { Share2, Trophy, Users, PlusCircle } from 'lucide-react'

export default function Hero({ onCreateClick, onShareClick }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 md:p-12">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(700px_200px_at_0%_0%,rgba(59,130,246,0.15),transparent),radial-gradient(400px_160px_at_100%_100%,rgba(234,179,8,0.15),transparent)]" />

      <div className="relative grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-3 text-amber-400">
            <Trophy className="w-6 h-6" />
            <span className="uppercase tracking-widest text-xs">Free Fire Max</span>
          </div>
          <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Host and join epic tournaments
          </h1>
          <p className="mt-4 text-zinc-300">
            Create brackets, register squads, schedule matches and share your tournament with a single link.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={onCreateClick} className="inline-flex items-center gap-2 rounded-lg bg-amber-500 text-black font-semibold px-4 py-2 hover:bg-amber-400 transition">
              <PlusCircle className="w-5 h-5" /> Create Tournament
            </button>
            <button onClick={onShareClick} className="inline-flex items-center gap-2 rounded-lg bg-zinc-800 text-white px-4 py-2 border border-white/10 hover:bg-zinc-700 transition">
              <Share2 className="w-5 h-5" /> Share Website
            </button>
          </div>

          <div className="mt-6 flex items-center gap-6 text-zinc-400">
            <div className="flex items-center gap-2"><Users className="w-4 h-4" /><span>Team signups</span></div>
            <div className="flex items-center gap-2"><Trophy className="w-4 h-4" /><span>Prize pools</span></div>
          </div>
        </div>
        <div className="relative">
          <img src="/freefire-hero.jpg" alt="Free Fire" className="w-full rounded-xl border border-white/10 shadow-2xl" />
          <div className="absolute -bottom-3 -right-3 bg-amber-500 text-black font-bold px-3 py-1 rounded-md text-sm">Tournament Hub</div>
        </div>
      </div>
    </div>
  )
}
