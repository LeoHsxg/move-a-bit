# 動一下 — PWA Prototype Design

**Date:** 2026-06-05
**Goal:** Convert the existing static wireframe into an installable PWA demo with clickable navigation and a real camera viewfinder.

---

## Scope

Clickable prototype only. All data is hardcoded. No backend, no persistence between sessions. Target: install on phone via GitHub Pages, use as a demo.

One real native feature: the camera screen opens the device's front camera (real viewfinder). Pressing the shutter navigates to the completion screen — no actual photo is taken or saved.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| PWA | vite-plugin-pwa (auto manifest + service worker) |
| Navigation | In-memory `useState` in App.jsx — no router |
| Styling | Inline styles (carry over from existing design system) |
| Deployment | GitHub Pages via GitHub Actions (push to main → auto build + deploy) |

---

## Project Structure

```
move-a-bit/
├── src/
│   ├── main.jsx                  # React entry point
│   ├── App.jsx                   # owns `screen` state + navigate()
│   ├── design-system.jsx         # C, FZ, FN, Screen, Btn, TabBar, icons, etc.
│   └── screens/
│       ├── onboarding/
│       │   ├── Welcome.jsx
│       │   ├── Goal.jsx
│       │   ├── Time.jsx
│       │   ├── Place.jsx
│       │   └── Share.jsx
│       ├── flow/
│       │   ├── Timer.jsx
│       │   ├── Camera.jsx
│       │   └── Done.jsx
│       └── tabs/
│           ├── Home.jsx
│           ├── Record.jsx
│           ├── Friends.jsx
│           └── Me.jsx
├── public/
│   └── icons/                    # PWA icons (192×192, 512×512) — generated from leaf icon
├── vite.config.js
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml            # push to main → build → GitHub Pages
```

Source files (`design-canvas.jsx`, `app.jsx`, `screens-*.jsx`) in the project root are the original wireframe and are not used in the PWA build. They stay as reference.

---

## Navigation Model

`App.jsx` owns a single `useState`:

```jsx
const [screen, setScreen] = useState('onboarding-welcome')
const navigate = (s) => setScreen(s)
```

Every screen receives `navigate` as a prop. No URL routing. Each session always starts at `onboarding-welcome` (intentional — allows full demo flow every time).

### Navigation Map

```
onboarding-welcome  →(開始)→           onboarding-goal
onboarding-goal     →(下一步)→         onboarding-time
onboarding-time     →(下一步)→         onboarding-place
onboarding-place    →(下一步)→         onboarding-share
onboarding-share    →(完成，開始動一下)→ home

home    →(開始)→       timer
timer   →(我完成了)→   camera
camera  →(快門/跳過)→  done
done    →(回首頁)→     home

home / record / friends / me  ↔  Tab bar (互相切換)

onboarding-goal / time / place / share  →(‹)→ 上一個 onboarding 畫面
```

---

## Camera Implementation

`Camera.jsx` uses the browser MediaDevices API. Front camera (`facingMode: 'user'`).

```jsx
const videoRef = useRef(null)

useEffect(() => {
  let stream
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'user' } })
    .then(s => { stream = s; videoRef.current.srcObject = s })
    .catch(() => {})  // graceful: show static background if denied
  return () => stream?.getTracks().forEach(t => t.stop())
}, [])
```

The `<video>` element replaces the gradient viewfinder from the wireframe. All other UI elements (framing corners, shutter button, skip text, Polaroid vignette overlay) stay identical to the original design.

Pressing the shutter button or "跳過" both call `navigate('done')`. Camera requires HTTPS — works on GitHub Pages, not on LAN IP during local dev (localhost is fine).

---

## PWA Configuration

`vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/move-a-bit/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '動一下',
        short_name: '動一下',
        display: 'standalone',
        background_color: '#FBF7EF',
        theme_color: '#D89A72',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
```

`base: '/move-a-bit/'` must match the GitHub repository name.

---

## GitHub Pages Deployment

`.github/workflows/deploy.yml` — triggered on push to `main`:

1. `npm ci`
2. `npm run build` → outputs to `dist/`
3. Deploy `dist/` to GitHub Pages

Setup steps (one-time, before first deploy):
1. `git init` in project root
2. Create GitHub repo named `move-a-bit`
3. Push to `main`
4. Enable GitHub Pages in repo settings → Source: GitHub Actions

---

## Development Workflow

```bash
npm install
npm run dev      # localhost:5173 — hot reload, all screens work
                 # camera works on localhost (browser allows getUserMedia)
                 # camera does NOT work on 192.168.x.x (needs HTTPS)
```

To test PWA installability, run `npm run build && npm run preview` and open `localhost:4173`.

---

## What Is Hardcoded

All data in the wireframe stays hardcoded:
- 印記 count: 12 (home), 24 (profile)
- 稱號: 常出現的人
- 好友列表: 小雨、阿哲、庭、宥、Kai (with fixed 今天有動 / X天沒出現 states)
- 月曆: June 2026, marks on specific days
- 任務: 去操場走走
- 週進度: 3 次
