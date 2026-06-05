# 動一下 PWA Prototype — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the static 動一下 wireframe into a Vite-based installable PWA with full clickable navigation and a real front-camera viewfinder, deployable to GitHub Pages.

**Architecture:** In-memory navigation (`useState` in `App.jsx`) renders one of 12 screen components. All data is hardcoded. The Camera screen calls `getUserMedia({ facingMode: 'user' })` and streams live video into the viewfinder. `vite-plugin-pwa` auto-generates the manifest and service worker.

**Tech Stack:** React 18, Vite 6, vite-plugin-pwa 0.21, sharp 0.33 (icon generation), GitHub Actions (CD → GitHub Pages)

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `package.json` | Create | Dependencies + npm scripts |
| `.gitignore` | Create | Ignore node_modules, dist |
| `vite.config.js` | Create | Vite + React + PWA config (PWA added in Task 7) |
| `index.html` | Create | HTML shell |
| `src/main.jsx` | Create | React entry point |
| `src/App.jsx` | Create | Screen state + `navigate()` |
| `src/design-system.jsx` | Create | All shared tokens + UI primitives (ported from `app.jsx`) |
| `src/icon.svg` | Create | Source artwork for PWA icons |
| `scripts/gen-icons.mjs` | Create | Rasterise icon.svg → PNG at 192 + 512px |
| `src/screens/onboarding/Welcome.jsx` | Create | Screen 01 |
| `src/screens/onboarding/Goal.jsx` | Create | Screen 02 |
| `src/screens/onboarding/Time.jsx` | Create | Screen 03 |
| `src/screens/onboarding/Place.jsx` | Create | Screen 04 |
| `src/screens/onboarding/Share.jsx` | Create | Screen 05 |
| `src/screens/flow/Timer.jsx` | Create | Screen 07 |
| `src/screens/flow/Camera.jsx` | Create | Screen 08 — real getUserMedia |
| `src/screens/flow/Done.jsx` | Create | Screen 09 |
| `src/screens/tabs/Home.jsx` | Create | Screen 06 |
| `src/screens/tabs/Record.jsx` | Create | Screen 10 |
| `src/screens/tabs/Friends.jsx` | Create | Screen 11 |
| `src/screens/tabs/Me.jsx` | Create | Screen 12 |
| `public/icons/icon-192.png` | Generated | PWA icon |
| `public/icons/icon-512.png` | Generated | PWA icon |
| `.github/workflows/deploy.yml` | Create | CD pipeline |

---

## Task 1: Git + Vite Scaffold

**Files:** `package.json`, `.gitignore`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx` (placeholder)

- [ ] **Step 1: Initialize git**

```bash
cd "c:\Users\yuchen\Documents\GitHub\move-a-bit"
git init
```

- [ ] **Step 2: Create `.gitignore`**

```
node_modules/
dist/
dist-ssr/
*.local
.env
.env.*
!.env.example
```

- [ ] **Step 3: Create `package.json`**

```json
{
  "name": "move-a-bit",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "gen-icons": "node scripts/gen-icons.mjs"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "sharp": "^0.33.5",
    "vite": "^6.3.5",
    "vite-plugin-pwa": "^0.21.1"
  }
}
```

- [ ] **Step 4: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 5: Create `vite.config.js`** (PWA plugin added in Task 7)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/move-a-bit/',
  plugins: [react()],
})
```

- [ ] **Step 6: Create `index.html`**

```html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>動一下</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;600;700&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet" />
    <style>
      html, body { margin: 0; padding: 0; background: #F0EEE9; }
      * { box-sizing: border-box; }
      #root { display: flex; justify-content: center; align-items: center; min-height: 100dvh; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 7: Create `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 8: Create placeholder `src/App.jsx`**

```jsx
export default function App() {
  return <div style={{ color: '#4A443C', padding: 32, fontFamily: 'system-ui' }}>動一下 — scaffold OK</div>
}
```

- [ ] **Step 9: Start dev server and verify**

```bash
npm run dev
```

Open `http://localhost:5173/move-a-bit/` — should show "動一下 — scaffold OK".

- [ ] **Step 10: Commit**

```bash
git add package.json package-lock.json .gitignore vite.config.js index.html src/main.jsx src/App.jsx
git commit -m "chore: vite project scaffold"
```

---

## Task 2: Design System

**Files:** `src/design-system.jsx`

Port all shared tokens and components from the original `app.jsx` (project root) to a named-export ES module. Also adds `onClick` passthrough to `Btn` and `navigate` prop to `TabBar`.

- [ ] **Step 1: Create `src/design-system.jsx`**

