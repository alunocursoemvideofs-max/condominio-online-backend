const form = document.getElementById("cadastroForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const usuario = document.getElementById("usuario").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        msg.style.color = "#ff6b6b";
        msg.innerText = "As senhas não conferem!";
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/operadores/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, usuario, email, senha })
        });

        const data = await response.json();

        if (response.ok) {
            msg.style.color = "#00ffcc";
            msg.innerText = data.msg;
            form.reset();
        } else {
            msg.style.color = "#ff6b6b";
            msg.innerText = data.msg;
        }

    } catch (error) {
        msg.style.color = "#ff6b6b";
        msg.innerText = "Erro ao conectar ao servidor!";
        console.error(error);
    }
});
