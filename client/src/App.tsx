import { useState } from "react";
import {
  AudioLines,
  Home,
  Search,
  Heart,
  Library,
  Plus,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  MoreHorizontal,
} from "lucide-react"
import { article } from "framer-motion/client";

type Track = {
  id: Number,
  title: string,
  artist: string,
  cover: string,
  category: string
}

const tracks: Track[] = [
  {
    id: 1,
    title: 'Midnight city',
    artist: 'suraj chandel',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500',
    category: 'Electronic',
  },

  {
    id: 2,
    title: 'Parple skies',
    artist: 'Luna waves',
    cover: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500',
    category: 'chill',
  },

  {
    id: 3,
    title: 'Lost in Sounds',
    artist: 'Neon Dreams',
    cover: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500',
    category: 'pop',
  },

  {
    id: 4,
    title: 'After Hours',
    artist: 'Velvet Echo',
    cover: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=500',
    category: 'ambient',
  },
]

function App() {
  const [currenttrack, setcurrenttrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState('');
  const [favorties, setfavorties] = useState<number[]>([]);

  const filtertracks = tracks.filter((tracks) =>
    `${tracks.title} ${tracks.artist} ${tracks.category}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  function playtrack(track: Track) {
    setcurrenttrack(track)
    setIsPlaying(true)
  }

  function nextTrack() {
    const index = tracks.findIndex(
      (track) => track.id === currenttrack.id
    )
    setcurrenttrack(tracks[(index + 1) % tracks.length]),
      setIsPlaying(true)
  }

  function priviousTrack() {
    const index = tracks.findIndex(
      (track) => track.id === currenttrack.id
    )
    setcurrenttrack(
      tracks[(index - 1 + tracks.length) % tracks.length]
    )
    setIsPlaying(true)
  }

  function toggleFavorite(id: number) {
    setfavorties((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    )
  }
  return (
    <div className="min-h-screen bg-[09090f] text-white">
      <div className="flex min-h-screen">
        {/* slider */}
        <aside className="hidden w-60 shrink-0 border-r border-white/10 bg-[#0d0c15] p-6 md:flex md:flex-col">
          <div className="mb-10 flex items-center gap-3">
            <div className="rounded-xl bg-violet-60 p-2">
              <AudioLines size={25} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              On<span className="text-violet-400">Fire</span>
            </span>
          </div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Menu
          </p>
          <nav className="space-y-2">
            <button className="flex w-full items-center gap-3 rounded-xl bg-violet-500/15 px-4 py-3 text-left text-violet-300">
              <Home size={19} />
              Home
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl bg-violet-500/15 px-4 py-3 text-left text-violet-300">
              <Search size={19} />
              Discover</button>
            <button className="flex w-full items-center gap-3 rounded-xl bg-violet-500/15 px-4 py-3 text-left text-violet-300">
              <Library size={19} />
              Your Library
            </button>
            <button className="flex w-full items-center gap-3 rounded-xl bg-violet-500/15 px-4 py-3 text-left text-violet-300">
              <Heart size={19} />
              Favoritesd
              <span className="ml-auto text-xs">
                {favorties.length}
              </span>
            </button>
          </nav>
          <div className="mb-4 mt-10 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Playlist
            </p>
            <button
              aria-label="Add playlist"
              className="text-gray-400 hover:text-white">
              <Plus size={19} />
            </button>
          </div>
          <div className="space-y-4 text-sm text-gray-400">
            <p className=" cursor-pointer hover:text-white">
              Late Night Vibes
            </p>
            <p className="cursor-pointer hover:text-white">
              Foucs Mode
            </p>
            <p className="cursor-pointer hover:text-white">
              Weekend Energy
            </p>
          </div>

          <div className="mt-auto rounded-2xl border border-violet-400/20 bg-violet-500/10 p-4">
            <AudioLines className="mb-3 text-violet-400 " size={24} />
            <p className="font-semibold">Your sound. Your world</p>
            <p className="text-sm mt-2 leading-5 text-gray-500">Discover your favorite track</p>
          </div>
        </aside>
        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 pb-36 pt-6 md:px-10 md:pt-9">
          <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-violet-300">
                YOUR MUSIC, YOUR MOOD
              </p>
              <h1 className="mt-2 text-3xl font-black md:text-4xl">
                Find your rhythm.
              </h1>
              <p className="mt-2 text-sm text-violet-400">
                A little music can change everything.
              </p>
            </div>
            <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:w-72">
              <Search size={18} className="shrink-0 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search song or artists..."
                aria-label="Search song or artists"
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
              />
            </div>
          </header>

          {/* Featured section */}
          <section className=" relative mb-10 overflow-hidden rounded-3xl border border-violet-300/15 bg-linear-to-br from-[#33205d] to-[#1111b] p-6 md:p-9">
            <div className="relative z-10 max-w-lg">
              <span className=" rounded-full border border-violet-300/30 bg-violet-300/10 px-3 py-1 text-xs text-violet-200">
                FEATURED MIX
              </span>
              <h2 className="mt-5 font-bold text-3xl md:text-4xl">
                Escape the ordinary.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-gray-300">
                Discover sounds that much your mood, from
                peaceful night to energetic mornings.
              </p>
              <button
                onChange={() => playtrack(tracks[0])}
                className="mt-6 flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-violet-180">
                <Play size={18} fill="currentColor" />
                Start listening
              </button>
            </div>

            <div className=" pointer-events-none absolute -right-12 -top-20 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"/>
          </section>

          {/* song grid */}
          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-sm text-violet-300">MADE FOR YOU</p>
                <h2 className="mt-1 text-2xl font-bold "> Discober music</h2>
              </div>
              <span className="text-sm text-gray-500">
                {filtertracks.length} tracks
              </span>
            </div>
            {filtertracks.length === 0 ? ( 
              <div className=" rounded-2xl border border-white/10 p-8 text-center text-gray-500">
                No tracks found. Try another search.
              </div>
            ) : (
              <div className=" grid grid-cols-2 gap-4 lg:grid-cols-4">
                {filtertracks.map((track) => (
                  <article
                  key={track.id}
                  className=" group min-w-0 rounded-2xl border border-white/[0.06] bg-white/[0.25] p-3 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.5]  "
                  ></article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App