import React from "react";

// Função utilitária para gerar os dias de um mês
function gerarDiasDoMes(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaSemanaInicio = primeiroDia.getDay();

  const dias = [];

  // Preenche dias vazios antes do primeiro dia do mês
  for (let i = 0; i < diaSemanaInicio; i++) {
    dias.push(null);
  }

  // Preenche os dias do mês
  for (let i = 1; i <= diasNoMes; i++) {
    dias.push(new Date(ano, mes, i));
  }

  // Garante múltiplos de 7 (6 semanas máx.)
  while (dias.length % 7 !== 0) {
    dias.push(null);
  }

  return dias;
}

const pedidos = {
  "2023-01-01": "Pedido #00001",
  "2023-01-04": "Pedido #00001",
  "2023-01-06": "Pedido #00001",
  "2023-01-11": "Pedido #00001",
  "2023-01-12": "Pedido #00001",
  "2023-01-13": "Pedido #00001",
  "2023-01-16": "Pedido #00001",
  "2023-01-19": "Pedido #00001",
  "2023-01-21": "Pedido #00001",
  "2023-01-25": "Pedido #00001",
  "2023-01-28": "Pedido #00001",
  "2023-01-30": "Pedido #00001",
};

export function Calendario() {
  const ano = 2023;
  const mes = 0; // Janeiro (0-indexado)
  const dias = gerarDiasDoMes(ano, mes);

  const nomesDias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>JANEIRO</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", border: "1px solid #ccc" }}>
        {nomesDias.map((dia) => (
          <div key={dia} style={{ padding: "0.5rem", border: "1px solid #ccc", fontWeight: "bold" }}>
            {dia}
          </div>
        ))}
        {dias.map((data, index) => {
          const chave = data ? data.toISOString().split("T")[0] : "";
          return (
            <div
              key={index}
              style={{
                minHeight: "80px",
                border: "1px solid #ccc",
                padding: "0.5rem",
                textAlign: "left",
              }}
            >
              {data && (
                <>
                  <div>{data.getDate()}</div>
                  {pedidos[chave] && (
                    <div style={{ color: "blue", fontSize: "0.8rem", marginTop: "0.25rem" }}>
                      {pedidos[chave]}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
