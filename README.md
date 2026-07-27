# NXR here 🏝️

Portofolio Discord-style dari **nxrskyaa** — web3 builder, game dev, AI agent tinkerer dari Bali.

Live: [nxrhere.vercel.app](https://nxrhere.vercel.app) *(setelah deploy)*

## Fitur

- 🖥️ UI ala Discord app — window bar, server rail, channel sidebar, member list
- 💬 5 channel: `#about-me`, `#projects`, `#skills`, `#terminal`, `#contact`
- 🤖 Bot interaktif yang bales chat (coba ketik `halo`, `ritual`, `bali`, `kerja`)
- ⌨️ Terminal beneran di `#terminal` — coba `help`, `neofetch`, `sudo hire-me`
- 👤 Profile popout (klik avatar)
- 📱 Responsive + mobile drawer
- ✨ Reactions, typing indicator, status yang ganti-ganti, easter eggs di window bar

## Edit konten

Semua teks portofolio ada di **`js/data.js`** — channel, projects, skills, kontak, balasan bot, dan command terminal. Gak perlu nyentuh file lain.

## Tech

Static HTML/CSS/JS. Zero build, zero dependencies. Deploy ke Vercel = langsung jalan.

```
vercel          # pertama kali
vercel --prod   # seterusnya
```
