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
