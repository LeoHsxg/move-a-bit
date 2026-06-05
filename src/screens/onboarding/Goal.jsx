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
