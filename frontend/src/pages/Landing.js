/**
 * Landing.js — página pública de la fundación (sin login).
 * Landing() → HTML | iniciarLanding() → scroll, menú móvil, link a login
 */
import logo from "../assets/img/logo_rcm.png";
import { navegar } from "../router/router.js";

export function Landing() {
  return `
<div class="page-landing">

<header class="nav" id="mainNav">
  <div class="container nav-inner">
    <a href="#inicio" class="brand">
      <img src="${logo}" alt="Logo Fundación Red Camino de María">
      <div class="brand-text">
        <strong>Red Camino de María</strong>
        <span>Fundación</span>
      </div>
    </a>

    <nav class="nav-links" id="navLinks">
      <a href="#inicio">Inicio</a>
      <a href="#quienes-somos">Quiénes somos</a>
      <a href="#programas">Programas</a>
      <a href="#camino">Nuestro camino</a>
      <a href="#impacto">Impacto</a>
      <a href="#eventos">Eventos</a>
      <a href="#contacto">Contacto</a>
    </nav>

    <div class="nav-right">
      <a href="#login" class="btn btn-login js-login-link">
        <i class="fa-solid fa-right-to-bracket"></i> Iniciar sesión
      </a>
      <button class="burger" id="burgerBtn" type="button" aria-label="Abrir menú"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

<section class="hero" id="inicio">
  <div class="hero-blob b1"></div>
  <div class="hero-blob b2"></div>
  <div class="container hero-grid">
    <div>
      <span class="hero-eyebrow">Fundación Red Camino de María</span>
      <h1 class="reveal">Ningún niño debería <em>caminar solo</em> su propia historia.</h1>
      <p class="lead reveal">Acompañamos a familias y a niñas, niños y adolescentes en situación de vulnerabilidad con seguimiento académico, apoyo psicosocial y una comunidad que decide caminar junto a ellos, un paso a la vez.</p>
      <div class="hero-ctas reveal">
        <a href="#ayudar" class="btn btn-primary"><i class="fa-solid fa-hand-holding-heart"></i> Quiero ayudar</a>
        <a href="#quienes-somos" class="btn btn-outline"><i class="fa-solid fa-play"></i> Conoce nuestra labor</a>
      </div>
      <div class="hero-stats reveal">
        <div><strong data-count="186">0</strong><span>Familias acompañadas</span></div>
        <div><strong data-count="341">0</strong><span>NNA en seguimiento</span></div>
        <div><strong data-count="12">0</strong><span>Años caminando juntos</span></div>
        <div><strong data-count="48">0</strong><span>Aliados y voluntarios</span></div>
      </div>
    </div>

    <div class="hero-art reveal">
      <svg class="path-svg" viewBox="0 0 420 520" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40 40 C 220 60, 120 160, 260 200 C 400 240, 300 340, 360 400 C 400 440, 380 470, 340 490"
              stroke="#D4AF37" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round"/>
        <circle cx="40" cy="40" r="9" fill="#D4AF37"/>
        <circle cx="260" cy="200" r="9" fill="#E5824B"/>
        <circle cx="360" cy="400" r="9" fill="#D4AF37"/>
        <circle cx="340" cy="490" r="9" fill="#FBF8F2"/>
      </svg>
      <div class="waypoint-card wp1"><i class="fa-solid fa-house-chimney-heart"></i> Acogida</div>
      <div class="waypoint-card wp2"><i class="fa-solid fa-hands-holding-child"></i> Acompañamiento</div>
      <div class="waypoint-card wp3"><i class="fa-solid fa-book-open-reader"></i> Seguimiento</div>
      <div class="waypoint-card wp4"><i class="fa-solid fa-seedling"></i> Autonomía</div>
    </div>
  </div>
</section>

<section class="section" id="quienes-somos">
  <div class="container about-grid">
    <div class="reveal">
      <span class="eyebrow">Quiénes somos</span>
      <h2 class="section-title">Una red de personas que decidieron no mirar hacia otro lado.</h2>
      <p class="section-lead">Red Camino de María nació de la convicción de que ninguna familia debería enfrentar sola las dificultades que impone la vulnerabilidad. Desde entonces trabajamos codo a codo con madres, padres, cuidadores, niñas, niños y adolescentes, tejiendo una red real de acompañamiento: constante, cercana y con seguimiento.</p>

      <div class="values">
        <span class="pill"><i class="fa-solid fa-heart"></i> Dignidad</span>
        <span class="pill"><i class="fa-solid fa-people-arrows"></i> Cercanía</span>
        <span class="pill"><i class="fa-solid fa-arrows-spin"></i> Constancia</span>
        <span class="pill"><i class="fa-solid fa-users"></i> Comunidad</span>
      </div>

      <div class="mission-cards">
        <div class="mission-card">
          <h4>Nuestra misión</h4>
          <p>Acompañar integralmente a familias y NNA en situación de vulnerabilidad, fortaleciendo su proceso educativo, emocional y social hasta que puedan sostenerse por sí mismos.</p>
        </div>
        <div class="mission-card">
          <h4>Nuestra visión</h4>
          <p>Ser una red viva, reconocida por transformar realidades familiares a través de un acompañamiento cercano, constante y con seguimiento real.</p>
        </div>
      </div>
    </div>

    <div class="about-art reveal">
      <svg viewBox="0 0 400 400" width="82%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="200" r="170" fill="#F1F6FA"/>
        <circle cx="200" cy="150" r="46" fill="#0B4F75"/>
        <path d="M110 330 C 110 250, 290 250, 290 330" fill="#0B4F75"/>
        <circle cx="120" cy="230" r="30" fill="#E5824B"/>
        <path d="M75 330 C 75 275, 165 275, 165 330" fill="#E5824B"/>
        <circle cx="285" cy="235" r="26" fill="#D4AF37"/>
        <path d="M245 330 C 245 280, 325 280, 325 330" fill="#D4AF37"/>
        <path d="M60 330 L 340 330" stroke="#0B4F75" stroke-opacity=".15" stroke-width="10" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</section>

<section class="section section-tint" id="programas">
  <div class="container">
    <div class="programs-head reveal">
      <div>
        <span class="eyebrow">Lo que hacemos</span>
        <h2 class="section-title">Cuatro formas de caminar junto a cada familia.</h2>
      </div>
      <p class="section-lead">No entendemos el acompañamiento como una ayuda puntual, sino como un proceso con seguimiento real, mes a mes.</p>
    </div>

    <div class="program-grid">
      <div class="program-card reveal">
        <div class="icon-wrap"><i class="fa-solid fa-graduation-cap"></i></div>
        <h3>Seguimiento académico</h3>
        <p>Tutorías, refuerzo escolar y comunicación constante con colegios para que ningún NNA se quede atrás.</p>
      </div>
      <div class="program-card reveal">
        <div class="icon-wrap"><i class="fa-solid fa-comments"></i></div>
        <h3>Acompañamiento psicosocial</h3>
        <p>Espacios de escucha con psicología y trabajo social para fortalecer emocionalmente a NNA y familias.</p>
      </div>
      <div class="program-card reveal">
        <div class="icon-wrap"><i class="fa-solid fa-people-group"></i></div>
        <h3>Encuentros comunitarios</h3>
        <p>Eventos y jornadas que fortalecen los lazos familiares y construyen comunidad alrededor de cada hogar.</p>
      </div>
      <div class="program-card reveal">
        <div class="icon-wrap"><i class="fa-solid fa-hand-holding-dollar"></i></div>
        <h3>Padrinazgo y donaciones</h3>
        <p>Aliados que sostienen becas, alimentación y materiales escolares de forma constante y transparente.</p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="camino">
  <div class="container">
    <div class="reveal" style="max-width:640px;">
      <span class="eyebrow">Nuestro camino</span>
      <h2 class="section-title">Así es el camino que recorremos con cada familia.</h2>
      <p class="section-lead">Cada acompañamiento sigue cuatro etapas. El orden importa: primero se construye confianza, después se sostiene el proceso en el tiempo.</p>
    </div>

    <div class="camino-wrap">
      <div class="camino-line"></div>
      <div class="camino-steps">
        <div class="camino-step reveal">
          <div class="camino-num">1</div>
          <h4>Acogida</h4>
          <p>Escuchamos a la familia, entendemos su realidad y construimos juntos un primer plan de acompañamiento.</p>
        </div>
        <div class="camino-step reveal">
          <div class="camino-num">2</div>
          <h4>Acompañamiento</h4>
          <p>Psicología, trabajo social y educación caminan juntos, con visitas y encuentros periódicos.</p>
        </div>
        <div class="camino-step reveal">
          <div class="camino-num">3</div>
          <h4>Seguimiento</h4>
          <p>Medimos avances académicos y emocionales de cada NNA, mes a mes, y ajustamos el plan cuando hace falta.</p>
        </div>
        <div class="camino-step reveal">
          <div class="camino-num">4</div>
          <h4>Autonomía</h4>
          <p>Acompañamos a la familia hasta que logra sostenerse por sí misma, sin dejar de estar cerca.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-tint" id="impacto">
  <div class="container">
    <div class="impact reveal">
      <span class="eyebrow" style="color:var(--secondary);">Nuestro impacto</span>
      <h2 class="section-title" style="color:var(--white);max-width:520px;">Cifras que representan historias reales.</h2>
      <div class="impact-grid" style="margin-top:44px;">
        <div class="impact-item"><strong data-count="186">0</strong><span>Familias activas en acompañamiento</span></div>
        <div class="impact-item"><strong data-count="341">0</strong><span>NNA en seguimiento académico</span></div>
        <div class="impact-item"><strong data-count="27">0</strong><span>Eventos comunitarios al año</span></div>
        <div class="impact-item"><strong data-count="94">0</strong><span>% de continuidad escolar</span></div>
      </div>
      <p class="impact-note">Cifras ilustrativas de ejemplo — reemplázalas por los indicadores reales de la fundación.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="reveal" style="max-width:600px;">
      <span class="eyebrow">Voces del camino</span>
      <h2 class="section-title">Historias que nos recuerdan por qué lo hacemos.</h2>
    </div>

    <div class="testi-grid">
      <div class="testi-card reveal">
        <i class="fa-solid fa-quote-left quote"></i>
        <p>"Cuando llegamos a la fundación no sabíamos por dónde seguir. Hoy mi hija va al colegio contenta y yo tengo con quién hablar cuando las cosas se ponen difíciles."</p>
        <div class="testi-who">
          <div class="testi-avatar" style="background:var(--primary);">MF</div>
          <div><strong>Madre acompañada</strong><span>Programa de acompañamiento psicosocial</span></div>
        </div>
      </div>
      <div class="testi-card reveal">
        <i class="fa-solid fa-quote-left quote"></i>
        <p>"El seguimiento académico me ayudó a no quedarme atrás en matemáticas. Ahora quiero ser profesor, como los tutores que me acompañaron."</p>
        <div class="testi-who">
          <div class="testi-avatar" style="background:var(--coral);">JD</div>
          <div><strong>NNA en seguimiento</strong><span>Programa de seguimiento académico</span></div>
        </div>
      </div>
      <div class="testi-card reveal">
        <i class="fa-solid fa-quote-left quote"></i>
        <p>"Ser voluntaria en los encuentros comunitarios me cambió la forma de ver mi ciudad. Uno no dona tiempo, lo recibe multiplicado."</p>
        <div class="testi-who">
          <div class="testi-avatar" style="background:var(--secondary-dark);">LR</div>
          <div><strong>Voluntaria aliada</strong><span>Encuentros comunitarios</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section-tint" id="eventos">
  <div class="container">
    <div class="programs-head reveal">
      <div>
        <span class="eyebrow">Agenda</span>
        <h2 class="section-title">Próximos eventos y encuentros.</h2>
      </div>
      <a href="#contacto" class="btn btn-ghost">Ver toda la agenda</a>
    </div>

    <div class="event-grid">
      <div class="event-card reveal">
        <div class="event-date"><div class="d">08</div><div><div class="m">Agosto</div>2026</div></div>
        <div class="event-body">
          <span class="event-tag"><i class="fa-solid fa-location-dot"></i> Sede Principal</span>
          <h4>Jornada de refuerzo escolar</h4>
          <p>Tutorías grupales para NNA de primaria y bachillerato con nuestros voluntarios docentes.</p>
        </div>
      </div>
      <div class="event-card reveal">
        <div class="event-date"><div class="d">22</div><div><div class="m">Agosto</div>2026</div></div>
        <div class="event-body">
          <span class="event-tag"><i class="fa-solid fa-location-dot"></i> Parque Comunitario</span>
          <h4>Encuentro de familias</h4>
          <p>Un espacio recreativo para fortalecer los lazos entre las familias que acompañamos.</p>
        </div>
      </div>
      <div class="event-card reveal">
        <div class="event-date"><div class="d">05</div><div><div class="m">Septiembre</div>2026</div></div>
        <div class="event-body">
          <span class="event-tag"><i class="fa-solid fa-location-dot"></i> Auditorio Fundación</span>
          <h4>Feria de aliados y donantes</h4>
          <p>Presentamos resultados del semestre y abrimos nuevas alianzas de apadrinamiento.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" id="ayudar">
  <div class="container">
    <div class="reveal" style="max-width:600px;">
      <span class="eyebrow">Súmate al camino</span>
      <h2 class="section-title">Hay varias formas de caminar con nosotros.</h2>
    </div>

    <div class="help-grid">
      <div class="help-card h1 reveal">
        <i class="fa-solid fa-hand-holding-heart big"></i>
        <h3>Dona</h3>
        <p>Tu aporte sostiene becas, alimentación y materiales escolares de NNA en seguimiento.</p>
        <a href="#contacto">Quiero donar <i class="fa-solid fa-arrow-right"></i></a>
      </div>
      <div class="help-card h2 reveal">
        <i class="fa-solid fa-people-carry-box big"></i>
        <h3>Sé voluntario</h3>
        <p>Suma tu tiempo y talento a las tutorías, encuentros y jornadas comunitarias.</p>
        <a href="#contacto">Quiero ser voluntario <i class="fa-solid fa-arrow-right"></i></a>
      </div>
      <div class="help-card h3 reveal">
        <i class="fa-solid fa-building-circle-check big"></i>
        <h3>Alía tu empresa</h3>
        <p>Construyamos juntos programas de responsabilidad social con impacto medible.</p>
        <a href="#contacto">Quiero aliarme <i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</section>

<section class="section section-tint" id="contacto">
  <div class="container contact-grid">
    <div class="reveal">
      <span class="eyebrow">Hablemos</span>
      <h2 class="section-title">Escríbenos, con gusto te contamos más.</h2>
      <p class="section-lead">Si quieres donar, ser voluntario, aliar tu empresa o simplemente conocer más sobre nuestro trabajo, este es el lugar.</p>

      <div class="contact-info-item">
        <div class="icon"><i class="fa-solid fa-location-dot"></i></div>
        <div><h4>Sede principal</h4><p>Calle 00 # 00-00, Medellín, Antioquia, Colombia</p></div>
      </div>
      <div class="contact-info-item">
        <div class="icon"><i class="fa-solid fa-phone"></i></div>
        <div><h4>Teléfono / WhatsApp</h4><p>+57 300 000 0000</p></div>
      </div>
      <div class="contact-info-item">
        <div class="icon"><i class="fa-solid fa-envelope"></i></div>
        <div><h4>Correo</h4><p>contacto@redcaminodemaria.org</p></div>
      </div>

      <div class="social-row">
        <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
        <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
        <a href="#" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>
        <a href="#" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>
      </div>
    </div>

    <form class="contact-form reveal" id="contactForm">
      <div class="form-row">
        <div class="form-field">
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" required>
        </div>
        <div class="form-field">
          <label>Correo</label>
          <input type="email" placeholder="tu@correo.com" required>
        </div>
      </div>
      <div class="form-field" style="margin-bottom:16px;">
        <label>Motivo</label>
        <select>
          <option>Quiero donar</option>
          <option>Quiero ser voluntario</option>
          <option>Quiero aliar mi empresa</option>
          <option>Otro</option>
        </select>
      </div>
      <div class="form-field" style="margin-bottom:16px;">
        <label>Mensaje</label>
        <textarea placeholder="Cuéntanos en qué podemos ayudarte..."></textarea>
      </div>
      <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i> Enviar mensaje</button>
    </form>
  </div>
</section>

<footer>
  <div class="container footer-grid">
    <div>
      <div class="footer-brand">
        <img src="${logo}" alt="Logo Fundación Red Camino de María">
        <strong>Red Camino de María</strong>
      </div>
      <p class="tag">Una red de acompañamiento para familias y NNA en situación de vulnerabilidad, con seguimiento académico, psicosocial y comunitario real.</p>
    </div>
    <div>
      <h5>Navegación</h5>
      <ul>
        <li><a href="#quienes-somos">Quiénes somos</a></li>
        <li><a href="#programas">Programas</a></li>
        <li><a href="#camino">Nuestro camino</a></li>
        <li><a href="#eventos">Eventos</a></li>
      </ul>
    </div>
    <div>
      <h5>Súmate</h5>
      <ul>
        <li><a href="#ayudar">Donar</a></li>
        <li><a href="#ayudar">Ser voluntario</a></li>
        <li><a href="#ayudar">Aliar mi empresa</a></li>
        <li><a href="#contacto">Contacto</a></li>
      </ul>
    </div>
    <div>
      <h5>Equipo</h5>
      <ul>
        <li><a href="#login" class="js-login-link"><i class="fa-solid fa-right-to-bracket"></i> Acceder al sistema</a></li>
      </ul>
    </div>
  </div>
  <div class="container footer-bottom">
    <span>© 2026 Fundación Red Camino de María · NIT 000.000.000-0</span>
    <span>Hecho con <i class="fa-solid fa-heart" style="color:var(--secondary);"></i> para cada familia que acompañamos</span>
  </div>
</footer>

</div>
`;
}

