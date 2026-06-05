import { C, FN, Screen, Btn, HomeBar, Icon } from '../../design-system'

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
