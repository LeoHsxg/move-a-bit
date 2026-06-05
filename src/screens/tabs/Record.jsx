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
