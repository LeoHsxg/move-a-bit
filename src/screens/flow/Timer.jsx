import { C, FN, Screen, Btn, HomeBar, Icon } from '../../design-system'

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
