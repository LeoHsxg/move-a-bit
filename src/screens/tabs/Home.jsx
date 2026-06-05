import { C, FN, FZ, Screen, TabBar, Icon } from "../../design-system";

export default function Home({ navigate }) {
  return (
    <Screen>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 26px 0" }}>
        <div>
          <div style={{ fontSize: 15, color: C.ink3, fontWeight: 500 }}>下課了</div>
          <div style={{ fontSize: 25, fontWeight: 700, color: C.ink, marginTop: 2 }}>嗨，今天還好嗎</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: C.sageSoft, padding: "8px 14px", borderRadius: 22 }}>
          <Icon.Leaf size={18} color={C.sageDeep} />
          <span style={{ fontFamily: FN, fontSize: 18, fontWeight: 700, color: C.sageDeep }}>12</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 26px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 14 }}>
          <span style={{ fontSize: 15, color: C.ink2, fontWeight: 500 }}>
            這週已經動了 <b style={{ color: C.ink, fontWeight: 700 }}>3</b> 次
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 1, 1, 0, 0].map((on, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: 6, background: on ? C.sage : C.sand }} />
            ))}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            borderRadius: 30,
            padding: "30px 28px 26px",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(165deg, #F2D8BE 0%, #E9BE97 100%)",
            boxShadow: "0 18px 40px rgba(201,138,90,0.28)",
          }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.clayDeep, letterSpacing: 2, opacity: 0.85 }}>今天的任務</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: "#5E4632", lineHeight: 1.25, letterSpacing: 1 }}>
              去操場
              <br />
              走走
            </div>
            <div style={{ fontSize: 16, color: "#8A6B52", marginTop: 16, lineHeight: 1.55 }}>走到操場待一下就算完成</div>
          </div>
          <button
            onClick={() => navigate("timer")}
            style={{
              height: 60,
              borderRadius: 20,
              border: "none",
              background: "#5E4632",
              color: "#FBF1E5",
              fontFamily: FZ,
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              cursor: "pointer",
            }}>
            開始 <Icon.Play size={20} color="#FBF1E5" />
          </button>
        </div>
      </div>
      <TabBar active="home" navigate={navigate} />
    </Screen>
  );
}