```jsx
export const C = {
  bg:       '#FBF7EF',
  bgWarm:   '#F5ECDC',
  cream:    '#F6EFE1',
  card:     '#FFFFFF',
  clay:     '#D89A72',
  clayDeep: '#C07F54',
  claySoft: '#F1DECB',
  clayWash: '#FBEEE2',
  sage:     '#8BA47E',
  sageDeep: '#6E8A62',
  sageSoft: '#DEE7D1',
  sand:     '#ECDFC8',
  ink:      '#4A443C',
  ink2:     '#776E61',
  ink3:     '#A89E8E',
  line:     'rgba(74,68,60,0.10)',
  lineSoft: 'rgba(74,68,60,0.055)',
}

export const FZ = '"Noto Sans TC", -apple-system, system-ui, sans-serif'
export const FN = '"Quicksand", "Noto Sans TC", system-ui, sans-serif'
export const PHONE_W = 390
export const PHONE_H = 844

export function StatusBar({ light = false, time = '9:41' }) {
  const c = light ? '#FFFFFF' : C.ink
  return (
    <div style={{
      height: 54, flexShrink: 0, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 30px 0 34px',
      paddingTop: 8, position: 'relative', zIndex: 5,
    }}>
      <span style={{ fontFamily: FN, fontWeight: 600, fontSize: 16, color: c, letterSpacing: 0.3 }}>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <svg width="18" height="11" viewBox="0 0 18 11"><g fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="0.7"/>
          <rect x="4.5" y="4.8" width="3" height="6.2" rx="0.7"/>
          <rect x="9" y="2.5" width="3" height="8.5" rx="0.7"/>
          <rect x="13.5" y="0" width="3" height="11" rx="0.7"/>
        </g></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><g stroke={c} strokeWidth="1.4" strokeLinecap="round">
          <path d="M1 4.2C3 2.4 5.4 1.4 8 1.4s5 1 7 2.8"/>
          <path d="M3.4 6.6C4.7 5.5 6.3 4.9 8 4.9s3.3.6 4.6 1.7"/>
        </g><circle cx="8" cy="9.4" r="1.1" fill={c}/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none"/><rect x="2" y="2" width="18" height="8" rx="1.8" fill={c}/><rect x="23" y="3.5" width="1.5" height="5" rx="0.75" fill={c} fillOpacity="0.4"/></svg>
      </div>
    </div>
  )
}

export function HomeBar({ light = false }) {
  return (
    <div style={{ height: 26, flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 9 }}>
      <div style={{ width: 134, height: 5, borderRadius: 3, background: light ? 'rgba(255,255,255,0.85)' : 'rgba(74,68,60,0.28)' }} />
    </div>
  )
}

export function Screen({ children, bg = C.bg, light = false, time = '9:41', noStatus = false }) {
  return (
    <div style={{
      width: PHONE_W, height: PHONE_H, background: bg, position: 'relative',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      fontFamily: FZ, color: C.ink, WebkitFontSmoothing: 'antialiased',
    }}>
      {!noStatus && <StatusBar light={light} time={time} />}
      {children}
    </div>
  )
}

export function Btn({ children, kind = 'primary', full = true, disabled = false, style = {}, ...props }) {
  const base = {
    height: 56, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: FZ, fontWeight: 600, fontSize: 18, letterSpacing: 0.5, width: full ? '100%' : 'auto',
    padding: full ? 0 : '0 30px', border: 'none', cursor: 'pointer', transition: 'all .15s',
  }
  const kinds = {
    primary: { background: disabled ? C.claySoft : C.clay, color: disabled ? C.ink3 : '#fff',
      boxShadow: disabled ? 'none' : '0 8px 20px rgba(192,127,84,0.28)' },
    soft:    { background: C.claySoft, color: C.clayDeep },
    ghost:   { background: 'transparent', color: C.ink2, border: `1.5px solid ${C.line}` },
    sage:    { background: C.sageDeep, color: '#fff', boxShadow: '0 8px 20px rgba(110,138,98,0.26)' },
  }
  return <button {...props} style={{ ...base, ...kinds[kind], ...style }}>{children}</button>
}

export function Progress({ step, total = 5, onBack }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '6px 26px 0' }}>
      <div onClick={onBack} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <Icon.Chevron dir="left" size={20} color={C.ink2} />
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 6 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < step ? C.clay : C.sand }} />
        ))}
      </div>
      <span style={{ fontFamily: FN, fontSize: 14, fontWeight: 600, color: C.ink3, minWidth: 30, textAlign: 'right' }}>{step}/{total}</span>
    </div>
  )
}

export function TabBar({ active = 'home', navigate }) {
  const tabs = [
    { id: 'home',    label: '首頁', icon: Icon.Home },
    { id: 'record',  label: '紀錄', icon: Icon.Calendar },
    { id: 'friends', label: '好友', icon: Icon.People },
    { id: 'me',      label: '我的', icon: Icon.Person },
  ]
  return (
    <div style={{ flexShrink: 0, background: 'rgba(255,255,255,0.92)', borderTop: `1px solid ${C.lineSoft}`, backdropFilter: 'blur(8px)' }}>
      <div style={{ display: 'flex', padding: '10px 12px 4px' }}>
        {tabs.map(t => {
          const on = t.id === active
          const col = on ? C.clayDeep : C.ink3
          return (
            <div key={t.id} onClick={() => navigate(t.id)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
              <t.icon size={25} color={col} fill={on} />
              <span style={{ fontSize: 11, fontWeight: on ? 600 : 500, color: col, letterSpacing: 0.5 }}>{t.label}</span>
            </div>
          )
        })}
      </div>
      <HomeBar />
    </div>
  )
}

export function ChoiceCard({ title, sub, selected = false, leading, trailing, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14, padding: '18px 20px', borderRadius: 20,
      background: selected ? C.clayWash : C.card,
      border: `1.5px solid ${selected ? C.clay : C.line}`,
      boxShadow: selected ? '0 6px 18px rgba(192,127,84,0.14)' : '0 1px 2px rgba(74,68,60,0.04)',
      ...style,
    }}>
      {leading}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: C.ink, marginBottom: sub ? 3 : 0 }}>{title}</div>
        {sub && <div style={{ fontSize: 13.5, color: C.ink2, lineHeight: 1.45 }}>{sub}</div>}
      </div>
      {trailing !== undefined ? trailing : (
        <div style={{
          width: 24, height: 24, borderRadius: 12, flexShrink: 0,
          border: `2px solid ${selected ? C.clay : C.sand}`,
          background: selected ? C.clay : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {selected && <Icon.Check size={13} color="#fff" />}
        </div>
      )}
    </div>
  )
}

export function Chip({ children, selected = false }) {
  return (
    <div style={{
      padding: '13px 20px', borderRadius: 16, fontSize: 16, fontWeight: 600, letterSpacing: 0.3,
      background: selected ? C.sageSoft : C.card,
      color: selected ? C.sageDeep : C.ink2,
      border: `1.5px solid ${selected ? C.sage : C.line}`,
      display: 'inline-flex', alignItems: 'center', gap: 9,
    }}>
      {selected && <Icon.Check size={14} color={C.sageDeep} />}
      {children}
    </div>
  )
}

export const Icon = {
  Chevron: ({ dir = 'right', size = 18, color = C.ink2 }) => {
    const d = { right: 'M7 4l6 6-6 6', left: 'M13 4l-6 6 6 6' }[dir]
    return <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  Check: ({ size = 14, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.2 3.3L13 5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Close: ({ size = 22, color = C.ink2 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth="2.2" strokeLinecap="round"/></svg>
  ),
  Leaf: ({ size = 18, color = C.sageDeep }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 4C9 4 4 9.5 4 18c0 1 0 1.5.4 2 5.5.5 15.6-3.2 15.6-16z" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/>
      <path d="M16 8C11 11 8 14.5 6.5 19" stroke={color} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  Home: ({ size = 24, color = C.ink3, fill = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 10.5L12 4l8 6.5V19a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 19v-8.5z" fill={fill ? color : 'none'} fillOpacity={fill ? 0.16 : 0} stroke={color} strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  Calendar: ({ size = 24, color = C.ink3, fill = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="15" rx="3" fill={fill ? color : 'none'} fillOpacity={fill ? 0.16 : 0} stroke={color} strokeWidth="1.8"/>
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  People: ({ size = 24, color = C.ink3, fill = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="8" r="3.3" fill={fill ? color : 'none'} fillOpacity={fill ? 0.16 : 0} stroke={color} strokeWidth="1.8"/>
      <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M16 6.2A3 3 0 0119 9a3 3 0 01-1.4 2.5M17 14.2c2.3.4 4 2.3 4 4.8" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Person: ({ size = 24, color = C.ink3, fill = false }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.6" fill={fill ? color : 'none'} fillOpacity={fill ? 0.16 : 0} stroke={color} strokeWidth="1.8"/>
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  Edit: ({ size = 18, color = C.ink3 }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none"><path d="M13.5 3.5l3 3L7 16l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="1.7" strokeLinejoin="round"/></svg>
  ),
  Poke: ({ size = 16, color = C.clayDeep }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M7 10.5V5a1.6 1.6 0 113.2 0v4M10.2 9V4a1.6 1.6 0 013.2 0v5M13.4 9.5V6.2a1.5 1.5 0 013 0v6.3c0 2.8-2 4.8-4.8 4.8-1.8 0-3-.7-4-2L5 14c-.8-1-.4-2.2.7-2.6l1.3-.4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Play: ({ size = 26, color = '#fff' }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M7 5.5v13l11-6.5z"/></svg>
  ),
  Pin: ({ size = 22, color = C.clayDeep }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" fill={color} fillOpacity="0.14" stroke={color} strokeWidth="1.8"/><circle cx="12" cy="10" r="2.4" fill={color}/></svg>
  ),
}
```

