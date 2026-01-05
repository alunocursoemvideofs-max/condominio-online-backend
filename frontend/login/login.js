const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  try {
    const response = await fetch("/api/operadores/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Login realizado com sucesso!");
      window.location.href = "/dashboard"; // redireciona para a rota dashboard
    } else {
      alert(data.message || "Usuário ou senha inválidos!");
    }
  } catch (error) {
    console.error("Erro ao conectar ao servidor:", error);
    alert("Erro ao conectar ao servidor!");
  }
});
