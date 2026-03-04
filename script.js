const personagens = [
    {
        nome: "Medusa",
        cor: "#2ecc71",
        cardback: "medusa.png", // Adicione os caminhos corretos aqui
        hpMax: 16,
        tokens: [
            { nome: "Harpia 1", img: "harpias.png" },
            { nome: "Harpia 2", img: "harpias.png" },
            { nome: "Harpia 3", img: "harpias.png" }
        ],
        classeToken: "token-medusa",
        tipoToken: "multi",
        assistente: { nome: "Harpias", hpMax: 0 }
    },
    {
        nome: "Alice",
        cor: "#3498db",
        cardback: "alice.png",
        hpMax: 13,
        tokensEspeciais: [
            { tipo: "flip", faceA: "grande.png", faceB: "pequena.png" }
        ],
        tokens: [], 
        assistente: { nome: "Jabberwock", hpMax: 8 }    
    },
    {
        nome: "Nikola Tesla",
        cor: "#ff7b00", 
        cardback: "nicolas.png",
        hpMax: 15,
        tokensEspeciais: [
            { tipo: "flip", faceA: "descarregado.png", faceB: "carregado.png" },
            { tipo: "flip", faceA: "descarregado.png", faceB: "carregado.png" }
        ],
        tokens: [], 
        assistente: null 
    },
    {
        nome: "Sinbad",
        cor: "#ff7300",
        cardback: "sinbad.png",
        hpMax: 15,
        tokens: Array(8).fill({ nome: "viagens", img: "viagens.png" }),
        classeToken: "",
        assistente: { nome: "Porter ", hpMax: 6 }
    },
    {
        nome: "👑lampião👑",
        cor: "#ff3300",
        cardback: "lampiao.png",
        hpMax: 15,
        tokens: [],
        assistente: { nome: "GOAT corrisco ", hpMax: 6 }
    },
    {
        nome: "sherlock homes",
        cor: "#ffe600ff",
        cardback: "sherlock.png",
        hpMax: 16,
        classeToken: "",
        assistente: { nome: "Dr. Watson ", hpMax: 8 }
    }
];

// 1. Gera as cartas de seleção na tela
function popularSelecao() {
    const containers = [
        { id: 'escolha-p1', player: 1 },
        { id: 'escolha-p2', player: 2 }
    ];

    containers.forEach(cont => {
        const div = document.getElementById(cont.id);
        if (!div) return;
        div.innerHTML = ''; 

        personagens.forEach((p, index) => {
            div.innerHTML += `
                <div class="card-option" onclick="selecionarHeroi(${cont.player}, ${index}, this)">
                    <div class="card-back-img">
                        <img src="${p.cardback || '/cardback/default.png'}" alt="${p.nome}">
                    </div>
                    <span class="card-name">${p.nome}</span>
                </div>
            `;
        });
    });
}

// 2. Gerencia o clique na carta
function selecionarHeroi(playerNum, index, elemento) {
    const pai = elemento.parentElement;
    pai.querySelectorAll('.card-option').forEach(c => c.classList.remove('selected'));
    elemento.classList.add('selected');

    carregarLutador(playerNum, index);
}

// 3. Monta o painel do personagem escolhido
function carregarLutador(playerNum, index) {
    const painel = document.getElementById(`painel-p${playerNum}`);
    const p = personagens[index];

    if (!p) return;

    // Borda colorida no topo da coluna
    const area = document.getElementById(`p${playerNum}-area`);
    if(area) area.style.borderTop = `10px solid ${p.cor}`;

    let html = `
        <div class="card">
            <h2>${p.nome}</h2>
            <div class="hp-val" id="hp-p${playerNum}-hero">${p.hpMax}</div>
            <div class="controles">
                <button class="btn-hp" onclick="mudarHP('hp-p${playerNum}-hero', -1)">-</button>
                <button class="btn-hp" onclick="mudarHP('hp-p${playerNum}-hero', 1)">+</button>
            </div>
        </div>
    `;

    if (p.assistente && p.assistente.hpMax > 0) {
        html += `
            <div class="card">
                <h2>${p.assistente.nome}</h2>
                <div class="hp-val" style="font-size: 2.5rem" id="hp-p${playerNum}-ast">${p.assistente.hpMax}</div>
                <div class="controles">
                    <button class="btn-hp" style="width:45px; height:45px" onclick="mudarHP('hp-p${playerNum}-ast', -1)">-</button>
                    <button class="btn-hp" style="width:45px; height:45px" onclick="mudarHP('hp-p${playerNum}-ast', 1)">+</button>
                </div>
            </div>
        `;
    }

    // Tokens Especiais (Alice/Tesla)
    if (p.tokensEspeciais && p.tokensEspeciais.length > 0) {
        html += `<div class="tokens-container">`;
        p.tokensEspeciais.forEach(especial => {
            html += `
                <div class="flip-container" onclick="this.classList.toggle('flipped')">
                    <div class="flipper">
                        <div class="front"><img src="${especial.faceA}"></div>
                        <div class="back"><img src="${especial.faceB}"></div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    }

    // Tokens Normais (Medusa/Sinbad)
    if (p.tokens && p.tokens.length > 0) {
        html += `<div class="tokens-container">`;
        p.tokens.forEach(t => {
            html += `
                <button class="btn-token ${p.classeToken || ''}" 
                        onclick="gerenciarToken(this, ${playerNum}, '${p.tipoToken || 'multi'}')">
                    <img src="${t.img}" alt="${t.nome}">
                </button>`;
        });
        html += `</div>`;
    }

    painel.innerHTML = html;
}

// 4. Funções Auxiliares
function gerenciarToken(btn, playerNum, tipo) {
    if (tipo === "unique") {
        const container = btn.parentElement;
        container.querySelectorAll('.btn-token').forEach(b => {
            if (b !== btn) b.classList.remove('active');
        });
    }
    btn.classList.toggle('active');
}

function mudarHP(id, valor) {
    const el = document.getElementById(id);
    if (!el) return;
    let atual = parseInt(el.innerText);
    atual += valor;
    if (atual < 0) atual = 0;
    el.innerText = atual;
}

// Inicialização

popularSelecao();
