/**
 * Simulador de Telemetria de Sensores IoT / Automação Predial do SGA
 * Extensão Opcional: Automação Industrial e Sensores (Projeto Integrador II)
 * 
 * Simula sensores em ambientes acadêmicos:
 * - Sensor de Presença Infravermelho Passivo (PIR)
 * - Sensor de Temperatura e Umidade (DHT22)
 * - Sensor de Corrente e Consumo de Energia Elétrica (SCT-013)
 */

const fs = require('fs');
const path = require('path');

function gerarLeituraTelemetria(ambienteCodigo, tipoSensor) {
  const agora = new Date().toISOString();
  let valor = 0;
  let unidade = '';
  let status = 'OK';

  switch (tipoSensor) {
    case 'PIR_PRESENCA':
      valor = Math.random() > 0.3 ? 1 : 0; // 70% de chance de presença
      unidade = 'booleano';
      break;

    case 'TEMPERATURA':
      // Temperatura entre 20°C e 29°C
      valor = Number((20 + Math.random() * 9).toFixed(1));
      unidade = '°C';
      if (valor > 26.5) {
        status = 'ALERTA_TEMPERATURA_ELEVADA';
      }
      break;

    case 'CONSUMO_ENERGIA':
      // Potência em Watts entre 200W (vazio/lâmpadas) e 2500W (ar ligado + computadores)
      valor = Math.floor(200 + Math.random() * 2300);
      unidade = 'Watts';
      if (valor > 2200) {
        status = 'CONSUMO_PICO';
      }
      break;

    default:
      valor = 0;
      unidade = 'N/A';
  }

  return {
    sensor_id: `SN-${tipoSensor.substring(0, 3)}-${ambienteCodigo}`,
    ambiente_codigo: ambienteCodigo,
    tipo_sensor: tipoSensor,
    timestamp: agora,
    valor,
    unidade,
    status_operacional: status
  };
}

function simularLoteTelemetria(ambientes = ['SL-101', 'LAB-201', 'LAB-202', 'AUD-01']) {
  const sensores = ['PIR_PRESENCA', 'TEMPERATURA', 'CONSUMO_ENERGIA'];
  const leituras = [];

  for (const amb of ambientes) {
    for (const s of sensores) {
      leituras.push(gerarLeituraTelemetria(amb, s));
    }
  }

  console.log(`📡 [IoT Simulator] Geradas ${leituras.length} leituras de telemetria predial:`);
  console.table(leituras.map(l => ({
    Ambiente: l.ambiente_codigo,
    Sensor: l.tipo_sensor,
    Valor: `${l.valor} ${l.unidade}`,
    Status: l.status_operacional
  })));

  return leituras;
}

if (require.main === module) {
  simularLoteTelemetria();
}

module.exports = {
  gerarLeituraTelemetria,
  simularLoteTelemetria
};
