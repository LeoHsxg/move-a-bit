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
