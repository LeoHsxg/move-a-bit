import { useEffect, useRef } from 'react'
import { C, FN, Screen, HomeBar } from '../../design-system'

export default function Camera({ navigate }) {
  const videoRef = useRef(null)

  useEffect(() => {
    let stream
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then(s => {
        stream = s
        if (videoRef.current) videoRef.current.srcObject = s
      })
      .catch(() => {})
    return () => stream?.getTracks().forEach(t => t.stop())
  }, [])

  return (
    <Screen bg="#1F1B16" light>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 22px 0' }}>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.92)', fontSize: 18, fontWeight: 500, margin: '6px 0 18px', letterSpacing: 0.5 }}>
          記錄一下今天的樣子？
        </p>
        <div style={{ flex: 1, borderRadius: 28, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(160deg, #E9C9A3 0%, #D9A87C 40%, #B9CBA8 100%)',
          boxShadow: 'inset 0 0 80px rgba(60,40,20,0.4)' }}>
          <video ref={videoRef} autoPlay playsInline muted
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 90px 30px rgba(40,28,16,0.35)', borderRadius: 28, pointerEvents: 'none' }} />
          {[
            { top: 18, left: 18, borderTop: '2px solid #fff', borderLeft: '2px solid #fff', borderRadius: '10px 0 0 0' },
            { top: 18, right: 18, borderTop: '2px solid #fff', borderRight: '2px solid #fff', borderRadius: '0 10px 0 0' },
            { bottom: 18, left: 18, borderBottom: '2px solid #fff', borderLeft: '2px solid #fff', borderRadius: '0 0 0 10px' },
            { bottom: 18, right: 18, borderBottom: '2px solid #fff', borderRight: '2px solid #fff', borderRadius: '0 0 10px 0' },
          ].map((s, i) => (
            <div key={i} style={{ position: 'absolute', width: 26, height: 26, opacity: 0.85, ...s }} />
          ))}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(31,27,22,0.55)', color: '#fff', fontFamily: FN, fontWeight: 600,
            fontSize: 13, padding: '5px 14px', borderRadius: 20, letterSpacing: 1 }}>3 秒</div>
        </div>
      </div>
      <div style={{ height: 150, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <button onClick={() => navigate('done')}
          style={{ width: 80, height: 80, borderRadius: 40, border: '4px solid rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', cursor: 'pointer' }}>
          <div style={{ width: 62, height: 62, borderRadius: 31, background: '#fff' }} />
        </button>
        <span onClick={() => navigate('done')}
          style={{ position: 'absolute', right: 34, color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          跳過
        </span>
      </div>
      <HomeBar light />
    </Screen>
  )
}
