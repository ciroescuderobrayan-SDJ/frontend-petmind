import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-copy">
          <h1>
            Una segunda oportunidad <strong>puede cambiar una vida.</strong>
          </h1>
          <p>Adopta, dona o apoya organizaciones que trabajan por el bienestar animal.</p>

          <div className="hero-actions">
            <Link className="btn btn-primary" to="/adoptar">
              Conocer mascotas
            </Link>
            <Link className="btn btn-outline" to="/donar">
              Quiero ayudar
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
