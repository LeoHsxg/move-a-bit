import { C, Screen, Btn, Icon } from './design-system'

export default function App() {
  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon.Leaf size={40} color={C.sage} />
      </div>
      <div style={{ padding: '0 28px 18px' }}>
        <Btn onClick={() => {}}>設計系統 OK</Btn>
      </div>
    </Screen>
  )
}
