"use strict";

// Número público de contato: código do país + DDD + número, somente dígitos.
const NUMERO_WHATSAPP = "5599981491580";
const criarLinkWhatsApp = (mensagem) =>
  `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
const mensagemPadrao = "Olá, Ricaelly! Vi seu site e quero saber mais sobre as aulas.";

document.querySelectorAll(".zap-link").forEach((link) => {
  link.href = criarLinkWhatsApp(mensagemPadrao);
});

const ano = document.getElementById("ano");
if (ano) ano.textContent = String(new Date().getFullYear());

// Foto: apresenta as iniciais caso o arquivo não esteja disponível.
const foto = document.querySelector("#portraitFrame > img");
const portraitFrame = document.getElementById("portraitFrame");
if (foto && portraitFrame) {
  const mostrarFallback = () => portraitFrame.classList.add("no-photo");
  foto.addEventListener("error", mostrarFallback);
  if (foto.complete && foto.naturalWidth === 0) mostrarFallback();
}

// Menu responsivo.
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
if (menu && menuBtn) {
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
}

// Barra de progresso, cabeçalho e botão de voltar ao topo.
const barra = document.getElementById("progresso");
const header = document.getElementById("header");
const toTop = document.getElementById("toTop");
function atualizarRolagem() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  if (barra) barra.style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`;
  if (header) header.classList.toggle("scrolled", doc.scrollTop > 8);
  if (toTop) toTop.classList.toggle("visible", doc.scrollTop > 500);
}
window.addEventListener("scroll", atualizarRolagem, { passive: true });
atualizarRolagem();
if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Animações progressivas; o conteúdo continua acessível sem IntersectionObserver.
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
const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
if ("IntersectionObserver" in window && observedSections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) navLinks.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-42% 0px -48% 0px" });
  observedSections.forEach((section) => sectionObserver.observe(section));
}

// Os campos são processados localmente e só seguem ao WhatsApp após o clique.
const nome = document.getElementById("nome");
const detalhes = document.getElementById("detalhes");
const previa = document.getElementById("previa");
const enviar = document.getElementById("enviar");
function atualizarMensagem() {
  if (!nome || !detalhes || !previa || !enviar) return;
  const nomeDigitado = nome.value.trim().slice(0, 60);
  const nivel = document.querySelector('input[name="nivel"]:checked')?.value || "Ensino Fundamental 2";
  const objetivos = [...document.querySelectorAll("#objetivos input:checked")].map((item) => item.value);
  const complemento = detalhes.value.trim().slice(0, 180);
  let lista = "as aulas";
  if (objetivos.length === 1) lista = objetivos[0];
  else if (objetivos.length === 2) lista = `${objetivos[0]} e ${objetivos[1]}`;
  else if (objetivos.length > 2) lista = `${objetivos.slice(0, -1).join(", ")} e ${objetivos.at(-1)}`;
  let mensagem = `Olá, Ricaelly! ${nomeDigitado ? `Meu nome é ${nomeDigitado}. ` : ""}Vi seu site e gostaria de conversar sobre ${lista} no ${nivel}.`;
  if (complemento) mensagem += ` Minha dúvida/necessidade é: ${complemento}.`;
  mensagem += " Podemos conversar?";
  previa.textContent = mensagem;
  enviar.href = criarLinkWhatsApp(mensagem);
}
document.querySelectorAll("#mensagem input").forEach((campo) => {
  campo.addEventListener("input", atualizarMensagem);
  campo.addEventListener("change", atualizarMensagem);
});
atualizarMensagem();
