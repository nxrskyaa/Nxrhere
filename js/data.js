/* ============================================================
   NXR here — channel data
   semua konten portofolio hidup di sini. edit sesukamu.
   ============================================================ */

const AVATAR = 'https://avatars.githubusercontent.com/u/3919974?v=4';
const GH = 'https://github.com/nxrskyaa';

const CHANNELS = {

  /* ---------------- #about-me ---------------- */
  'about-me': {
    topic: 'siapa sih NXR?',
    messages: [
      {
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', avatar: null, icon: '🤖',
        time: '27/07/2026 09.00',
        html: `<strong>Selamat datang di NXR LABS, <span class="mention">@everyone</span> 👋</strong><br>
               Server portofolio pribadi milik <strong>nxrskyaa</strong> — web3 builder, game dev, dan tukang ngoprek AI agent dari Bali 🌴<br>
               Pilih channel di sebelah kiri, atau ketik apa aja di bawah. Ada bot yang jaga di sini.`,
        reacts: [{ e: '👋', n: 12 }, { e: '🔥', n: 8 }, { e: '🌴', n: 5 }]
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR,
        time: '27/07/2026 09.02',
        html: `yo. gw <strong>NXR</strong> — udah di GitHub dari <code>2013</code>, tapi baru serius nge-build beberapa tahun terakhir. sekarang fokus di tiga hal: <strong>web3</strong> (Ritual, Monad, Arc), <strong>game dev</strong>, sama <strong>AI agent</strong> yang jalan on-chain.`
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR, compact: true,
        time: '09.03',
        html: `prinsip gw simpel: <strong>ship &gt; talk</strong>. mending rilis jelek tapi nyata daripada roadmap bagus tapi wacana.`
      },
      {
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', icon: '🤖',
        time: '09.04',
        embed: {
          color: '#5865f2',
          kicker: 'pinned • profile',
          title: 'nxrskyaa — NXR',
          desc: 'Bali, Indonesia · building di persimpangan web3 × games × AI',
          fields: [
            { l: 'lokasi', v: 'Bali 🌴' },
            { l: 'github sejak', v: 'Maret 2013' },
            { l: 'public repos', v: '44+' },
            { l: 'status', v: '🟢 open to collab' }
          ]
        }
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR,
        time: '09.06',
        html: `kalau mau lihat semua kerjaan gw, langsung aja ke <a href="${GH}" target="_blank" rel="noopener">github.com/nxrskyaa</a> — atau lanjut ke <span class="mention">#projects</span> buat highlight-nya.`
      }
    ]
  },

  /* ---------------- #projects ---------------- */
  'projects': {
    topic: 'yang gw bangun & gw ship',
    messages: [
      {
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', icon: '🤖',
        time: '10.00',
        html: `Highlight dari <a href="${GH}" target="_blank" rel="noopener">44+ repo publik</a>. Yang gw taruh di sini yang paling gw banggakan — sisanya cek sendiri di GitHub.`
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR,
        time: '10.01',
        projects: [
          {
            icon: '🔮', color: '#a855f7', name: 'ritual-chain-workshop', stars: 19,
            desc: 'On-chain AI bounty judge di Ritual. Build & deploy contract + TEE-verified inference — repo paling banyak bintangnya.',
            lang: 'TypeScript', lc: '#3178c6',
            chips: ['ritual', 'on-chain AI'],
            url: GH + '/ritual-chain-workshop'
          },
          {
            icon: '🎮', color: '#23a55a', name: 'AnastaChronicle', stars: null,
            desc: 'Browser game dengan 100% code-generated art. Live di anasta-chronicle.vercel.app — mainin langsung.',
            lang: 'JavaScript', lc: '#f1e05a',
            chips: ['game', 'live'],
            url: 'https://anasta-chronicle.vercel.app'
          },
          {
            icon: '⚡', color: '#f0b232', name: 'CONSTUAL', stars: 7,
            desc: 'Project TypeScript yang dapet traction organik dari komunitas.',
            lang: 'TypeScript', lc: '#3178c6',
            chips: ['typescript'],
            url: GH + '/CONSTUAL'
          },
          {
            icon: '🎫', color: '#00a8fc', name: 'UniskyPass', stars: null,
            desc: 'Passport / identity di Monad — dibangun buat Monad Spark Hackathon.',
            lang: 'TypeScript', lc: '#3178c6',
            chips: ['monad', 'hackathon'],
            url: GH + '/UniskyPass'
          },
          {
            icon: '📡', color: '#f23f43', name: 'ritual-agent-feeds', stars: null,
            desc: 'Ritual Agent Terminal — on-chain message feed di Ritual Testnet.',
            lang: 'TypeScript', lc: '#3178c6',
            chips: ['ritual', 'agent'],
            url: GH + '/ritual-agent-feeds'
          },
          {
            icon: '🕹️', color: '#eb459e', name: 'Arcynite', stars: null,
            desc: 'Colorful gamified onboarding buat Arc Testnet. MVP game yang bikin testnet jadi mainan.',
            lang: 'TypeScript', lc: '#3178c6',
            chips: ['arc', 'game'],
            url: GH + '/arcynite'
          },
          {
            icon: '🤖', color: '#5865f2', name: 'RialoTempleAgent', stars: null,
            desc: 'AI agent experiment — salah satu dari beberapa agent yang gw oprek.',
            lang: 'TypeScript', lc: '#3178c6',
            chips: ['ai', 'agent'],
            url: GH + '/RialoTempleAgent'
          },
          {
            icon: '🧪', color: '#949ba4', name: 'NxrLabsFableTest', stars: null,
            desc: 'Premium SaaS landing — Next.js 14, TypeScript, Tailwind, Framer Motion.',
            lang: 'TypeScript', lc: '#3178c6',
            chips: ['next.js', 'landing'],
            url: GH + '/NxrLabsFableTest'
          },
          {
            icon: '🌌', color: '#00a8fc', name: 'Semesta', stars: null,
            desc: 'Satu lagi eksperimen JavaScript yang lagi jalan.',
            lang: 'JavaScript', lc: '#f1e05a',
            chips: ['wip'],
            url: GH + '/Semesta'
          }
        ]
      },
      {
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', icon: '🤖',
        time: '10.05',
        html: `💡 pola yang kelihatan: gw suka bikin hal yang <strong>on-chain</strong> tapi rasanya kayak <strong>mainan</strong>. gamified onboarding, game, agent — semuanya harus fun dipake.`,
        reacts: [{ e: '🎯', n: 6 }]
      }
    ]
  },

  /* ---------------- #skills ---------------- */
  'skills': {
    topic: 'senjata di gudang',
    messages: [
      {
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', icon: '🤖',
        time: '11.00',
        html: `Stack yang gw pake hampir tiap hari. angka = seberapa sering dipake, bukan seberapa jago (jujur aja).`
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR,
        time: '11.01',
        skills: [
          { name: 'TypeScript / JavaScript', pct: 92, color: '#3178c6' },
          { name: 'Next.js + Tailwind', pct: 85, color: '#00a8fc' },
          { name: 'Smart Contract (EVM / Ritual)', pct: 78, color: '#a855f7' },
          { name: 'AI Agent / Automation', pct: 75, color: '#f0b232' },
          { name: 'Game Dev (browser)', pct: 70, color: '#23a55a' },
          { name: 'Testnet Ops / Node', pct: 68, color: '#f23f43' }
        ]
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR, compact: true,
        time: '11.02',
        html: `plus: <code>git</code> <code>bash</code> <code>python</code> buat scripting, <code>Vercel</code> buat deploy, dan kemampuan paling penting — <strong>baca docs sampe nemu</strong>.`
      },
      {
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', icon: '🤖',
        time: '11.03',
        embed: {
          color: '#f0b232',
          kicker: 'currently grinding',
          title: 'Ritual · Monad · Arc',
          desc: 'Tiga ekosistem yang lagi gw dalemin sekarang — on-chain AI inference di Ritual, high-throughput EVM di Monad, dan Arc buat infra agent.',
          fields: [
            { l: 'ritual', v: '🔮 on-chain AI' },
            { l: 'monad', v: '⚡ parallel EVM' },
            { l: 'arc', v: '🌐 agent infra' }
          ]
        }
      }
    ]
  },

  /* ---------------- #terminal ---------------- */
  'terminal': {
    topic: 'ngobrol sama shell. coba ketik `help`',
    messages: [
      {
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', icon: '🤖',
        time: '12.00',
        html: `Channel ini beda. Di bawah ada terminal beneran (ya, fake sih, tapi interaktif). Ketik <code>help</code> buat lihat semua command.`
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR,
        time: '12.01',
        terminal: true
      }
    ]
  },

  /* ---------------- #contact ---------------- */
  'contact': {
    topic: 'cara nemuin gw',
    messages: [
      {
        author: 'NXR Bot', badge: 'BOT', color: '#23a55a', icon: '🤖',
        time: '13.00',
        html: `Mau collab, ngajak build, atau sekadar nanya-nanya? Semua pintu di bawah terbuka. Response paling cepet biasanya di <strong>Telegram</strong>.`
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR,
        time: '13.01',
        contacts: [
          { icon: '🐙', label: 'github', value: 'nxrskyaa', color: '#f2f3f5', url: GH },
          { icon: '𝕏', label: 'x / twitter', value: '@nxrskyaa', color: '#00a8fc', url: 'https://x.com/nxrskyaa' },
          { icon: '✈️', label: 'telegram', value: '@piimntn', color: '#229ed9', url: 'https://t.me/piimntn' },
          { icon: '📮', label: 'email', value: 'Nxrskyaa@gmail.com', color: '#f0b232', url: 'mailto:Nxrskyaa@gmail.com' }
        ]
      },
      {
        author: 'nxrskyaa', color: '#f2f3f5', avatar: AVATAR, compact: true,
        time: '13.02',
        html: `kalau lu nemu bug di website ini — kasih tau gw. itu juga termasuk kontribusi 😄`,
        reacts: [{ e: '😂', n: 9 }, { e: '🤝', n: 4 }]
      }
    ]
  }
};

