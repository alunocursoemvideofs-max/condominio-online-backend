// Elementos do DOM
const nomeOperador = document.getElementById("nomeOperador");
const tabelaBody = document.querySelector("#tabelaOperadores tbody");
const msg = document.getElementById("msg");

// Modal elementos
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close");

// Formulário Adicionar Operador
const formAdicionar = document.getElementById("formAdicionar");

// Verifica login
const operadorLogado = JSON.parse(sessionStorage.getItem("operador"));
if (!operadorLogado) {
    window.location.href = "../login/index.html";
} else {
    nomeOperador.innerText = operadorLogado.nome; // só mostrar nome na saudação
}

// 🔹 Limpa os inputs do formulário Adicionar Operador ao carregar
formAdicionar.querySelector("#nome").value = "";
formAdicionar.querySelector("#usuario").value = "";
formAdicionar.querySelector("#email").value = "";
formAdicionar.querySelector("#senha").value = "";

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("operador");
    window.location.href = "../login/index.html";
});

// Função para listar operadores
async function listarOperadores(filtro = "") {
    tabelaBody.innerHTML = "";
    try {
        const res = await fetch("http://127.0.0.1:3000/api/operadores");
        if (!res.ok) throw new Error("Erro ao buscar operadores");

        const operadores = await res.json();

        // Filtra operadores pelo nome ou usuário
        const filtrados = operadores.filter(op => 
            op.nome.toLowerCase().includes(filtro.toLowerCase()) || 
            op.usuario.toLowerCase().includes(filtro.toLowerCase())
        );

        // Preenche a tabela
        filtrados.forEach(op => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${op.nome}</td>
                <td>${op.usuario}</td>
                <td>${op.email}</td>
                <td>
                    <button onclick="abrirModal('${op._id}','${op.nome}','${op.usuario}','${op.email}')">Editar</button>
                    <button onclick="remover('${op._id}')">Remover</button>
                </td>`;
            tabelaBody.appendChild(tr);
        });

    } catch (err) {
        console.error(err);
        msg.innerText = "Erro ao carregar operadores!";
    }
}

// Pesquisa em tempo real
document.getElementById("pesquisa").addEventListener("input", e => {
    listarOperadores(e.target.value);
});

// Adicionar operador
formAdicionar.addEventListener("submit", async e => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        const res = await fetch("http://127.0.0.1:3000/api/operadores/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, usuario, email, senha })
        });
        const data = await res.json();
        msg.innerText = data.msg;

        if (res.ok) {
            listarOperadores();
            formAdicionar.reset(); // 🔹 Limpa os inputs após adicionar
        }
    } catch (err) {
        console.error(err);
        msg.innerText = "Erro ao adicionar operador!";
    }
});

// Remover operador
async function remover(id) {
    if (!confirm("Deseja realmente remover este operador?")) return;

    try {
        const res = await fetch(`http://127.0.0.1:3000/api/operadores/${id}`, { method: "DELETE" });
        const data = await res.json();
        msg.innerText = data.msg;
        listarOperadores();
    } catch (err) {
        console.error(err);
        msg.innerText = "Erro ao remover operador!";
    }
}

// Abrir modal para editar
function abrirModal(id, nome, usuario, email) {
    modal.style.display = "flex";
    document.getElementById("editId").value = id;
    document.getElementById("editNome").value = nome;
    document.getElementById("editUsuario").value = usuario;
    document.getElementById("editEmail").value = email;
    document.getElementById("editSenha").value = ""; // senha em branco
}

// Fechar modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; }

// Editar operador
document.getElementById("formEditar").addEventListener("submit", async e => {
    e.preventDefault();

    const id = document.getElementById("editId").value;
    const nome = document.getElementById("editNome").value;
    const usuario = document.getElementById("editUsuario").value;
    const email = document.getElementById("editEmail").value;
    const senha = document.getElementById("editSenha").value;

    try {
        const res = await fetch(`http://127.0.0.1:3000/api/operadores/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, usuario, email, senha })
        });
        const data = await res.json();
        msg.innerText = data.msg;
        modal.style.display = "none";
        listarOperadores();
    } catch (err) {
        console.error(err);
        msg.innerText = "Erro ao editar operador!";
    }
});

// Inicializa a tabela
listarOperadores();

// Torna funções globais para os botões funcionarem
window.abrirModal = abrirModal;
window.remover = remover;