- [ ] **Step 2: Smoke-test design system — update `src/App.jsx`**

```jsx
import { C, Screen, Btn, Icon } from './design-system'

export default function App() {
  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon.Leaf size={40} color={C.sage} />
      </div>
      <div style={{ padding: '0 28px 18px' }}>
        <Btn onClick={() => alert('OK')}>設計系統 OK</Btn>
      </div>
    </Screen>
  )
}
```

In browser: should show a 390×844 phone frame with a sage leaf icon and a clay button. Clicking the button shows an alert.

- [ ] **Step 3: Commit**

```bash
git add src/design-system.jsx src/App.jsx
git commit -m "feat: design system as ES module"
```

---

## Task 3: App.jsx Navigation Shell + Screen Stubs

**Files:** `src/App.jsx`, all 12 screen files (stubs)

- [ ] **Step 1: Replace `src/App.jsx`**

```jsx
import { useState } from 'react'
import Welcome from './screens/onboarding/Welcome'
import Goal    from './screens/onboarding/Goal'
import Time    from './screens/onboarding/Time'
import Place   from './screens/onboarding/Place'
import Share   from './screens/onboarding/Share'
import Timer   from './screens/flow/Timer'
import Camera  from './screens/flow/Camera'
import Done    from './screens/flow/Done'
import Home    from './screens/tabs/Home'
import Record  from './screens/tabs/Record'
import Friends from './screens/tabs/Friends'
import Me      from './screens/tabs/Me'

const SCREENS = {
  'onboarding-welcome': Welcome,
  'onboarding-goal':    Goal,
  'onboarding-time':    Time,
  'onboarding-place':   Place,
  'onboarding-share':   Share,
  timer:   Timer,
  camera:  Camera,
  done:    Done,
  home:    Home,
  record:  Record,
  friends: Friends,
  me:      Me,
}

export default function App() {
  const [screen, setScreen] = useState('onboarding-welcome')
  const navigate = (s) => setScreen(s)
  const CurrentScreen = SCREENS[screen] ?? Home
  return <CurrentScreen navigate={navigate} />
}
```

- [ ] **Step 2: Create stub files**

`src/screens/onboarding/Welcome.jsx`:
```jsx
export default function Welcome({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('onboarding-goal')}>Welcome stub — click to advance</div>
}
```

`src/screens/onboarding/Goal.jsx`:
```jsx
export default function Goal({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('onboarding-time')}>Goal stub</div>
}
```

`src/screens/onboarding/Time.jsx`:
```jsx
export default function Time({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('onboarding-place')}>Time stub</div>
}
```

`src/screens/onboarding/Place.jsx`:
```jsx
export default function Place({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('onboarding-share')}>Place stub</div>
}
```

`src/screens/onboarding/Share.jsx`:
```jsx
export default function Share({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('home')}>Share stub</div>
}
```

`src/screens/flow/Timer.jsx`:
```jsx
export default function Timer({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('camera')}>Timer stub</div>
}
```

`src/screens/flow/Camera.jsx`:
```jsx
export default function Camera({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('done')}>Camera stub</div>
}
```

`src/screens/flow/Done.jsx`:
```jsx
export default function Done({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('home')}>Done stub</div>
}
```

`src/screens/tabs/Home.jsx`:
```jsx
export default function Home({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('timer')}>Home stub</div>
}
```

`src/screens/tabs/Record.jsx`:
```jsx
export default function Record({ navigate }) {
  return <div style={{ padding: 32 }}>Record stub</div>
}
```

