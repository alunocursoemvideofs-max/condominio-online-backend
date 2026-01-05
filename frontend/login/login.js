const formLogin = document.getElementById("formLogin");
const msg = document.getElementById("msg");

formLogin.addEventListener("submit", async e => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    try {
        const res = await fetch("http://127.0.0.1:3000/api/operadores/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha })
        });
        const data = await res.json();
        msg.innerText = data.msg;

        if (res.ok) {
            sessionStorage.setItem("operador", JSON.stringify(data.operador));
            window.location.href = "../dashboard/index.html";
        }
    } catch (err) {
        msg.innerText = "Erro ao conectar ao servidor!";
        console.error(err);
    }
});
