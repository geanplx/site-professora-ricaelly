# Ricaelly Bacelar | Website

Um projeto de desenvolvimento web criado para apresentar o trabalho da professora Ricaelly Bacelar por meio de uma experiência digital simples, elegante e intuitiva.

## Visão geral

O website foi desenvolvido com uma identidade visual editorial e minimalista, priorizando a legibilidade, a organização das informações e a facilidade de navegação.

### Funcionalidades

- Apresentação profissional da professora.
- Seção de serviços e aulas.
- Navegação adaptada para dispositivos móveis.
- Formulário interativo para montar mensagens de contato.
- Integração com WhatsApp.
- Animações e efeitos de navegação.

### Stack utilizada

| Tecnologia | Aplicação                    |
| ---------- | ---------------------------- |
| HTML5      | Estrutura da página          |
| CSS3       | Estilização e responsividade |
| JavaScript | Interatividade               |

### Organização do projeto

```text
site-professora/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── img/
```

## Aprendizados

Este projeto faz parte da minha jornada de aprendizado em desenvolvimento web, permitindo colocar em prática conceitos de HTML, CSS e JavaScript em uma aplicação real.

---

**Desenvolvido por Gean Lacerda**
Estudante de Análise e Desenvolvimento de Sistemas.


## Publicação e segurança

O projeto é estático e pode ser publicado pelo GitHub Pages. Em **Settings > Pages**,
ative **Enforce HTTPS** quando a opção estiver disponível.

- O formulário monta a mensagem no navegador; não armazena nem envia os campos para um servidor próprio.
- Os dados digitados só são encaminhados ao WhatsApp quando a pessoa clica no botão de envio.
- Não adicione senhas, tokens ou credenciais ao repositório.
- A política CSP no HTML restringe scripts, imagens, fontes e recursos a origens permitidas.
- CSP em meta não substitui cabeçalhos HTTP; `frame-ancestors` precisa de configuração no servidor, quando disponível.

Antes de publicar, confira se o número público de WhatsApp e os links de contato continuam corretos.