`src/screens/tabs/Friends.jsx`:
```jsx
export default function Friends({ navigate }) {
  return <div style={{ padding: 32 }}>Friends stub</div>
}
```

`src/screens/tabs/Me.jsx`:
```jsx
export default function Me({ navigate }) {
  return <div style={{ padding: 32 }}>Me stub</div>
}
```

- [ ] **Step 3: Verify navigation works in browser**

Click through: Welcome → Goal → Time → Place → Share → Home → Timer → Camera → Done → Home. Should see stub text change each click.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/screens/
git commit -m "feat: navigation shell with screen stubs"
```

---

## Task 4: Onboarding Screens

**Files:** Replace all 5 onboarding stubs with full UI.

- [ ] **Step 1: Replace `src/screens/onboarding/Welcome.jsx`**

```jsx
import { C, FZ, Screen, Btn, HomeBar, Icon } from '../../design-system'

export default function Welcome({ navigate }) {
  return (
    <Screen bg="linear-gradient(170deg, #FBF1E4 0%, #F6EFE1 45%, #EDEAD8 100%)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 150, width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,154,114,0.16) 0%, rgba(216,154,114,0) 70%)' }} />
        <div style={{ marginBottom: 26, position: 'relative' }}><Icon.Leaf size={44} color={C.sage} /></div>
        <h1 style={{ fontFamily: FZ, fontSize: 58, fontWeight: 700, color: C.ink, letterSpacing: 4, margin: 0, position: 'relative' }}>動一下</h1>
        <p style={{ fontSize: 18, color: C.ink2, marginTop: 18, fontWeight: 500, letterSpacing: 0.5 }}>每天只要動一下，就夠了</p>
      </div>
      <div style={{ padding: '0 28px 18px' }}>
        <Btn onClick={() => navigate('onboarding-goal')}>開始</Btn>
      </div>
      <HomeBar />
    </Screen>
  )
}
```

- [ ] **Step 2: Replace `src/screens/onboarding/Goal.jsx`**

```jsx
import { C, Screen, Btn, HomeBar, Progress, ChoiceCard } from '../../design-system'

export default function Goal({ navigate }) {
  return (
    <Screen>
      <Progress step={2} onBack={() => navigate('onboarding-welcome')} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '34px 26px 0' }}>
        <h2 style={{ fontSize: 27, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>你最想要的是什麼？</h2>
        <p style={{ fontSize: 15, color: C.ink2, marginTop: 10, lineHeight: 1.5 }}>不用很精確，選一個最有共鳴的就好</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
          <ChoiceCard title="變健康" sub="讓身體好一點" />
          <ChoiceCard title="改善體態" sub="讓自己看起來更喜歡" selected />
          <ChoiceCard title="找回照顧自己的感覺" sub="重新掌控生活節奏" />
        </div>
      </div>
      <div style={{ padding: '0 26px 18px' }}>
        <Btn onClick={() => navigate('onboarding-time')}>下一步</Btn>
      </div>
      <HomeBar />
    </Screen>
  )
}
```

- [ ] **Step 3: Replace `src/screens/onboarding/Time.jsx`**

```jsx
import { C, Screen, Btn, HomeBar, Progress, Chip } from '../../design-system'

export default function Time({ navigate }) {
  return (
    <Screen>
      <Progress step={3} onBack={() => navigate('onboarding-goal')} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '34px 26px 0' }}>
        <h2 style={{ fontSize: 27, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>你平常什麼時候<br/>比較容易動？</h2>
        <p style={{ fontSize: 15, color: C.ink2, marginTop: 10, lineHeight: 1.5 }}>可以複選，之後可以改</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28, alignItems: 'flex-start' }}>
          <Chip selected>起床後上課前</Chip>
          <Chip>下課後（回宿舍前）</Chip>
          <Chip selected>晚飯後</Chip>
        </div>
      </div>
      <div style={{ padding: '0 26px 18px' }}>
        <Btn onClick={() => navigate('onboarding-place')}>下一步</Btn>
      </div>
      <HomeBar />
    </Screen>
  )
}
```

- [ ] **Step 4: Replace `src/screens/onboarding/Place.jsx`**

```jsx
import { C, Screen, Btn, HomeBar, Progress, Icon } from '../../design-system'

export default function Place({ navigate }) {
  const item = (t, sel) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '16px 18px', borderRadius: 16,
      background: sel ? C.clayWash : C.card, border: `1.5px solid ${sel ? C.clay : C.line}` }}>
      <Icon.Pin size={20} color={sel ? C.clayDeep : C.ink3} />
      <span style={{ flex: 1, fontSize: 16.5, fontWeight: 600, color: C.ink }}>{t}</span>
      {sel && <Icon.Check size={15} color={C.clayDeep} />}
    </div>
  )
  return (
    <Screen>
      <Progress step={4} onBack={() => navigate('onboarding-time')} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px 26px 0', overflow: 'hidden' }}>
        <h2 style={{ fontSize: 27, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>你最常在哪裡動？</h2>
        <p style={{ fontSize: 15, color: C.ink2, marginTop: 9, lineHeight: 1.5 }}>App 靠近這裡時會輕輕提醒你</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 22 }}>
          {item('學校操場 / 運動場', true)}
          {item('學校健身房', false)}
          {item('附近公園', false)}
          {item('宿舍地板（居家）', false)}
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '16px 18px', borderRadius: 16, background: C.card, border: `1.5px dashed ${C.sand}` }}>
            <Icon.Edit size={19} color={C.ink3} />
            <span style={{ flex: 1, fontSize: 16.5, color: C.ink3 }}>自己輸入…</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 26px 18px' }}>
        <Btn onClick={() => navigate('onboarding-share')}>下一步</Btn>
        <p style={{ textAlign: 'center', fontSize: 12.5, color: C.ink3, marginTop: 12 }}>之後可以在設定裡更改</p>
      </div>
      <HomeBar />
    </Screen>
  )
}
```

- [ ] **Step 5: Replace `src/screens/onboarding/Share.jsx`**

```jsx
import { C, Screen, Btn, HomeBar, Progress } from '../../design-system'

