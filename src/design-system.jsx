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
      width: '100%', height: '100dvh', background: bg, position: 'relative',
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
