import FeatureCard from './FeatureCard'
import { featureCards } from '../../data/featureCards'

export default function FeatureCards() {
  return (
    <section className="feature-grid" aria-label="Cómo puedes ayudar">
      {featureCards.map((card) => (
        <FeatureCard key={card.id} {...card} />
      ))}
    </section>
  )
}
