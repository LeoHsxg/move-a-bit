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
