import '../styles/footer.css'
import petsIllustration from '../assets/footer/mascotas.png'
import leftLeaf from '../assets/footer/hoja-izquierda.svg'
import rightLeaf from '../assets/footer/hoja-derecha.svg'
import heart from '../assets/footer/corazon.svg'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-banner">
        <img className="footer-decoration footer-decoration-left" src={leftLeaf} alt="" />
        <img className="footer-pets" src={petsIllustration} alt="" />
        <img className="footer-heart" src={heart} alt="" />
        <div className="footer-message">
          <p>UN FUTURO MEJOR ES POSIBLE</p>
          <h2>Conectamos vidas, cambiamos historias.</h2>
          <span>Juntos podemos darles a más animales la oportunidad de un hogar, salud y amor.</span>
        </div>
        <img className="footer-decoration footer-decoration-right" src={rightLeaf} alt="" />
      </div>
    </footer>
  )
}

export default Footer