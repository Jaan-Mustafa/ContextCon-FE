import SignalCard from './SignalCard'

export default function SignalFeed({ signals, onSelect }) {
  return (
    <div className="space-y-4">
      {signals.map((signal) => (
        <SignalCard key={signal.id} signal={signal} onClick={() => onSelect(signal)} />
      ))}
    </div>
  )
}
