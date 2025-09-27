import React, { useState, useMemo } from "react";

export default function Ephora() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [showContact, setShowContact] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const posts = [
    { id: 1, title: "Encrypted Whispers", excerpt: "Notes that slip between shadows, decoded in silence.", category: "Philosophy", date: "2025-09-12" },
    { id: 2, title: "Agents of Ritual", excerpt: "Covert meaning hidden in repeated codes.", category: "Spiritual", date: "2025-08-03" },
    { id: 3, title: "The Network of Thought", excerpt: "Ideas infiltrating systems like intelligence operations.", category: "Social & Politics", date: "2024-12-21" },
    { id: 4, title: "Operation Silence", excerpt: "The art of listening where nothing is said.", category: "Philosophy", date: "2023-05-10" },
    { id: 5, title: "Archived File #05", excerpt: "A recovered fragment hidden in old records.", category: "History", date: "2022-01-05" },
  ];

  const categories = ["All", ...new Set(posts.map((p) => p.category))];

  const filtered = useMemo(() => {
    return posts
      .filter((p) => category === "All" || p.category === category)
      .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [posts, category, query]);

  const archive = useMemo(() => {
    const map = {};
    posts.forEach((p) => {
      const year = new Date(p.date).getFullYear();
      if (!map[year]) map[year] = [];
      map[year].push(p);
    });
    const years = Object.keys(map).sort((a, b) => b - a);
    return { map, years };
  }, [posts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#020202] text-gray-200 font-mono">
      <style>{`
        .neon-blue { text-shadow: 0 0 8px rgba(0,255,255,0.8), 0 0 22px rgba(0,255,255,0.4); }
        .glow-outline { box-shadow: 0 0 18px rgba(0,255,255,0.12), inset 0 0 30px rgba(0,255,255,0.05); }
        .neon-border { border: 1px solid rgba(0,255,255,0.25); }
        input::placeholder { color: rgba(180,255,255,0.3); }
      `}</style>

      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between border-b neon-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#021820] flex items-center justify-center neon-border glow-outline">
            <div className="w-6 h-6 rounded-full bg-cyan-400 animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold neon-blue tracking-widest uppercase">Ephora</h1>
            <p className="text-sm text-cyan-300/60">Codename: Midnight Archive</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#home" className="hover:underline text-cyan-300/80 uppercase text-xs">Home</a>
          <a href="#archive" className="hover:underline text-cyan-300/80 uppercase text-xs">Archive</a>
          <a href="#categories" className="hover:underline text-cyan-300/80 uppercase text-xs">Categories</a>
          <button onClick={() => setShowDisclaimer(true)} className="text-xs px-3 py-1 rounded neon-border hover:bg-cyan-400/10 uppercase tracking-wide">Disclaimer</button>
          <button onClick={() => setShowContact(true)} className="bg-cyan-700 px-3 py-1 rounded text-xs hover:opacity-90 uppercase tracking-wide">Contact</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <section id="home" className="md:col-span-2">
          <div className="rounded-xl p-8 neon-border glow-outline bg-[#01050a]">
            <h2 className="text-3xl font-bold neon-blue uppercase tracking-wide">Mission Briefing</h2>
            <p className="mt-2 text-cyan-200/70">Encrypted notes and classified files stored in Ephora’s vault.</p>

            <div className="mt-6 flex gap-3 items-center">
              <input
                placeholder="Search dossier..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 rounded-lg px-4 py-2 bg-[#010306] neon-border outline-none focus:ring-2 focus:ring-cyan-400/30"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg px-3 py-2 bg-[#010306] neon-border"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="mt-6 space-y-4">
              {filtered.length === 0 ? (
                <div className="text-cyan-300/50 italic">No files found. Adjust filters.</div>
              ) : (
                filtered.map((p) => (
                  <article key={p.id} className="p-4 rounded-lg bg-[#000]/50 neon-border hover:scale-[1.01] transition-transform">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold neon-blue uppercase">{p.title}</h3>
                        <p className="text-sm text-cyan-200/70 mt-1">{p.excerpt}</p>
                      </div>
                      <div className="text-right text-xs text-cyan-400/70">
                        <div>{p.category}</div>
                        <div className="mt-1">{p.date}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="text-xs px-3 py-1 border neon-border rounded uppercase">Open</button>
                      <button className="text-xs px-3 py-1 bg-cyan-700 rounded uppercase">Transmit</button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-xl p-4 neon-border bg-[#010306]">
            <h5 className="font-semibold neon-blue uppercase tracking-wide">Categories</h5>
            <div id="categories" className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1 rounded-full text-xs uppercase tracking-wide ${category === c ? "bg-cyan-700" : "bg-[#021015]/60"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4 neon-border bg-[#010306]">
            <h5 className="font-semibold neon-blue uppercase tracking-wide">Archive</h5>
            <div id="archive" className="mt-3 space-y-2 text-xs text-cyan-200/80">
              {archive.years.map((y) => (
                <div key={y}>
                  <div className="font-medium">Year {y}</div>
                  <div className="pl-2 mt-1 border-l border-cyan-400/20">
                    {archive.map[y].map((p) => (
                      <div key={p.id} className="truncate max-w-[220px]">{p.date} — {p.title}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto p-6 text-center text-xs text-cyan-400/60 border-t neon-border">
        <div>© {new Date().getFullYear()} Ephora | Midnight Operations</div>
      </footer>

      {showContact && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-xl rounded-xl p-6 bg-[#010306] neon-border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold neon-blue uppercase">Secure Contact</h3>
              <button onClick={() => setShowContact(false)} className="text-cyan-400/70">✕</button>
            </div>
            <p className="text-cyan-200/70 mt-2 text-sm">Send encrypted transmission below.</p>
            <form onSubmit={(e) => {e.preventDefault(); const f = e.target; const subject = encodeURIComponent(f.subject.value || "Message"); const body = encodeURIComponent(f.message.value || ""); window.location.href = `mailto:contact@ephora.example?subject=${subject}&body=${body}`;}} className="mt-4 space-y-3">
              <input name="name" placeholder="Codename" className="w-full rounded-lg px-3 py-2 bg-[#000] neon-border" />
              <input name="subject" placeholder="Subject" className="w-full rounded-lg px-3 py-2 bg-[#000] neon-border" />
              <textarea name="message" rows="4" placeholder="Message" className="w-full rounded-lg px-3 py-2 bg-[#000] neon-border" />
              <div className="flex gap-2 justify-end">
                <button type="button" onClick={() => setShowContact(false)} className="px-4 py-2 rounded uppercase text-xs">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-cyan-700 text-xs uppercase">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDisclaimer && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-2xl rounded-xl p-6 bg-[#010306] neon-border text-cyan-200/80">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold neon-blue uppercase">Disclaimer</h3>
              <button onClick={() => setShowDisclaimer(false)} className="text-cyan-400/70">✕</button>
            </div>
            <p className="mt-3 text-sm leading-relaxed">Ephora operates in the shadows. All files are reflections and speculations, not official records. Handle with discretion.</p>
            <div className="mt-4 text-right">
              <button onClick={() => setShowDisclaimer(false)} className="px-4 py-2 rounded bg-cyan-700 text-xs uppercase">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
