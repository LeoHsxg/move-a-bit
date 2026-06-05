import { useState } from 'react'
import Welcome from './screens/onboarding/Welcome'
import Goal    from './screens/onboarding/Goal'
import Time    from './screens/onboarding/Time'
import Place   from './screens/onboarding/Place'
import Share   from './screens/onboarding/Share'
import Timer   from './screens/flow/Timer'
import Camera  from './screens/flow/Camera'
import Done    from './screens/flow/Done'
import Home    from './screens/tabs/Home'
import Record  from './screens/tabs/Record'
import Friends from './screens/tabs/Friends'
import Me      from './screens/tabs/Me'

const SCREENS = {
  'onboarding-welcome': Welcome,
  'onboarding-goal':    Goal,
  'onboarding-time':    Time,
  'onboarding-place':   Place,
  'onboarding-share':   Share,
  timer:   Timer,
  camera:  Camera,
  done:    Done,
  home:    Home,
  record:  Record,
  friends: Friends,
  me:      Me,
}

export default function App() {
  const [screen, setScreen] = useState('onboarding-welcome')
  const navigate = (s) => setScreen(s)
  const CurrentScreen = SCREENS[screen] ?? Home
  return <CurrentScreen navigate={navigate} />
}
