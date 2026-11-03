const test = require('node:test');
const assert = require('node:assert/strict');
const {
  calcularTaxaOcupacao,
  calcularTaxaCumprimentoSLA,
  calcularMTTRHoras,
  calcularTaxaConversaoSugestoes
} = require('../data_science/indicadores');

test('Indicador 1: Taxa de Ocupação - cálculo correto', () => {
  // Exemplo: 14 horas alocadas em uma grade de 20 horas úteis semanais = 70%
  const taxa = calcularTaxaOcupacao(14, 20);
  assert.equal(taxa, 70.00);
});

test('Indicador 1: Taxa de Ocupação - validação de limites e divisão por zero', () => {
  assert.throws(() => calcularTaxaOcupacao(10, 0), /maior que zero/);
  assert.throws(() => calcularTaxaOcupacao(-5, 20), /não pode ser negativa/);
  
  // Taxa não ultrapassa 100%
  assert.equal(calcularTaxaOcupacao(25, 20), 100.00);
});

test('Indicador 2: Taxa de Cumprimento de SLA - cálculo correto', () => {
  const chamados = [
    { status: 'FINALIZADA', sla_cumprido: true },
    { status: 'FINALIZADA', sla_cumprido: true },
    { status: 'FINALIZADA', sla_cumprido: false },
    { status: 'EM_ATENDIMENTO', sla_cumprido: null } // Não finalizado, não entra no denominador
  ];
  // 2 dentro do prazo de 3 finalizados = 66.67%
  const taxaSLA = calcularTaxaCumprimentoSLA(chamados);
  assert.equal(taxaSLA, 66.67);
});

test('Indicador 3: MTTR (Tempo Médio de Reparo) - cálculo em horas', () => {
  const ocorrencias = [
    {
      status: 'FINALIZADA',
      analisado_em: '2026-03-08T10:00:00Z',
      finalizado_em: '2026-03-08T16:00:00Z' // 6 horas
    },
    {
      status: 'FINALIZADA',
      analisado_em: '2026-03-09T08:00:00Z',
      finalizado_em: '2026-03-09T18:00:00Z' // 10 horas
    }
  ];
  // Média de 6h e 10h = 8h
  const mttr = calcularMTTRHoras(ocorrencias);
  assert.equal(mttr, 8.00);
});

test('Indicador 4: Taxa de Conversão de Sugestões em Ocorrências', () => {
  const sugestoes = [
    { status: 'FINALIZADA' },
    { status: 'EM_ATENDIMENTO' },
    { status: 'APROVADA' },
    { status: 'NAO_APROVADA' },
    { status: 'PENDENTE_ANALISE' } // Ainda não avaliada, não entra
  ];
  // 3 aprovadas de 4 avaliadas = 75%
  const conversao = calcularTaxaConversaoSugestoes(sugestoes);
  assert.equal(conversao, 75.00);
});