export default function Share({ navigate }) {
  const card = (title, sub, sel) => (
    <div style={{ padding: '22px 22px', borderRadius: 22,
      background: sel ? C.clayWash : C.card,
      border: `1.5px solid ${sel ? C.clay : C.line}`,
      boxShadow: sel ? '0 6px 18px rgba(192,127,84,0.14)' : '0 1px 2px rgba(74,68,60,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <div style={{ width: 24, height: 24, borderRadius: 12, flexShrink: 0,
          border: `2px solid ${sel ? C.clay : C.sand}`,
          background: sel ? C.clay : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {sel && <div style={{ width: 9, height: 9, borderRadius: 5, background: '#fff' }} />}
        </div>
        <span style={{ fontSize: 19, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.55, margin: '12px 0 0', paddingLeft: 37 }}>{sub}</p>
    </div>
  )
  return (
    <Screen>
      <Progress step={5} onBack={() => navigate('onboarding-place')} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '34px 26px 0' }}>
        <h2 style={{ fontSize: 27, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>要讓朋友看到<br/>你的進度嗎？</h2>
        <p style={{ fontSize: 15, color: C.ink2, marginTop: 10, lineHeight: 1.5 }}>只有你邀請的朋友才能看到，你也可以看到對方的</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 26 }}>
          {card('開放好友查看', '互相知道彼此有沒有在動，低壓陪伴', true)}
          {card('先保持私人', '之後可以在設定裡開啟', false)}
        </div>
      </div>
      <div style={{ padding: '0 26px 18px' }}>
        <Btn onClick={() => navigate('home')}>完成，開始動一下</Btn>
      </div>
      <HomeBar />
    </Screen>
  )
}
```

- [ ] **Step 6: Verify in browser**

Walk through the full onboarding flow: Welcome → Goal → Time → Place → Share → (should land on Home stub). Back arrows on screens 2–5 should also navigate to the previous screen.

- [ ] **Step 7: Commit**

```bash
git add src/screens/onboarding/
git commit -m "feat: onboarding screens 01-05"
```

---

## Task 5: Tab Screens

**Files:** Replace the 4 tab stubs with full UI.

- [ ] **Step 1: Replace `src/screens/tabs/Home.jsx`**

```jsx
import { C, FN, FZ, Screen, TabBar, Icon } from '../../design-system'

export default function Home({ navigate }) {
  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 26px 0' }}>
        <div>
          <div style={{ fontSize: 15, color: C.ink3, fontWeight: 500 }}>下課了</div>
          <div style={{ fontSize: 25, fontWeight: 700, color: C.ink, marginTop: 2 }}>嗨，今天還好嗎</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.sageSoft, padding: '8px 14px', borderRadius: 22 }}>
          <Icon.Leaf size={18} color={C.sageDeep} />
          <span style={{ fontFamily: FN, fontSize: 18, fontWeight: 700, color: C.sageDeep }}>12</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 26px 0' }}>
        <div style={{ flex: 1, borderRadius: 30, padding: '30px 28px 26px', display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(165deg, #F2D8BE 0%, #E9BE97 100%)',
          boxShadow: '0 18px 40px rgba(201,138,90,0.28)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.clayDeep, letterSpacing: 2, opacity: 0.85 }}>今天的任務</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#5E4632', lineHeight: 1.25, letterSpacing: 1 }}>去操場<br/>走走</div>
            <div style={{ fontSize: 16, color: '#8A6B52', marginTop: 16, lineHeight: 1.55 }}>走到操場待一下就算完成</div>
          </div>
          <button onClick={() => navigate('timer')}
            style={{ height: 60, borderRadius: 20, border: 'none', background: '#5E4632', color: '#FBF1E5',
              fontFamily: FZ, fontWeight: 700, fontSize: 19, letterSpacing: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer' }}>
            開始 <Icon.Play size={20} color="#FBF1E5" />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 6px 18px' }}>
          <span style={{ fontSize: 15.5, color: C.ink2, fontWeight: 500 }}>這週已經動了 <b style={{ color: C.ink, fontWeight: 700 }}>3</b> 次</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1,1,1,0,0].map((on, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: 6, background: on ? C.sage : C.sand }} />
            ))}
          </div>
        </div>
      </div>
      <TabBar active="home" navigate={navigate} />
    </Screen>
  )
}
```

- [ ] **Step 2: Replace `src/screens/tabs/Record.jsx`**

```jsx
import { C, FN, Screen, TabBar, Icon } from '../../design-system'

