import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import { marketingNavigationItems } from './components/NavBar/constants'
import './index.css'

// Import images
import heroImage from '../assets/8b012d4ce7e9c00b24c734d0e09e0948a0461c8e.png'
import partnerLogo from '../assets/partner-logo.svg'
import problemImage from '../assets/dc86915345f0f05208c63617bc8fa527d67024e1.png'
import model3dImage from '../assets/8430bc40573f46f11031d3bc2f5f7748a94b3246.png'
import drawingsImage from '../assets/4f2677cdde2ddb11ea63e6f55295f6388c062231.png'
import bomImage from '../assets/dc86915345f0f05208c63617bc8fa527d67024e1.png'
import starIcon from '../assets/116ca1a2a0f35485d14207674d745572ef1cccbe.svg'

function App() {
  const [activeFaq, setActiveFaq] = useState(null)
  const [email, setEmail] = useState('')
  const appRef = useRef(null)
  const contactFormRef = useRef(null)
  const footerInputRef = useRef(null)

  // Smooth scroll handler
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Contact form handler
  const handleContactSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      contact: formData.get('contact'),
      comment: formData.get('comment')
    }
    
    console.log('Form submitted:', data)
    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.')
    e.target.reset()
  }

  // Footer email handler
  const handleFooterSubmit = (e) => {
    e.preventDefault()
    if (email && email.includes('@')) {
      console.log('Email submitted:', email)
      alert('Спасибо! Мы отправим вам информацию о тестировании.')
      setEmail('')
    } else {
      alert('Пожалуйста, введите корректный email адрес.')
    }
  }

  // FAQ toggle handler
  const handleFaqToggle = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }


  // GSAP animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from('.hero-logo-container', {
        y: -20,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.4)'
      })

      gsap.from('.hero-subtitle p', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12
      })

      gsap.from('.hero .btn-primary', {
        y: 30,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2
      })

      gsap.from('.hero-image img', {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.to('.hero-image img', {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: 'top 85%'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        })
      })

      gsap.utils.toArray('.section-description').forEach((desc) => {
        gsap.from(desc, {
          scrollTrigger: {
            trigger: desc,
            start: 'top 85%'
          },
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out'
        })
      })

      gsap.utils
        .toArray('.offer-card, .problem-card, .package-card, .step-card, .review-card, .faq-item')
        .forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: 'top 85%'
            },
            y: 30,
            opacity: 0,
            scale: 0.98,
            duration: 0.8,
            ease: 'power3.out'
          })
        })

      gsap.from('.partners-carousel-inner', {
        opacity: 0,
        scale: 0.98,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.partners',
          start: 'top 85%'
        }
      })

      gsap.from('.footer-text h2', {
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 85%'
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15
      })
    }, appRef)

    return () => ctx.revert()
  }, [])

  // Handle button clicks to scroll to contact form
  const handleTestButtonClick = (e) => {
    e.preventDefault()
    if (contactFormRef.current) {
      contactFormRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="App" ref={appRef}>
      <NavBar navigationItems={marketingNavigationItems} />

      {/* Logo Section - Centered */}
      <div className="hero-logo-container">
        <span className="logo-text-large">собе.<span className="logo-gradient">ru</span></span>
      </div>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <div className="hero-subtitle">
              <p>Проектная документация</p>
              <p>и <span className="gradient-text">3D</span>-модель</p>
              <p>из ТЗ/эскиза</p>
              <p>— за [Y] дней</p>
              <p>вместо [X]</p>
            </div>
            <button className="btn-primary" onClick={handleTestButtonClick}>Протестировать</button>
          </div>
          <div className="hero-image">
            <img src={heroImage} alt="Hero image" />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="partners">
        <div className="container">
          <h2 className="section-title">нас выбирают</h2>
          <div className="partners-carousel-wrapper">
            <div className="partners-carousel-inner">
              <div className="partners-carousel">
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
              </div>
              <div className="partners-carousel">
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
                <img src={partnerLogo} alt="Partner logo" className="partner-logo-item" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">Как работает наш сервис</h2>
          <div className="video-container">
            <div className="video-placeholder">
              {/* Video placeholder */}
            </div>
          </div>
          <p className="section-description">
            AI-платформа для малого и среднего бизнеса в производстве: ускоряет подготовку чертежей, спецификаций (BOM) и 3D-моделей для изделий под заказ. Инженер-контролёр подтверждает результат и при необходимости вносит правки
          </p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={handleTestButtonClick}>Протестировать</button>
            <button className="btn-secondary" onClick={handleTestButtonClick}>Связаться с нами</button>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="what-we-offer dark-section">
        <div className="container">
          <div className="what-we-offer-header">
            <div className="what-we-offer-title-wrapper">
              <h2 className="section-title white">МЫ ПРЕДЛАГАЕМ</h2>
              <p className="section-subtitle white">— Не способ заработка, а способ экономии ресурсов вашей компании</p>
            </div>
            <div className="what-we-offer-icon">
              <img src={problemImage} alt="Icon" />
            </div>
          </div>
          <div className="offers-grid">
            <div className="offer-card">
              <h3>Сроки</h3>
              <p>минус [A%] времени на подготовку техпакета</p>
            </div>
            <div className="offer-card">
              <h3>Экономию: [₽X–₽Y/мес]</h3>
              <p>на инженерных часах и аутсорсе</p>
            </div>
            <div className="offer-card">
              <h3>Контроль качества</h3>
              <p>2 этапа подтверждения + правки инженера</p>
            </div>
            <div className="offer-card wide">
              <h3>Адаптация</h3>
              <p>дообучение модели под ваш бизнес за [N дней/недель]</p>
            </div>
            <div className="offer-card wide">
              <h3>Развёртывание</h3>
              <p>облако или локально + права доступа/хранение</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="problems dark-section">
        <div className="container">
          <h2 className="section-title white">Проектирование съедает время, деньги и скорость вывода продукта</h2>
          <p className="section-description white">
            В малом и среднем бизнесе производство/изделия под заказ часто упираются не в станки, а в долгую и дорогую подготовку проектной документации
          </p>
          <div className="problems-grid">
            <div className="problem-card">
              <h3>Долго</h3>
              <p>Проектирование и подготовка пакета документов растягиваются на недели → замедляется выпуск и продажи</p>
            </div>
            <div className="problem-card">
              <h3>Дорого</h3>
              <p>Квалифицированные инженеры/дизайнеры стоят дорого, а услуги проектирования могут занимать значимую долю себестоимости</p>
            </div>
            <div className="problem-card">
              <h3>Зависимость от подрядчиков</h3>
              <p>Когда нет ресурсов в штате — появляются внешние исполнители → дольше цикл, больше правок, сложнее контроль</p>
            </div>
            <div className="problem-card">
              <h3>Нет адаптации</h3>
              <p>Малый и средний бизнес не могут содержать AI-команды, а SaaS часто не даёт обучать модели на своих данных</p>
            </div>
            <div className="problem-card">
              <h3>сложность cad</h3>
              <p>CAD-системы требуют глубоких навыков и не адаптированы под конкретный бизнес-процесс</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Package Section */}
      <section className="project-package dark-section">
        <div className="container">
          <h2 className="section-title white">Готовый проектный пакет: от идеи до техпроизводства</h2>
          <p className="section-description white">
            Платформа позволяет загружать ваши примеры (чертежи/3D/фото/ТЗ) и обучать модель под вашу задачу
          </p>
          <div className="package-grid">
            <div className="package-card">
              <div className="package-image">
                <img src={model3dImage} alt="3D Model" />
              </div>
              <h3>3D-модель</h3>
              <p>в CAD-совместимых форматах: .stl / .step / .fbx</p>
            </div>
            <div className="package-card">
              <div className="package-image">
                <img src={drawingsImage} alt="Drawings" />
              </div>
              <h3>Чертежи</h3>
              <p>с размерами и материалами</p>
            </div>
            <div className="package-card">
              <div className="package-image">
                <img src={bomImage} alt="BOM" />
              </div>
              <h3>BOM</h3>
              <p>Спецификация деталей</p>
            </div>
          </div>
        </div>
      </section>

      {/* Adaptation Section */}
      <section className="adaptation">
        <div className="container">
          <h2 className="section-title">адаптация сервиса под нужды вашего бизнеса</h2>
          <p className="section-description">
            Никакого сложного внедрения и месяцев обучения
          </p>
          <div className="adaptation-steps">
            <div className="step-card">
              <h3>1</h3>
              <p>Передайте нам свои эскизы и чертежи на их основе мы обучим ИИ под ваш бизнес</p>
            </div>
            <div className="step-card">
              <h3>2</h3>
              <p>Вы получите настроенную под ваш бизнес платформу за 2-3 дня</p>
            </div>
            <div className="step-card">
              <h3>3</h3>
              <p>Загружайте новые задачи и сразу получайте проекты. Без программистов, без сложного CAD</p>
            </div>
          </div>
          <p className="adaptation-quote">
            Наша платформа — это не ещё один софт.<br />
            Это цифровой двойник вашего проектного отдела
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" ref={contactFormRef}>
        <div className="container">
          <h2 className="section-title">оставьте заявку</h2>
          <div className="contact-form-card">
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-name">ФИО</label>
                <input id="contact-name" className="contact-form-input" type="text" name="name" placeholder="" required />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-info">Номер телефона/Email</label>
                <input id="contact-info" className="contact-form-input" type="tel" name="contact" placeholder="" required />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="contact-comment">Комментарий к заявке</label>
                <textarea id="contact-comment" className="contact-form-textarea" name="comment" rows="6"></textarea>
              </div>
              <button type="submit" className="btn-primary">Отправить</button>
            </form>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews">
        <div className="container">
          <h2 className="section-title">отзывы</h2>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-avatar"></div>
              <div className="review-rating">
                <img src={starIcon} alt="Star" />
                <span>4.8</span>
              </div>
              <h4>Анна Владимировна</h4>
              <p>Крутой сервис все быстро чотко по красоте уже сэкономили около 1млн.руб Рекомендую</p>
            </div>
            <div className="review-card">
              <div className="review-avatar"></div>
              <div className="review-rating">
                <img src={starIcon} alt="Star" />
                <span>4.8</span>
              </div>
              <h4>Анна Владимировна</h4>
              <p>Крутой сервис все быстро чотко по красоте уже сэкономили около 1млн.руб Рекомендую</p>
            </div>
            <div className="review-card">
              <div className="review-avatar"></div>
              <div className="review-rating">
                <img src={starIcon} alt="Star" />
                <span>4.8</span>
              </div>
              <h4>Анна Владимировна</h4>
              <p>Крутой сервис все быстро чотко по красоте уже сэкономили около 1млн.руб Рекомендую</p>
            </div>
          </div>
          <button className="btn-secondary">Написать отзыв</button>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2 className="section-title">faq</h2>
          <p className="faq-subtitle">Часто задаваемые вопросы</p>
          <div className="faq-list">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div 
                key={num} 
                className={`faq-item ${activeFaq === num ? 'active' : ''}`}
              >
                <div 
                  className="faq-question"
                  onClick={() => handleFaqToggle(num)}
                >
                  <span>Вопрос {num}</span>
                  <span className="faq-icon">›</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-text">
              <h2>Не жди момента — воплоти</h2>
              <h2>свою идею в жизнь <span className="gradient-text">сейчас</span></h2>
            </div>
            <form className="footer-cta" onSubmit={handleFooterSubmit}>
              <input 
                type="email" 
                placeholder="Email address..." 
                className="footer-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={footerInputRef}
              />
              <button type="submit" className="btn-primary">Протестировать</button>
            </form>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>о нас</h3>
              <p>пупупу</p>
            </div>
            <div className="footer-column">
              <h3>О продукте</h3>
              <p>пупупу</p>
            </div>
            <div className="footer-column">
              <h3>контактная информация</h3>
              <p>пупупупупупупу</p>
            </div>
          </div>
          <div className="footer-logo">
            <span className="logo-text-large">SOBIRAI</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
