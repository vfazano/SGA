/**
 * Módulo de Ciência de Dados e Cálculo de Indicadores do SGA
 * Projeto Integrador II - Ciência de Dados, DevOps e Nuvem
 */

/**
 * Indicador 1: Taxa de Ocupação do Ambiente (%)
 * Fórmula: (Horas Alocadas / Horas Disponíveis na Janela) * 100
 * @param {number} horasAlocadas - Total de horas com aula alocada
 * @param {number} horasDisponiveisJanela - Total de horas úteis da janela (ex: 20h semanais no turno noturno)
 * @returns {number} Taxa de ocupação percentual (0 a 100)
 */
function calcularTaxaOcupacao(horasAlocadas, horasDisponiveisJanela) {
  if (!horasDisponiveisJanela || horasDisponiveisJanela <= 0) {
    throw new Error('Horas disponíveis na janela deve ser maior que zero.');
  }
  if (horasAlocadas < 0) {
    throw new Error('Horas alocadas não pode ser negativa.');
  }
  const taxa = (horasAlocadas / horasDisponiveisJanela) * 100;
  return Number(Math.min(100, Math.max(0, taxa)).toFixed(2));
}

/**
 * Indicador 2: Taxa de Cumprimento de SLA de Manutenção (%)
 * Fórmula: (Chamados Finalizados Dentro do Prazo / Total de Chamados Finalizados) * 100
 * @param {Array<{sla_cumprido: boolean, status: string}>} chamados 
 * @returns {number} Percentual de SLA atingido
 */
function calcularTaxaCumprimentoSLA(chamados) {
  const finalizados = chamados.filter(c => c.status === 'FINALIZADA' && c.sla_cumprido !== null);
  if (finalizados.length === 0) return 0;

  const dentroDoPrazo = finalizados.filter(c => c.sla_cumprido === true).length;
  return Number(((dentroDoPrazo / finalizados.length) * 100).toFixed(2));
}

/**
 * Indicador 3: MTTR - Mean Time to Repair (Tempo Médio de Reparo em Horas)
 * Fórmula: Soma(Data Finalização - Data Análise/Aprovação em horas) / Total de Ocorrências Reparadas
 * @param {Array<{analisado_em: string, finalizado_em: string, status: string}>} ocorrencias 
 * @returns {number} MTTR em horas decimais
 */
function calcularMTTRHoras(ocorrencias) {
  const concluidas = ocorrencias.filter(o => o.status === 'FINALIZADA' && o.analisado_em && o.finalizado_em);
  if (concluidas.length === 0) return 0;

  const somaHoras = concluidas.reduce((acc, o) => {
    const inicio = new Date(o.analisado_em).getTime();
    const fim = new Date(o.finalizado_em).getTime();
    const diffHoras = (fim - inicio) / (1000 * 60 * 60);
    return acc + Math.max(0, diffHoras);
  }, 0);

  return Number((somaHoras / concluidas.length).toFixed(2));
}

/**
 * Indicador 4: Taxa de Conversão de Sugestões Públicas em Ocorrências (%)
 * Fórmula: (Sugestões Aprovadas ou Convertidas / Total de Sugestões Avaliadas) * 100
 * @param {Array<{status: string}>} sugestoes 
 * @returns {number} Taxa de conversão percentual
 */
function calcularTaxaConversaoSugestoes(sugestoes) {
  const avaliadas = sugestoes.filter(s => ['APROVADA', 'EM_ATENDIMENTO', 'FINALIZADA', 'NAO_APROVADA'].includes(s.status));
  if (avaliadas.length === 0) return 0;

  const aprovadas = avaliadas.filter(s => ['APROVADA', 'EM_ATENDIMENTO', 'FINALIZADA'].includes(s.status));
  return Number(((aprovadas.length / avaliadas.length) * 100).toFixed(2));
}

module.exports = {
  calcularTaxaOcupacao,
  calcularTaxaCumprimentoSLA,
  calcularMTTRHoras,
  calcularTaxaConversaoSugestoes
};