export default function Record({ navigate }) {
  const weekHead = ['一','二','三','四','五','六','日']
  const marks = new Set([2,3,5,6,9,12,13,16,19,20,23,26,27])
  const today = 27
  const days = Array.from({ length: 30 }, (_, i) => i + 1)
  const cell = (d) => {
    const has = marks.has(d), isToday = d === today
    return (
      <div key={d} style={{ height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <span style={{ fontSize: 14, color: isToday ? C.clayDeep : (has ? C.ink : C.ink3),
          fontWeight: isToday ? 700 : 500, width: 26, height: 26, borderRadius: 13,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: isToday ? `1.5px solid ${C.clay}` : '1.5px solid transparent' }}>{d}</span>
        {has ? <div style={{ width: 6, height: 6, borderRadius: 3, background: C.sage }} /> : <div style={{ height: 6 }} />}
      </div>
    )
  }
  const vids = [['週四','#D9A87C'],['週三','#B9CBA8'],['週日','#E2C08C'],['週六','#C9B6D6']]
  return (
    <Screen bg={C.bg}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: 0, padding: '6px 26px 0' }}>我的印記</h1>

        <div style={{ margin: '22px 22px 0', background: C.card, borderRadius: 26, padding: '20px 18px', boxShadow: '0 2px 10px rgba(74,68,60,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px 14px' }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>六月</span>
            <div style={{ display: 'flex', gap: 18, color: C.ink3 }}>
              <Icon.Chevron dir="left" size={18} /><Icon.Chevron dir="right" size={18} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)' }}>
            {weekHead.map(w => <div key={w} style={{ textAlign: 'center', fontSize: 12, color: C.ink3, fontWeight: 600, paddingBottom: 6 }}>{w}</div>)}
            {days.map(cell)}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px 14px' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>最近的樣子</span>
            <span style={{ fontSize: 14, color: C.clayDeep, fontWeight: 600 }}>查看全部</span>
          </div>
          <div style={{ display: 'flex', gap: 13, padding: '0 26px', overflow: 'hidden' }}>
            {vids.map(([d, col], i) => (
              <div key={i} style={{ flexShrink: 0, width: 96 }}>
                <div style={{ width: 96, height: 128, borderRadius: 18, background: `linear-gradient(155deg, ${col}, #E9DFCB)`,
                  boxShadow: '0 4px 12px rgba(74,68,60,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon.Play size={16} color={C.ink} />
                  </div>
                </div>
                <div style={{ textAlign: 'center', fontSize: 12.5, color: C.ink2, marginTop: 8, fontWeight: 500 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '24px 22px 0', background: C.sageSoft, borderRadius: 20, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon.Leaf size={22} color={C.sageDeep} />
          <span style={{ fontSize: 15.5, color: C.sageDeep, fontWeight: 600 }}>這個月你出現了 13 次</span>
        </div>
      </div>
      <TabBar active="record" navigate={navigate} />
    </Screen>
  )
}
```

- [ ] **Step 3: Replace `src/screens/tabs/Friends.jsx`**

```jsx
import { C, Screen, TabBar, Icon } from '../../design-system'

export default function Friends({ navigate }) {
  const friends = [
    { n: '小雨', c: '#D9A87C', s: '今天有動', on: true,  poked: false },
    { n: '阿哲', c: '#9DB888', s: '今天有動', on: true,  poked: true  },
    { n: '庭',   c: '#C9B6D6', s: '3 天沒出現了', on: false, poked: false },
    { n: '宥',   c: '#E2C08C', s: '今天有動', on: true,  poked: false },
    { n: 'Kai',  c: '#9CC3C9', s: '2 天沒出現了', on: false, poked: false },
  ]
  return (
    <Screen>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: 0, padding: '6px 26px 18px' }}>一起動</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 22px' }}>
          {friends.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: C.card, borderRadius: 20, border: `1px solid ${C.lineSoft}` }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, background: f.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{f.n[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>{f.n}</div>
                <div style={{ fontSize: 13.5, color: f.on ? C.sageDeep : C.ink3, marginTop: 2, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {f.on && <Icon.Leaf size={14} color={C.sageDeep} />}{f.s}
                </div>
              </div>
              {f.poked ? (
                <div style={{ padding: '9px 16px', borderRadius: 14, background: C.bgWarm, color: C.ink3, fontSize: 14, fontWeight: 600 }}>已戳</div>
              ) : (
                <div style={{ padding: '9px 14px', borderRadius: 14, border: `1.5px solid ${C.clay}`, color: C.clayDeep, fontSize: 14, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <Icon.Poke size={15} color={C.clayDeep} />戳一下
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 26px 18px' }}>
        <button style={{ width: '100%', height: 52, borderRadius: 18, border: 'none', background: C.claySoft, color: C.clayDeep,
          fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>＋ 邀請朋友一起動</button>
      </div>
      <TabBar active="friends" navigate={navigate} />
    </Screen>
  )
}
```

- [ ] **Step 4: Replace `src/screens/tabs/Me.jsx`**

```jsx
import { C, FN, Screen, TabBar, Icon } from '../../design-system'

export default function Me({ navigate }) {
  const badges = [
    { t: '第一步',     icon: '🌱', on: true  },
    { t: '開始習慣了', icon: '☀️', on: true  },
    { t: '常出現的人', icon: '🌿', on: true, cur: true },
    { t: '有在照顧自己', icon: '🍃', on: false, cond: '再出現 6 次' },
    { t: '是你的一部分', icon: '🌳', on: false, cond: '再出現 36 次' },
  ]
  const setting = (t, last) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '15px 18px',
      borderBottom: last ? 'none' : `1px solid ${C.lineSoft}` }}>
      <span style={{ flex: 1, fontSize: 16, color: C.ink, fontWeight: 500 }}>{t}</span>
      <Icon.Chevron dir="right" size={18} color={C.ink3} />
    </div>
  )
  return (
    <Screen>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 26px 0' }}>
          <div style={{ width: 76, height: 76, borderRadius: 38, background: 'linear-gradient(150deg,#E9BE97,#C9B6D6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 30 }}>禾</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: C.ink, marginTop: 12 }}>禾禾</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
            <span style={{ fontSize: 15, color: C.ink2 }}>共</span>
            <span style={{ fontFamily: FN, fontSize: 40, fontWeight: 700, color: C.clayDeep, lineHeight: 1 }}>24</span>
            <span style={{ fontSize: 15, color: C.ink2 }}>個印記</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12, background: C.sageSoft, padding: '7px 16px', borderRadius: 20 }}>
            <span style={{ fontSize: 15 }}>🌿</span>
            <span style={{ fontSize: 14.5, fontWeight: 600, color: C.sageDeep }}>常出現的人</span>
          </div>
        </div>

        <div style={{ marginTop: 26 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.ink2, padding: '0 26px 12px' }}>稱號</div>
          <div style={{ display: 'flex', gap: 12, padding: '0 26px', overflow: 'hidden' }}>
            {badges.map((b, i) => (
              <div key={i} style={{ flexShrink: 0, width: 104, padding: '16px 10px', borderRadius: 18, textAlign: 'center',
                background: b.on ? (b.cur ? C.clayWash : C.card) : C.bgWarm,
                border: `1.5px solid ${b.cur ? C.clay : (b.on ? C.line : 'transparent')}`,
                opacity: b.on ? 1 : 0.85 }}>
                <div style={{ fontSize: 30, filter: b.on ? 'none' : 'grayscale(1)', opacity: b.on ? 1 : 0.5 }}>{b.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: b.on ? C.ink : C.ink3, marginTop: 8, lineHeight: 1.3 }}>{b.t}</div>
                {!b.on && <div style={{ fontSize: 11, color: C.ink3, marginTop: 5, lineHeight: 1.3 }}>{b.cond}解鎖</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '24px 22px 0', padding: '16px 18px', background: C.card, borderRadius: 18,
          display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.lineSoft}` }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, color: C.ink3, fontWeight: 600, marginBottom: 4 }}>我的目標</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>找回照顧自己的感覺</div>
          </div>
          <Icon.Edit size={19} color={C.ink3} />
        </div>

        <div style={{ margin: '16px 22px 0', background: C.card, borderRadius: 18, border: `1px solid ${C.lineSoft}`, overflow: 'hidden' }}>
          {setting('容易運動的時間')}
          {setting('預設運動地點')}
          {setting('好友可見性')}
          {setting('通知設定', true)}
        </div>
      </div>
      <TabBar active="me" navigate={navigate} />
    </Screen>
  )
}
```

- [ ] **Step 5: Verify in browser**

Navigate to Home (via onboarding flow). Verify:
- Home tab shows task card; clicking 開始 goes to Timer stub
- Bottom tab bar switches between Home / Record / Friends / Me
- All four tab screens render without errors

- [ ] **Step 6: Commit**

```bash
git add src/screens/tabs/
git commit -m "feat: tab screens home/record/friends/me"
```

---

## Task 6: Flow Screens + Camera

**Files:** `src/screens/flow/Timer.jsx`, `src/screens/flow/Camera.jsx`, `src/screens/flow/Done.jsx`

- [ ] **Step 1: Replace `src/screens/flow/Timer.jsx`**

```jsx
import { C, FN, FZ, Screen, Btn, HomeBar, Icon } from '../../design-system'

export default function Timer({ navigate }) {
  const R = 132, sw = 10, circ = 2 * Math.PI * R
  const pct = 0.42
  return (
    <Screen bg="linear-gradient(180deg, #FBF2E6 0%, #F6EFE1 100%)">
      <div style={{ padding: '4px 24px 0' }}>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.7)',
          border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer' }} onClick={() => navigate('home')}>
          <Icon.Close size={20} color={C.ink2} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 19, fontWeight: 600, color: C.ink2, marginBottom: 36, letterSpacing: 1 }}>去操場走走</p>
        <div style={{ position: 'relative', width: 300, height: 300 }}>
          <svg width="300" height="300" viewBox="0 0 300 300" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="150" cy="150" r={R} fill="none" stroke={C.sand} strokeWidth={sw} />
            <circle cx="150" cy="150" r={R} fill="none" stroke={C.clay} strokeWidth={sw} strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: FN, fontSize: 76, fontWeight: 600, color: C.ink, letterSpacing: 1, fontVariantNumeric: 'tabular-nums' }}>02:54</span>
            <span style={{ fontSize: 14, color: C.ink3, marginTop: 2, letterSpacing: 2 }}>慢慢來就好</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 28px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Btn onClick={() => navigate('camera')}>我完成了</Btn>
        <p style={{ fontSize: 13.5, color: C.ink3, marginTop: 14 }}>或等計時結束</p>
      </div>
      <HomeBar />
    </Screen>
  )
}
```

- [ ] **Step 2: Replace `src/screens/flow/Done.jsx`**

```jsx
import { C, FN, FZ, Screen, Btn, HomeBar, Icon } from '../../design-system'

export default function Done({ navigate }) {
  const rings = [200, 300, 410]
  return (
    <Screen bg="radial-gradient(circle at 50% 42%, #FBEFE0 0%, #F6EFE1 55%, #EFEAD9 100%)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 36px' }}>
        {rings.map((d, i) => (
          <div key={i} style={{ position: 'absolute', top: '38%', width: d, height: d, borderRadius: '50%',
            border: `1.5px solid rgba(216,154,114,${0.22 - i * 0.06})` }} />
        ))}
        {[[60,180],[300,150],[80,560],[320,520],[180,90],[210,640]].map((p, i) => (
          <div key={i} style={{ position: 'absolute', left: p[0], top: p[1], width: 7, height: 7, borderRadius: 4,
            background: i % 2 ? C.sage : C.clay, opacity: 0.5 }} />
        ))}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ marginBottom: 26 }}><Icon.Leaf size={40} color={C.sage} /></div>
          <h1 style={{ fontSize: 33, fontWeight: 700, color: C.ink, margin: 0, letterSpacing: 1 }}>你今天有出現。</h1>
          <p style={{ fontSize: 17, color: C.ink2, marginTop: 22, lineHeight: 1.6 }}>
            這是你的第 <span style={{ fontFamily: FN, fontSize: 30, fontWeight: 700, color: C.clayDeep, verticalAlign: '-3px', margin: '0 2px' }}>12</span> 個印記
          </p>
        </div>
      </div>
      <div style={{ padding: '0 28px 18px' }}>
        <Btn kind="sage" onClick={() => navigate('home')}>回首頁</Btn>
      </div>
      <HomeBar />
    </Screen>
  )
}
```

- [ ] **Step 3: Replace `src/screens/flow/Camera.jsx`** (real getUserMedia)

```jsx
import { useEffect, useRef } from 'react'
import { C, FN, Screen, HomeBar } from '../../design-system'

export default function Camera({ navigate }) {
  const videoRef = useRef(null)

  useEffect(() => {
    let stream
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then(s => {
        stream = s
        if (videoRef.current) videoRef.current.srcObject = s
      })
      .catch(() => {})
    return () => stream?.getTracks().forEach(t => t.stop())
  }, [])

  return (
    <Screen bg="#1F1B16" light>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 22px 0' }}>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.92)', fontSize: 18, fontWeight: 500, margin: '6px 0 18px', letterSpacing: 0.5 }}>
          記錄一下今天的樣子？
        </p>
        <div style={{ flex: 1, borderRadius: 28, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(160deg, #E9C9A3 0%, #D9A87C 40%, #B9CBA8 100%)',
          boxShadow: 'inset 0 0 80px rgba(60,40,20,0.4)' }}>
          <video ref={videoRef} autoPlay playsInline muted
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 90px 30px rgba(40,28,16,0.35)', borderRadius: 28, pointerEvents: 'none' }} />
          {[
            { top: 18, left: 18, borderTop: '2px solid #fff', borderLeft: '2px solid #fff', borderRadius: '10px 0 0 0' },
            { top: 18, right: 18, borderTop: '2px solid #fff', borderRight: '2px solid #fff', borderRadius: '0 10px 0 0' },
            { bottom: 18, left: 18, borderBottom: '2px solid #fff', borderLeft: '2px solid #fff', borderRadius: '0 0 0 10px' },
            { bottom: 18, right: 18, borderBottom: '2px solid #fff', borderRight: '2px solid #fff', borderRadius: '0 0 10px 0' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 26, height: 26, opacity: 0.85, ...s }} />
          ))}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(31,27,22,0.55)', color: '#fff', fontFamily: FN, fontWeight: 600,
            fontSize: 13, padding: '5px 14px', borderRadius: 20, letterSpacing: 1 }}>3 秒</div>
        </div>
      </div>
      <div style={{ height: 150, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <button onClick={() => navigate('done')}
          style={{ width: 80, height: 80, borderRadius: 40, border: '4px solid rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer' }}>
          <div style={{ width: 62, height: 62, borderRadius: 31, background: '#fff' }} />
        </button>
        <span onClick={() => navigate('done')}
          style={{ position: 'absolute', right: 34, color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          跳過
        </span>
      </div>
      <HomeBar light />
    </Screen>
  )
}
```

- [ ] **Step 4: Verify flow in browser**

Walk: Home → 開始 → Timer (see countdown ring) → 我完成了 → Camera (browser asks for camera permission; grant it; see live front-camera feed) → click shutter → Done (see celebration + 印記 count) → 回首頁 → Home.

Camera fallback: if permission denied, the gradient background shows through (no error, no crash).

- [ ] **Step 5: Commit**

```bash
git add src/screens/flow/
git commit -m "feat: flow screens timer/camera/done with real camera"
```

---

## Task 7: PWA Icons + Config

**Files:** `src/icon.svg`, `scripts/gen-icons.mjs`, `public/icons/icon-192.png`, `public/icons/icon-512.png`, `vite.config.js`

- [ ] **Step 1: Create `src/icon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="114" fill="#D89A72"/>
  <path d="M356 108 C210 108 156 176 156 308 c0 18 0 27 7 36 99 9 281-57 281-288z"
        fill="#FBF7EF" opacity="0.92"/>
  <path d="M300 156 C208 208 160 268 133 356"
        stroke="#FBF7EF" stroke-width="22" stroke-linecap="round" fill="none"/>
</svg>
```

- [ ] **Step 2: Create `scripts/gen-icons.mjs`**

```mjs
import sharp from 'sharp'
import { readFileSync } from 'fs'
import { mkdir } from 'fs/promises'

const svg = readFileSync('./src/icon.svg')
await mkdir('./public/icons', { recursive: true })
await sharp(svg).resize(512, 512).png().toFile('./public/icons/icon-512.png')
await sharp(svg).resize(192, 192).png().toFile('./public/icons/icon-192.png')
console.log('✓ Icons written to public/icons/')
```

- [ ] **Step 3: Generate the icons**

```bash
npm run gen-icons
```

Expected output: `✓ Icons written to public/icons/`

Verify `public/icons/icon-192.png` and `public/icons/icon-512.png` exist and are non-zero bytes.

- [ ] **Step 4: Update `vite.config.js` to add vite-plugin-pwa**

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
        description: '每天只要動一下，就夠了',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FBF7EF',
        theme_color: '#D89A72',
        start_url: '/move-a-bit/',
        scope: '/move-a-bit/',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
```

- [ ] **Step 5: Test PWA installability locally**

```bash
npm run build
npm run preview
```

Open `http://localhost:4173/move-a-bit/` in Chrome. Open DevTools → Application → Manifest — should show app name "動一下", icons, display "standalone". Service Workers tab should show a registered worker.

- [ ] **Step 6: Commit**

```bash
git add src/icon.svg scripts/gen-icons.mjs public/icons/ vite.config.js
git commit -m "feat: PWA manifest, service worker, and icons"
```

---

## Task 8: GitHub Actions + First Deploy

**Files:** `.github/workflows/deploy.yml`

- [ ] **Step 1: Create GitHub repo**

Go to https://github.com/new and create a repo named exactly `move-a-bit` (public). Do **not** initialize with README or .gitignore (the repo must be empty).

- [ ] **Step 2: Add remote and push**

```bash
git remote add origin https://github.com/<your-username>/move-a-bit.git
git branch -M main
git push -u origin main
```

Replace `<your-username>` with your GitHub username.

- [ ] **Step 3: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 4: Enable GitHub Pages in repo settings**

Go to the repo on GitHub → Settings → Pages → Source: **GitHub Actions**. Save.

- [ ] **Step 5: Push the workflow file to trigger first deploy**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: GitHub Actions deploy to GitHub Pages"
git push
```

- [ ] **Step 6: Wait for deploy and verify**

Go to the repo → Actions tab. Wait for the workflow to complete (green checkmark, ~1-2 min).

Open `https://<your-username>.github.io/move-a-bit/` in your phone browser. Verify:
- App loads and shows the onboarding Welcome screen
- Walk through the full demo flow
- Camera screen requests permission and shows live front-camera feed
- Browser shows "Add to Home Screen" prompt (or use Share → Add to Home Screen on iOS)

Install to home screen, open from home screen — should open fullscreen with no browser chrome.
