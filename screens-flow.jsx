// 動一下 — Task flow screens (timer / camera / celebrate)

// 07 — Timer (immersive, no tab bar)
function FlowTimer() {
  const R = 132, sw = 10, circ = 2 * Math.PI * R;
  const pct = 0.42; // elapsed
  return (
    <Screen bg="linear-gradient(180deg, #FBF2E6 0%, #F6EFE1 100%)">
      <div style={{ padding: '4px 24px 0' }}>
        <div style={{ width: 44, height: 44, borderRadius: 22, background: 'rgba(255,255,255,0.7)', border: `1px solid ${C.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon.Close size={20} color={C.ink2} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: 19, fontWeight: 600, color: C.ink2, marginBottom: 36, letterSpacing: 1 }}>去操場走走</p>
        <div style={{ position: 'relative', width: 300, height: 300 }}>
          <svg width="300" height="300" viewBox="0 0 300 300" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="150" cy="150" r={R} fill="none" stroke={C.sand} strokeWidth={sw} />
            <circle cx="150" cy="150" r={R} fill="none" stroke={C.clay} strokeWidth={sw} strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: FN, fontSize: 76, fontWeight: 600, color: C.ink, letterSpacing: 1, fontVariantNumeric: 'tabular-nums' }}>02:54</span>
            <span style={{ fontSize: 14, color: C.ink3, marginTop: 2, letterSpacing: 2 }}>慢慢來就好</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 28px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Btn>我完成了</Btn>
        <p style={{ fontSize: 13.5, color: C.ink3, marginTop: 14 }}>或等計時結束</p>
      </div>
      <HomeBar />
    </Screen>
  );
}

// 08 — 3-second camera (Polaroid feel)
function FlowCamera() {
  return (
    <Screen bg="#1F1B16" light>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '4px 22px 0' }}>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.92)', fontSize: 18, fontWeight: 500, margin: '6px 0 18px', letterSpacing: 0.5 }}>記錄一下今天的樣子？</p>
        {/* viewfinder */}
        <div style={{ flex: 1, borderRadius: 28, overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(160deg, #E9C9A3 0%, #D9A87C 40%, #B9CBA8 100%)',
          boxShadow: 'inset 0 0 80px rgba(60,40,20,0.4)' }}>
          {/* soft polaroid vignette */}
          <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 90px 30px rgba(40,28,16,0.35)', borderRadius: 28 }} />
          {/* framing corners */}
          {[['18px','18px','2px 0 0 2px'],['18px','18px','2px 2px 0 0',true],['','18px','0 0 2px 2px',false,true],['','18px','2px 0 0 2px',true,true]].map((_,i)=>{
            const pos = [{top:18,left:18},{top:18,right:18},{bottom:18,left:18},{bottom:18,right:18}][i];
            const br = ['10px 0 0 0','0 10px 0 0','0 0 0 10px','0 0 10px 0'][i];
            const bd = [{borderTop:'2px solid #fff',borderLeft:'2px solid #fff'},{borderTop:'2px solid #fff',borderRight:'2px solid #fff'},{borderBottom:'2px solid #fff',borderLeft:'2px solid #fff'},{borderBottom:'2px solid #fff',borderRight:'2px solid #fff'}][i];
            return <div key={i} style={{ position:'absolute', width:26, height:26, opacity:0.85, borderRadius:br, ...bd, ...pos }} />;
          })}
          <div style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', background: 'rgba(31,27,22,0.55)', color: '#fff', fontFamily: FN, fontWeight: 600, fontSize: 13, padding: '5px 14px', borderRadius: 20, letterSpacing: 1 }}>3 秒</div>
        </div>
      </div>
      {/* controls */}
      <div style={{ height: 150, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{ width: 80, height: 80, borderRadius: 40, border: '4px solid rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 62, height: 62, borderRadius: 31, background: '#fff' }} />
        </div>
        <span style={{ position: 'absolute', right: 34, color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 500 }}>跳過</span>
      </div>
      <HomeBar light />
    </Screen>
  );
}

// 09 — Completion / celebration
function FlowDone() {
  const rings = [200, 300, 410];
  return (
    <Screen bg="radial-gradient(circle at 50% 42%, #FBEFE0 0%, #F6EFE1 55%, #EFEAD9 100%)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 36px' }}>
        {/* gentle ripple rings */}
        {rings.map((d, i) => (
          <div key={i} style={{ position: 'absolute', top: '38%', width: d, height: d, borderRadius: '50%',
            border: `1.5px solid rgba(216,154,114,${0.22 - i * 0.06})` }} />
        ))}
        {/* soft drifting dots */}
        {[[60,180],[300,150],[80,560],[320,520],[180,90],[210,640]].map((p,i)=>(
          <div key={i} style={{ position:'absolute', left:p[0], top:p[1], width:7, height:7, borderRadius:4,
            background: i%2 ? C.sage : C.clay, opacity:0.5 }} />
        ))}
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ marginBottom: 26 }}><Icon.Leaf size={40} color={C.sage} /></div>
          <h1 style={{ fontSize: 33, fontWeight: 700, color: C.ink, margin: 0, letterSpacing: 1 }}>你今天有出現。</h1>
          <p style={{ fontSize: 17, color: C.ink2, marginTop: 22, lineHeight: 1.6 }}>
            這是你的第 <span style={{ fontFamily: FN, fontSize: 30, fontWeight: 700, color: C.clayDeep, verticalAlign: '-3px', margin: '0 2px' }}>12</span> 個印記
          </p>
        </div>
      </div>
      <div style={{ padding: '0 28px 18px' }}><Btn kind="sage">回首頁</Btn></div>
      <HomeBar />
    </Screen>
  );
}

Object.assign(window, { FlowTimer, FlowCamera, FlowDone });
