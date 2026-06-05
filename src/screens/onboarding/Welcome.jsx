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
