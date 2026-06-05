export default function Welcome({ navigate }) {
  return <div style={{ padding: 32, cursor: 'pointer' }} onClick={() => navigate('onboarding-goal')}>Welcome stub — click to advance</div>
}
