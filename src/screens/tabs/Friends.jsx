import { useState } from 'react'
import { C, Screen, TabBar, Icon } from '../../design-system'

export default function Friends({ navigate }) {
  const FRIENDS = [
    { n: '小雨', c: '#D9A87C', s: '今天有動', on: true  },
    { n: '阿哲', c: '#9DB888', s: '今天有動', on: true  },
    { n: '庭',   c: '#C9B6D6', s: '3 天沒出現了', on: false },
    { n: '宥',   c: '#E2C08C', s: '今天有動', on: true  },
    { n: 'Kai',  c: '#9CC3C9', s: '2 天沒出現了', on: false },
  ]
  const [poked, setPoked] = useState(new Set([1]))

  return (
    <Screen>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: 0, padding: '6px 26px 18px' }}>一起動</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 22px' }}>
          {FRIENDS.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: C.card, borderRadius: 20, border: `1px solid ${C.lineSoft}` }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, background: f.c,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{f.n[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>{f.n}</div>
                <div style={{ fontSize: 13.5, color: f.on ? C.sageDeep : C.ink3, marginTop: 2, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {f.on && <Icon.Leaf size={14} color={C.sageDeep} />}{f.s}
                </div>
              </div>
              {poked.has(i) ? (
                <div style={{ padding: '9px 16px', borderRadius: 14, background: C.bgWarm, color: C.ink3, fontSize: 14, fontWeight: 600 }}>已戳</div>
              ) : (
                <div onClick={() => setPoked(p => new Set([...p, i]))}
                  style={{ padding: '9px 14px', borderRadius: 14, border: `1.5px solid ${C.clay}`, color: C.clayDeep, fontSize: 14, fontWeight: 600,
                    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <Icon.Poke size={15} color={C.clayDeep} />戳一下
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 26px 18px' }}>
        <button style={{ width: '100%', height: 52, borderRadius: 18, border: 'none', background: C.claySoft, color: C.clayDeep,
          fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>＋ 邀請朋友一起動</button>
      </div>
      <TabBar active="friends" navigate={navigate} />
    </Screen>
  )
}
