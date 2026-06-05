// 動一下 — Main tab screens (home / record / friends / profile)

// ── 06 Home ──────────────────────────────────────────────────
function TabHome() {
  return (
    <Screen>
      {/* greeting */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 26px 0' }}>
        <div>
          <div style={{ fontSize: 15, color: C.ink3, fontWeight: 500 }}>下課了</div>
          <div style={{ fontSize: 25, fontWeight: 700, color: C.ink, marginTop: 2 }}>嗨，今天還好嗎</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.sageSoft, padding: '8px 14px', borderRadius: 22 }}>
          <Icon.Leaf size={18} color={C.sageDeep} />
          <span style={{ fontFamily: FN, fontSize: 18, fontWeight: 700, color: C.sageDeep }}>12</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '22px 26px 0' }}>
        {/* today task card */}
        <div style={{ flex: 1, borderRadius: 30, padding: '30px 28px 26px', display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(165deg, #F2D8BE 0%, #E9BE97 100%)',
          boxShadow: '0 18px 40px rgba(201,138,90,0.28)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.clayDeep, letterSpacing: 2, opacity: 0.85 }}>今天的任務</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: '#5E4632', lineHeight: 1.25, letterSpacing: 1 }}>去操場<br/>走走</div>
            <div style={{ fontSize: 16, color: '#8A6B52', marginTop: 16, lineHeight: 1.55 }}>走到操場待一下就算完成</div>
          </div>
          <button style={{ height: 60, borderRadius: 20, border: 'none', background: '#5E4632', color: '#FBF1E5',
            fontFamily: FZ, fontWeight: 700, fontSize: 19, letterSpacing: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer' }}>
            開始 <Icon.Play size={20} color="#FBF1E5" />
          </button>
        </div>

        {/* week progress */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 6px 18px' }}>
          <span style={{ fontSize: 15.5, color: C.ink2, fontWeight: 500 }}>這週已經動了 <b style={{ color: C.ink, fontWeight: 700 }}>3</b> 次</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1,1,1,0,0].map((on,i)=>(
              <div key={i} style={{ width: 11, height: 11, borderRadius: 6, background: on ? C.sage : C.sand }} />
            ))}
          </div>
        </div>
      </div>
      <TabBar active="home" />
    </Screen>
  );
}

// ── 10 Record (印記 calendar) ─────────────────────────────────
function TabRecord() {
  const weekHead = ['一','二','三','四','五','六','日'];
  // June 2026: 1st is a Monday → starts at col 0; 30 days
  const marks = new Set([2,3,5,6,9,12,13,16,19,20,23,26,27]);
  const today = 27;
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const cell = (d) => {
    const has = marks.has(d), isToday = d === today;
    return (
      <div key={d} style={{ height: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <span style={{ fontSize: 14, color: isToday ? C.clayDeep : (has ? C.ink : C.ink3), fontWeight: isToday ? 700 : 500,
          width: 26, height: 26, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: isToday ? `1.5px solid ${C.clay}` : '1.5px solid transparent' }}>{d}</span>
        {has ? <div style={{ width: 6, height: 6, borderRadius: 3, background: C.sage }} /> : <div style={{ height: 6 }} />}
      </div>
    );
  };
  const vids = [['週四','#D9A87C'],['週三','#B9CBA8'],['週日','#E2C08C'],['週六','#C9B6D6']];
  return (
    <Screen bg={C.bg}>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: 0, padding: '6px 26px 0' }}>我的印記</h1>

        {/* calendar */}
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

        {/* video review */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px 14px' }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>最近的樣子</span>
            <span style={{ fontSize: 14, color: C.clayDeep, fontWeight: 600 }}>查看全部</span>
          </div>
          <div style={{ display: 'flex', gap: 13, padding: '0 26px', overflow: 'hidden' }}>
            {vids.map(([d, col], i) => (
              <div key={i} style={{ flexShrink: 0, width: 96 }}>
                <div style={{ width: 96, height: 128, borderRadius: 18, background: `linear-gradient(155deg, ${col}, #E9DFCB)`, position: 'relative',
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

        {/* month summary */}
        <div style={{ margin: '24px 22px 0', background: C.sageSoft, borderRadius: 20, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon.Leaf size={22} color={C.sageDeep} />
          <span style={{ fontSize: 15.5, color: C.sageDeep, fontWeight: 600 }}>這個月你出現了 13 次</span>
        </div>
      </div>
      <TabBar active="record" />
    </Screen>
  );
}

// ── 11 Friends (一起動) ───────────────────────────────────────
function TabFriends() {
  const friends = [
    { n: '小雨', c: '#D9A87C', s: '今天有動', on: true, poked: false },
    { n: '阿哲', c: '#9DB888', s: '今天有動', on: true, poked: true },
    { n: '庭', c: '#C9B6D6', s: '3 天沒出現了', on: false, poked: false },
    { n: '宥', c: '#E2C08C', s: '今天有動', on: true, poked: false },
    { n: 'Kai', c: '#9CC3C9', s: '2 天沒出現了', on: false, poked: false },
  ];
  return (
    <Screen>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: C.ink, margin: 0, padding: '6px 26px 18px' }}>一起動</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 22px' }}>
          {friends.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: C.card, borderRadius: 20, border: `1px solid ${C.lineSoft}` }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, background: f.c, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>{f.n[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>{f.n}</div>
                <div style={{ fontSize: 13.5, color: f.on ? C.sageDeep : C.ink3, marginTop: 2, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 5 }}>
                  {f.on && <Icon.Leaf size={14} color={C.sageDeep} />}{f.s}
                </div>
              </div>
              {f.poked ? (
                <div style={{ padding: '9px 16px', borderRadius: 14, background: C.bgWarm, color: C.ink3, fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap' }}>已戳</div>
              ) : (
                <div style={{ padding: '9px 14px', borderRadius: 14, border: `1.5px solid ${C.clay}`, color: C.clayDeep, fontSize: 14, fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                  <Icon.Poke size={15} color={C.clayDeep} />戳一下
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 26px 18px' }}>
        <Btn kind="soft" style={{ height: 52, fontSize: 16, whiteSpace: 'nowrap' }}>＋ 邀請朋友一起動</Btn>
      </div>
      <TabBar active="friends" />
    </Screen>
  );
}

// ── 12 Profile (我的) ─────────────────────────────────────────
function TabMe() {
  const badges = [
    { t: '第一步', icon: '🌱', on: true },
    { t: '開始習慣了', icon: '☀️', on: true },
    { t: '常出現的人', icon: '🌿', on: true, cur: true },
    { t: '有在照顧自己', icon: '🍃', on: false, cond: '再出現 6 次' },
    { t: '是你的一部分', icon: '🌳', on: false, cond: '再出現 36 次' },
  ];
  const setting = (t, last) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '15px 18px', borderBottom: last ? 'none' : `1px solid ${C.lineSoft}` }}>
      <span style={{ flex: 1, fontSize: 16, color: C.ink, fontWeight: 500 }}>{t}</span>
      <Icon.Chevron dir="right" size={18} color={C.ink3} />
    </div>
  );
  return (
    <Screen>
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* identity */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 26px 0' }}>
          <div style={{ width: 76, height: 76, borderRadius: 38, background: 'linear-gradient(150deg,#E9BE97,#C9B6D6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 30 }}>禾</div>
          <div style={{ fontSize: 21, fontWeight: 700, color: C.ink, marginTop: 12 }}>禾禾</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
            <span style={{ fontSize: 15, color: C.ink2 }}>共</span>
            <span style={{ fontFamily: FN, fontSize: 40, fontWeight: 700, color: C.clayDeep, lineHeight: 1 }}>24</span>
            <span style={{ fontSize: 15, color: C.ink2 }}>個印記</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 12, background: C.sageSoft, padding: '7px 16px', borderRadius: 20 }}>
            <span style={{ fontSize: 15 }}>🌿</span>
            <span style={{ fontSize: 14.5, fontWeight: 600, color: C.sageDeep }}>常出現的人</span>
          </div>
        </div>

        {/* badges */}
        <div style={{ marginTop: 26 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.ink2, padding: '0 26px 12px' }}>稱號</div>
          <div style={{ display: 'flex', gap: 12, padding: '0 26px', overflow: 'hidden' }}>
            {badges.map((b, i) => (
              <div key={i} style={{ flexShrink: 0, width: 104, padding: '16px 10px', borderRadius: 18, textAlign: 'center',
                background: b.on ? (b.cur ? C.clayWash : C.card) : C.bgWarm,
                border: `1.5px solid ${b.cur ? C.clay : (b.on ? C.line : 'transparent')}`,
                opacity: b.on ? 1 : 0.85 }}>
                <div style={{ fontSize: 30, filter: b.on ? 'none' : 'grayscale(1)', opacity: b.on ? 1 : 0.5 }}>{b.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: b.on ? C.ink : C.ink3, marginTop: 8, lineHeight: 1.3 }}>{b.t}</div>
                {!b.on && <div style={{ fontSize: 11, color: C.ink3, marginTop: 5, lineHeight: 1.3 }}>{b.cond}解鎖</div>}
              </div>
            ))}
          </div>
        </div>

        {/* goal */}
        <div style={{ margin: '24px 22px 0', padding: '16px 18px', background: C.card, borderRadius: 18, display: 'flex', alignItems: 'center', gap: 12, border: `1px solid ${C.lineSoft}` }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, color: C.ink3, fontWeight: 600, marginBottom: 4 }}>我的目標</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>找回照顧自己的感覺</div>
          </div>
          <Icon.Edit size={19} color={C.ink3} />
        </div>

        {/* settings */}
        <div style={{ margin: '16px 22px 0', background: C.card, borderRadius: 18, border: `1px solid ${C.lineSoft}`, overflow: 'hidden' }}>
          {setting('容易運動的時間')}
          {setting('預設運動地點')}
          {setting('好友可見性')}
          {setting('通知設定', true)}
        </div>
      </div>
      <TabBar active="me" />
    </Screen>
  );
}

Object.assign(window, { TabHome, TabRecord, TabFriends, TabMe });
