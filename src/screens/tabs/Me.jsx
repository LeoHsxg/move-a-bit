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
