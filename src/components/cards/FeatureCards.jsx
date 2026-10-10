import FeatureCard from './FeatureCard'
import { featureCards } from '../../data/featureCards'

export default function FeatureCards() {
  return (
    <main className="feature-grid">
      {featureCards.map((card) => (
        <FeatureCard key={card.id} {...card} />
      ))}
    </main>
  )
}
