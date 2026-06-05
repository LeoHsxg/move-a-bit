// 動一下 — Onboarding screens (01–05)

// 01 — Welcome
function OnbWelcome() {
  return (
    <Screen bg="linear-gradient(170deg, #FBF1E4 0%, #F6EFE1 45%, #EDEAD8 100%)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 40px', position: 'relative' }}>
        {/* soft warm halo */}
        <div style={{ position: 'absolute', top: 150, width: 320, height: 320, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(216,154,114,0.16) 0%, rgba(216,154,114,0) 70%)' }} />
        <div style={{ marginBottom: 26, position: 'relative' }}><Icon.Leaf size={44} color={C.sage} /></div>
        <h1 style={{ fontFamily: FZ, fontSize: 58, fontWeight: 700, color: C.ink, letterSpacing: 4, margin: 0, position: 'relative' }}>動一下</h1>
        <p style={{ fontSize: 18, color: C.ink2, marginTop: 18, fontWeight: 500, letterSpacing: 0.5 }}>每天只要動一下，就夠了</p>
      </div>
      <div style={{ padding: '0 28px 18px' }}>
        <Btn>開始</Btn>
      </div>
      <HomeBar />
    </Screen>
  );
}

// 02 — Choose the big goal
function OnbGoal() {
  return (
    <Screen>
      <Progress step={2} back />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '34px 26px 0' }}>
        <h2 style={{ fontSize: 27, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>你最想要的是什麼？</h2>
        <p style={{ fontSize: 15, color: C.ink2, marginTop: 10, lineHeight: 1.5 }}>不用很精確，選一個最有共鳴的就好</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
          <ChoiceCard title="變健康" sub="讓身體好一點" />
          <ChoiceCard title="改善體態" sub="讓自己看起來更喜歡" selected />
          <ChoiceCard title="找回照顧自己的感覺" sub="重新掌控生活節奏" />
        </div>
      </div>
      <div style={{ padding: '0 26px 18px' }}><Btn>下一步</Btn></div>
      <HomeBar />
    </Screen>
  );
}

// 03 — Easy times (multi-select chips)
function OnbTime() {
  return (
    <Screen>
      <Progress step={3} back />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '34px 26px 0' }}>
        <h2 style={{ fontSize: 27, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>你平常什麼時候<br/>比較容易動？</h2>
        <p style={{ fontSize: 15, color: C.ink2, marginTop: 10, lineHeight: 1.5 }}>可以複選，之後可以改</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28, alignItems: 'flex-start' }}>
          <Chip selected>起床後上課前</Chip>
          <Chip>下課後（回宿舍前）</Chip>
          <Chip selected>晚飯後</Chip>
        </div>
      </div>
      <div style={{ padding: '0 26px 18px' }}><Btn>下一步</Btn></div>
      <HomeBar />
    </Screen>
  );
}

// 04 — Default place (single select + custom)
function OnbPlace() {
  const item = (t, sel) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '16px 18px', borderRadius: 16,
      background: sel ? C.clayWash : C.card, border: `1.5px solid ${sel ? C.clay : C.line}` }}>
      <Icon.Pin size={20} color={sel ? C.clayDeep : C.ink3} />
      <span style={{ flex: 1, fontSize: 16.5, fontWeight: 600, color: C.ink }}>{t}</span>
      {sel && <Icon.Check size={15} color={C.clayDeep} />}
    </div>
  );
  return (
    <Screen>
      <Progress step={4} back />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '30px 26px 0', overflow: 'hidden' }}>
        <h2 style={{ fontSize: 27, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>你最常在哪裡動？</h2>
        <p style={{ fontSize: 15, color: C.ink2, marginTop: 9, lineHeight: 1.5 }}>App 靠近這裡時會輕輕提醒你</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 22 }}>
          {item('學校操場 / 運動場', true)}
          {item('學校健身房', false)}
          {item('附近公園', false)}
          {item('宿舍地板（居家）', false)}
          <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '16px 18px', borderRadius: 16, background: C.card, border: `1.5px dashed ${C.sand}` }}>
            <Icon.Edit size={19} color={C.ink3} />
            <span style={{ flex: 1, fontSize: 16.5, color: C.ink3 }}>自己輸入…</span>
          </div>
        </div>
      </div>
      <div style={{ padding: '0 26px 18px' }}>
        <Btn>下一步</Btn>
        <p style={{ textAlign: 'center', fontSize: 12.5, color: C.ink3, marginTop: 12 }}>之後可以在設定裡更改</p>
      </div>
      <HomeBar />
    </Screen>
  );
}

// 05 — Friend share preference (big radio cards)
function OnbShare() {
  const card = (title, sub, sel) => (
    <div style={{ padding: '22px 22px', borderRadius: 22,
      background: sel ? C.clayWash : C.card,
      border: `1.5px solid ${sel ? C.clay : C.line}`,
      boxShadow: sel ? '0 6px 18px rgba(192,127,84,0.14)' : '0 1px 2px rgba(74,68,60,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <div style={{ width: 24, height: 24, borderRadius: 12, flexShrink: 0, border: `2px solid ${sel ? C.clay : C.sand}`,
          background: sel ? C.clay : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {sel && <div style={{ width: 9, height: 9, borderRadius: 5, background: '#fff' }} />}
        </div>
        <span style={{ fontSize: 19, fontWeight: 700, color: C.ink }}>{title}</span>
      </div>
      <p style={{ fontSize: 14, color: C.ink2, lineHeight: 1.55, margin: '12px 0 0', paddingLeft: 37 }}>{sub}</p>
    </div>
  );
  return (
    <Screen>
      <Progress step={5} back />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '34px 26px 0' }}>
        <h2 style={{ fontSize: 27, fontWeight: 700, color: C.ink, margin: 0, lineHeight: 1.3 }}>要讓朋友看到<br/>你的進度嗎？</h2>
        <p style={{ fontSize: 15, color: C.ink2, marginTop: 10, lineHeight: 1.5 }}>只有你邀請的朋友才能看到，你也可以看到對方的</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 26 }}>
          {card('開放好友查看', '互相知道彼此有沒有在動，低壓陪伴', true)}
          {card('先保持私人', '之後可以在設定裡開啟', false)}
        </div>
      </div>
      <div style={{ padding: '0 26px 18px' }}><Btn>完成，開始動一下</Btn></div>
      <HomeBar />
    </Screen>
  );
}

Object.assign(window, { OnbWelcome, OnbGoal, OnbTime, OnbPlace, OnbShare });