/* ---------------- bot replies buat composer ---------------- */
const BOT_REPLIES = [
  'noted. nanti gw sampein ke NXR 👍',
  'wkwk bener banget.',
  'hmm, menarik. coba tanya langsung di <span class="mention">@piimntn</span> telegram.',
  'gw cuma bot penjaga server, tapi gw setuju sama lu.',
  'pesan diterima 📬 — NXR biasanya bales kalo lagi gak nge-deploy.',
  'sip. btw udah cek <span class="mention">#projects</span> belum?',
  'kalau mau collab, langsung DM aja. NXR orangnya fast response kok.',
  '🔥🔥🔥',
  'error 418: gw teko. maksudnya... pesan lu udah gw catat.',
  'setuju. ship &gt; talk.'
];

const BOT_EASTER = {
  'halo': 'halo juga! 👋 tumben ada yang nyapa duluan.',
  'hai': 'hai! mau lihat-lihat atau mau collab? dua-duanya boleh.',
  'hi': 'hey! welcome to NXR LABS 🏝️',
  'siapa': 'gw NXR Bot — penjaga server ini. bos gw <strong>nxrskyaa</strong>, web3 builder dari Bali.',
  'siapa kamu': 'gw NXR Bot — penjaga server ini. bos gw <strong>nxrskyaa</strong>, web3 builder dari Bali.',
  'game': 'game favorit yang pernah gw jaga: <strong>AnastaChronicle</strong> 🎮 — 100% code-gen art, live di Vercel.',
  'ritual': 'Ritual itu L1 buat on-chain AI inference 🔮 bos gw udah deploy bounty judge di sana — cek <span class="mention">#projects</span>.',
  'monad': 'Monad ⚡ parallel EVM yang kenceng banget. bos gw build <strong>UniskyPass</strong> di sana pas hackathon.',
  'bali': 'Bali 🌴 basecamp resmi NXR LABS. coding sambil denger ombak, katanya.',
  'kerja': 'open to collab! 🤝 langsung aja DM telegram <span class="mention">@piimntn</span>.',
  'collab': 'open to collab! 🤝 langsung aja DM telegram <span class="mention">@piimntn</span>.',
  'kontak': 'semua pintu ada di <span class="mention">#contact</span> — github, X, telegram, email.',
  'email': 'email bos gw: <code>Nxrskyaa@gmail.com</code> 📮',
  'terima kasih': 'sama-sama! 🙌',
  'makasih': 'sip, sama-sama! 🙌',
  'thanks': 'anytime! 🤙',
  'wkwk': 'wkwkwk 😂',
  'anjay': 'anjay mabar 🗿',
  'p': 'p juga. kalo mau ngobrol yang lengkap, bukan cuma "p" 😄'
};

