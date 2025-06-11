document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const inputs = {
    nome: document.getElementById("nome"),
    cep: document.getElementById("cep"),
    rua: document.getElementById("rua"),
    bairro: document.getElementById("bairro"),
    cidade: document.getElementById("cidade"),
    estado: document.getElementById("estado"),
  };

  // Restaurar dados do localStorage
  Object.keys(inputs).forEach((key) => {
    if (localStorage.getItem(key)) {
      inputs[key].value = localStorage.getItem(key);
    }
  });

  // Buscar endereço pelo CEP
  inputs.cep.addEventListener("blur", () => {
    const cep = inputs.cep.value.replace(/\D/g, "");
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.erro) {
            inputs.rua.value = data.logradouro || "";
            inputs.bairro.value = data.bairro || "";
            inputs.cidade.value = data.localidade || "";
            inputs.estado.value = data.uf || "";
          } else {
            alert("CEP não encontrado.");
          }
        })
        .catch(() => alert("Erro ao buscar o CEP."));
    }
  });

  // Salvar no localStorage ao enviar o formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    Object.keys(inputs).forEach((key) => {
      localStorage.setItem(key, inputs[key].value);
    });
    alert("Dados salvos com sucesso!");
  });
  });