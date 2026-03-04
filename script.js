// ===============================
// LISTA DE PERSONAGENS
// ===============================

const personagens = [
    {
        nome: "Medusa",
        cor: "#2ecc71",
        cardback: "medusa.png",
        hpMax: 16,
        tokens: [
            { nome: "Harpia 1", img: "harpias.png" },
            { nome: "Harpia 2", img: "harpias.png" },
            { nome: "Harpia 3", img: "harpias.png" }
        ],
        tipoToken: "multi",
        assistente: { nome: "Harpias", hpMax: 0 }
    },
    {
        nome: "Alice",
        cor: "#3498db",
        cardback: "alice.png",
        hpMax: 13,
        tokensEspeciais: [
            { faceA: "grande.png", faceB: "pequena.png" }
        ],
        assistente: { nome: "Jabberwock", hpMax: 8 }
    },
    {
        nome: "Nikola Tesla",
        cor: "#ff7b00",
        cardback: "nicolas.png",
        hpMax: 15,
        tokensEspeciais: [
            { faceA: "descarregado.png", faceB: "carregado.png" },
            { faceA: "descarregado.png", faceB: "carregado.png" }
        ],
        assistente: null
    },
    {
        nome: "Sinbad",
        cor: "#ff7300",
        cardback: "sinbad.png",
        hpMax: 15,
        tokens: Array.from({ length: 8 }, () => ({
            nome: "Viagem",
            img: "viagens.png"
        })),
        tipoToken: "multi",
        assistente: { nome: "Porter", hpMax: 6 }
    },
    {
        nome: "Lampião",
        cor: "#ff3300",
        cardback: "lampiao.png",
        hpMax: 15,
        tokens: [],
        assistente: { nome: "Corrisqueiro", hpMax: 6 }
    },
    {
        nome: "Sherlock Holmes",
        cor: "#ffe600",
        cardback: "sherlock.png",
        hpMax: 16,
        tokens: [],
        assistente: { nome: "Dr. Watson", hpMax: 8 }
    }
];

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    popularSelecao(1);
    popularSelecao(2);
});

// ===============================
// TELA DE SELEÇÃO
// ===============================

function popularSelecao(playerNum) {
    const container = document.getElementById(`escolha-p${playerNum}`);
    if (!container) return;

    container.innerHTML = "";

    personagens.forEach((p, index) => {
        const card = document.createElement("div");
        card.className = "card-option";

        card.innerHTML = `
            <div class="card-back-img">
                <img src="${p.cardback}" alt="${p.nome}">
            </div>
            <span class="card-name">${p.nome}</span>
        `;

        card.addEventListener("click", () => {
            selecionarHeroi(playerNum, index);
            container.querySelectorAll(".card-option")
                .forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");
        });

        container.appendChild(card);
    });
}

// ===============================
// CARREGAR LUTADOR
// ===============================

function selecionarHeroi(playerNum, index) {
    const personagem = personagens[index];
    const painel = document.getElementById(`painel-p${playerNum}`);
    const area = document.getElementById(`p${playerNum}-area`);

    if (!personagem || !painel) return;

    if (area) {
        area.style.borderTop = `10px solid ${personagem.cor}`;
    }

    painel.innerHTML = "";
    painel.appendChild(criarCardHP(personagem.nome, personagem.hpMax, `p${playerNum}-hero`));

    if (personagem.assistente && personagem.assistente.hpMax > 0) {
        painel.appendChild(
            criarCardHP(personagem.assistente.nome, personagem.assistente.hpMax, `p${playerNum}-ast`)
        );
    }

    if (personagem.tokensEspeciais) {
        painel.appendChild(criarTokensEspeciais(personagem.tokensEspeciais));
    }

    if (personagem.tokens) {
        painel.appendChild(criarTokensNormais(personagem.tokens, personagem.tipoToken));
    }
}

// ===============================
// COMPONENTES
// ===============================

function criarCardHP(nome, hp, id) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <h2>${nome}</h2>
        <div class="hp-val" id="hp-${id}">${hp}</div>
        <div class="controles">
            <button class="btn-hp">-</button>
            <button class="btn-hp">+</button>
        </div>
    `;

    const botoes = card.querySelectorAll(".btn-hp");
    botoes[0].addEventListener("click", () => mudarHP(`hp-${id}`, -1));
    botoes[1].addEventListener("click", () => mudarHP(`hp-${id}`, 1));

    return card;
}

function criarTokensEspeciais(lista) {
    const container = document.createElement("div");
    container.className = "tokens-container";

    lista.forEach(token => {
        const flip = document.createElement("div");
        flip.className = "flip-container";

        flip.innerHTML = `
            <div class="flipper">
                <div class="front"><img src="${token.faceA}"></div>
                <div class="back"><img src="${token.faceB}"></div>
            </div>
        `;

        flip.addEventListener("click", () => {
            flip.classList.toggle("flipped");
        });

        container.appendChild(flip);
    });

    return container;
}

function criarTokensNormais(lista, tipo) {
    const container = document.createElement("div");
    container.className = "tokens-container";

    lista.forEach(token => {
        const btn = document.createElement("button");
        btn.className = "btn-token";

        btn.innerHTML = `<img src="${token.img}" alt="${token.nome}">`;

        btn.addEventListener("click", () => {
            if (tipo === "unique") {
                container.querySelectorAll(".btn-token")
                    .forEach(b => b.classList.remove("active"));
            }
            btn.classList.toggle("active");
        });

        container.appendChild(btn);
    });

    return container;
}

// ===============================
// UTILIDADES
// ===============================

function mudarHP(id, valor) {
    const el = document.getElementById(id);
    if (!el) return;

    let atual = parseInt(el.innerText);
    atual += valor;

    if (atual < 0) atual = 0;

    el.innerText = atual;
}