/* ---------------- terminal commands ---------------- */
const TERM_CMDS = {
  help: () => [
    ['dim', 'available commands:'],
    ['out', '  whoami        — siapa lu di sini'],
    ['out', '  ls            — lihat isi "home" gw'],
    ['out', '  skills        — stack gw'],
    ['out', '  projects      — highlight repo'],
    ['out', '  contact       — cara hubungin gw'],
    ['out', '  socials       — semua link'],
    ['out', '  uptime        — sejak kapan gw nge-build'],
    ['out', '  neofetch      — flex dikit'],
    ['out', '  sudo hire-me  — coba aja 😏'],
    ['out', '  clear         — bersihin layar']
  ],
  whoami: () => [
    ['out', 'guest@nxr-labs — tapi kalo mau jadi collaborator, tinggal bilang.']
  ],
  ls: () => [
    ['out', 'anasta-chronicle/   ritual-workshop/   uniskypass/'],
    ['out', 'constual/           arcynite/          agent-feeds/'],
    ['out', 'semesta/            rialo-agent/       bali-vibes.mp3']
  ],
  skills: () => [
    ['out', 'typescript ▓▓▓▓▓▓▓▓▓░  92%'],
    ['out', 'next.js    ▓▓▓▓▓▓▓▓░░  85%'],
    ['out', 'contracts  ▓▓▓▓▓▓▓░░░  78%'],
    ['out', 'ai agents  ▓▓▓▓▓▓▓░░░  75%'],
    ['out', 'game dev   ▓▓▓▓▓▓▓░░░  70%']
  ],
  projects: () => [
    ['out', '★ 19  ritual-chain-workshop  — on-chain AI bounty judge'],
    ['out', '★  7  CONSTUAL               — typescript project'],
    ['out', '      AnastaChronicle        — browser game, live di vercel'],
    ['out', '      UniskyPass             — Monad Spark hackathon'],
    ['dim', '...dan 40+ repo lainnya di github.com/nxrskyaa']
  ],
  contact: () => [
    ['out', 'telegram : @piimntn'],
    ['out', 'email    : Nxrskyaa@gmail.com'],
    ['out', 'github   : github.com/nxrskyaa']
  ],
  socials: () => [
    ['link', 'github.com/nxrskyaa', 'https://github.com/nxrskyaa'],
    ['link', 'x.com/nxrskyaa', 'https://x.com/nxrskyaa'],
    ['link', 't.me/piimntn', 'https://t.me/piimntn']
  ],
  uptime: () => {
    const yrs = new Date().getFullYear() - 2013;
    return [['out', `up ${yrs} years — akun github dibuat maret 2013, dan belum pernah pensiun.`]];
  },
  neofetch: () => [
    ['ok', '        ⬡⬡⬡        guest@nxr-labs'],
    ['out', '      ⬡⬡⬡⬡⬡⬡      ───────────────'],
    ['out', '    ⬡⬡⬡  ⬡⬡⬡      OS      : BaliOS 26.07 LTS'],
    ['out', '    ⬡⬡    ⬡⬡      Shell   : ship-it 2.0'],
    ['out', '    ⬡⬡⬡  ⬡⬡⬡      Editor  : vscode + vibes'],
    ['out', '      ⬡⬡⬡⬡⬡⬡      Stack   : TS / Next / EVM'],
    ['out', '        ⬡⬡⬡        Status  : 🟢 building']
  ],
  'sudo hire-me': () => [
    ['err', 'permission denied: lu yang harus hire gw, bukan sebaliknya.'],
    ['ok', '...tapi oke deh. DM telegram @piimntn, kita ngobrol 🤝']
  ],
  'sudo rm -rf /': () => [
    ['err', 'nice try. 🛡️ server ini dijaga 24/7.']
  ]
};
