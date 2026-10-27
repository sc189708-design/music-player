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
              Vibe<span className="text-violet-400">Flow</span>
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
        </aside>
      </div>
    </div>
  )
}

export default App