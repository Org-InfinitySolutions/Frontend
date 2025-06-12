import React from "react";
import './Calendario.css'

function gerarDiasDoMes(ano, mes) {
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia = new Date(ano, mes + 1, 0);
  const diasNoMes = ultimoDia.getDate();
  const diaSemanaInicio = primeiroDia.getDay();

  const dias = [];

  for (let i = 0; i < diaSemanaInicio; i++) {
    dias.push(null);
  }

  for (let i = 1; i <= diasNoMes; i++) {
    dias.push(new Date(ano, mes, i));
  }

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
  const mes = 0;
  const dias = gerarDiasDoMes(ano, mes);
  const nomesDias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];

  return (
   <div className="max-w-7xl mx-auto p-4 font-sans">

      <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
        JANEIRO
      </h2>

      <div className="grid grid-cols-7 gap-px bg-gray-300 rounded overflow-hidden shadow">
        {nomesDias.map((dia) => (
          <div
            key={dia}
            className="bg-gray-100 text-gray-700 font-semibold text-sm text-center py-2"
          >
            {dia}
          </div>
        ))}

        {dias.map((data, index) => {
          const chave = data ? data.toISOString().split("T")[0] : "";
          const temPedido = pedidos[chave];

          return (
            <div
              key={index}
              className="bg-white min-h-[80px] text-sm text-gray-800 p-2 border border-gray-200"
            >
              {data && (
                <>
                  <div className="font-semibold">{data.getDate()}</div>
                  {temPedido && (
                    <div className="text-blue-600 text-xs mt-1">
                      {temPedido}
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