export function iniciarLanding() {
  window.scrollTo(0, 0);

  // Botones "Iniciar sesión" → navegar al login
  document.querySelectorAll(".js-login-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navegar("login");
    });
  });

  const nav = document.getElementById("mainNav");
  const onScroll = () => {
    if (!document.getElementById("mainNav")) {
      window.removeEventListener("scroll", onScroll);
      return;
    }
    nav.classList.toggle("scrolled", window.scrollY > 30);
  };
  window.addEventListener("scroll", onScroll);
  onScroll();

  const burger = document.getElementById("burgerBtn");
  const navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        navLinks.classList.remove("open");
      }),
    );
  }

  // Anclas internas (#quienes-somos, etc.) dentro de la landing
  document.querySelectorAll('.page-landing a[href^="#"]').forEach((a) => {
    if (a.classList.contains("js-login-link")) return;
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });


  const revealEls = document.querySelectorAll(".page-landing .reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  revealEls.forEach((el) => io.observe(el));

  const counters = document.querySelectorAll(".page-landing [data-count]");
  const counterIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        counterIO.unobserve(el);
      });
    },
    { threshold: 0.4 },
  );
  counters.forEach((el) => counterIO.observe(el));

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert(
        "¡Gracias por escribirnos! Conecta este formulario a tu correo o CRM para recibir los mensajes.",
      );
      e.target.reset();
    });
  }
}
