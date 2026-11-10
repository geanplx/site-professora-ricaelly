// CONFIGURAÇÃO: número com código do país + DDD, somente números.
    const NUMERO_WHATSAPP = "5599981491580";

    const criarLinkWhatsApp = (mensagem) =>
      `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

    const mensagemPadrao = "Olá, Ricaelly! Vi seu site e quero saber mais sobre as aulas.";

    document.querySelectorAll(".zap-link").forEach((link) => {
      link.href = criarLinkWhatsApp(mensagemPadrao);
    });

    document.getElementById("ano").textContent = new Date().getFullYear();

    // Foto: caso foto.jpg não exista, mostra as iniciais.
    const foto = document.querySelector("#portraitFrame img");
    foto.addEventListener("error", () => {
      document.getElementById("portraitFrame").classList.add("no-photo");
    });
    if (foto.complete && foto.naturalWidth === 0) {
      document.getElementById("portraitFrame").classList.add("no-photo");
    }

    // Menu responsivo.
    const menu = document.getElementById("menu");
    const menuBtn = document.getElementById("menuBtn");

    menuBtn.addEventListener("click", () => {
      const aberto = menu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(aberto));
      menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
      menuBtn.textContent = aberto ? "✕" : "☰";
    });

    menu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        menu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menu");
        menuBtn.textContent = "☰";
      }
    });

    // Barra de progresso, cabeçalho e botão de voltar ao topo.
    const barra = document.getElementById("progresso");
    const header = document.getElementById("header");
    const toTop = document.getElementById("toTop");

    function atualizarRolagem() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      barra.style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`;
      header.classList.toggle("scrolled", doc.scrollTop > 8);
      toTop.classList.toggle("visible", doc.scrollTop > 500);
    }
    window.addEventListener("scroll", atualizarRolagem, { passive: true });
    atualizarRolagem();

    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Animações: o conteúdo continua visível se IntersectionObserver não existir.
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("motion-ready");
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    }

    // Destaque do item do menu conforme a seção visível.
    const navLinks = [...document.querySelectorAll("nav a")];
    const observedSections = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    if ("IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
          }
        });
      }, { rootMargin: "-42% 0px -48% 0px" });
      observedSections.forEach((section) => sectionObserver.observe(section));
    }

    // Montador de mensagem para o WhatsApp.
    const nome = document.getElementById("nome");
    const detalhes = document.getElementById("detalhes");
    const previa = document.getElementById("previa");
    const enviar = document.getElementById("enviar");

    function atualizarMensagem() {
      const nomeDigitado = nome.value.trim();
      const nivelSelecionado = document.querySelector('input[name="nivel"]:checked')?.value || "Ensino Fundamental 2";
      const objetivos = [...document.querySelectorAll("#objetivos input:checked")].map((item) => item.value);
      const detalhesDigitados = detalhes.value.trim();

      let listaObjetivos = "as aulas";
      if (objetivos.length === 1) listaObjetivos = objetivos[0];
      if (objetivos.length === 2) listaObjetivos = `${objetivos[0]} e ${objetivos[1]}`;
      if (objetivos.length > 2) listaObjetivos = `${objetivos.slice(0, -1).join(", ")} e ${objetivos.at(-1)}`;

      let mensagem = `Olá, Ricaelly! ${nomeDigitado ? `Meu nome é ${nomeDigitado}. ` : ""}Vi seu site e gostaria de conversar sobre ${listaObjetivos} no ${nivelSelecionado}.`;
      if (detalhesDigitados) mensagem += ` Minha dúvida/necessidade é: ${detalhesDigitados}.`;
      mensagem += " Podemos conversar?";

      previa.textContent = mensagem;
      enviar.href = criarLinkWhatsApp(mensagem);
    }

    document.querySelectorAll("#mensagem input").forEach((campo) => {
      campo.addEventListener("input", atualizarMensagem);
      campo.addEventListener("change", atualizarMensagem);
    });
    atualizarMensagem();
