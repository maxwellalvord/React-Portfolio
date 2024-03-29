import React from 'react'
import './portfolio.css'
import IMG1 from '../../assets/ECOM-VISION.png'
import IMG2 from '../../assets/Build-API.png'
import IMG3 from '../../assets/HappyHomes.PNG'
import IMG4 from '../../assets/societyDark.PNG'

const data = [
  {
    id: 1,
    image: IMG1,
    title: "MERN Finance Dashboard (ECOM-VISION)",
    github: "https://github.com/maxwellalvord/MERN-Finance-Dashboard",
    demo: "https://github.com/maxwellalvord/MERN-Finance-Dashboard/blob/main/README.md"
  },
  {
    id: 2,
    image: IMG2,
    title: "Building an Api",
    github: "https://github.com/maxwellalvord/Building-an-Api",
    demo: "https://github.com/maxwellalvord/Building-an-Api/blob/main/README.md"
  },
  {
    id: 3,
    image: IMG3,
    title: "AirBnb Clone (Happy Homes)",
    github: "https://github.com/maxwellalvord/AirBnbClone-Next13",
    demo: "https://happy-homes.vercel.app"
  },
  {
    id: 4,
    image: IMG4,
    title: "The Society",
    github: "https://github.com/maxwellalvord/MERN-APP-full-package",
    demo: "https://github.com/maxwellalvord/MERN-APP-full-package#readme"
  }
]

const Portfolio = () => {
  return (
    <section id='portfolio'>
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className='container portfolio__container'>
        {
          data.map(({id, image, title, github, demo}) => {
            return (
              <article key={id} className='portfolio__item'>
              <div className="portfolio__item-image">
                <img src={image} alt={title} />
              </div>
              <h3>{title}</h3>
              <div className="portfolio__item-cta">
                <a href={github} className='btn' target={'_blank'}>Github</a>
                <a href={demo} className='btn btn-primary' target={'_blank'}>Livesite/README.md</a>
              </div>
            </article>
            )
          })
        }
      </div>
    </section>
  )
}

export default Portfolio