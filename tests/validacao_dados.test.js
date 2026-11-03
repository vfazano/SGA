const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const {
  validarAmbientes,
  validarTurmas,
  validarAlocacoes,
  validarManutencao
} = require('../data/sample/validador_dados');

test('Validação de Ambientes - deve aprovar dados válidos', () => {
  const ambientesValidos = [
    { id: 1, codigo: 'SL-101', nome: 'Sala 101', capacidade: 40, status: 'Disponível' }
  ];
  const resultado = validarAmbientes(ambientesValidos);
  assert.equal(resultado.valido, true);
  assert.equal(resultado.erros.length, 0);
});

test('Validação de Ambientes - deve rejeitar capacidade negativa ou zero', () => {
  const ambientesInvalidos = [
    { id: 1, codigo: 'SL-101', nome: 'Sala 101', capacidade: -5, status: 'Disponível' },
    { id: 2, codigo: 'SL-102', nome: 'Sala 102', capacidade: 0, status: 'Disponível' }
  ];
  const resultado = validarAmbientes(ambientesInvalidos);
  assert.equal(resultado.valido, false);
  assert.equal(resultado.erros.length, 2);
});

test('Validação de Ambientes - deve rejeitar código duplicado', () => {
  const duplicados = [
    { id: 1, codigo: 'SL-101', nome: 'Sala 101', capacidade: 30, status: 'Disponível' },
    { id: 2, codigo: 'SL-101', nome: 'Sala 101 Duplicada', capacidade: 30, status: 'Disponível' }
  ];
  const resultado = validarAmbientes(duplicados);
  assert.equal(resultado.valido, false);
  assert.match(resultado.erros[0], /Código duplicado/);
});

test('Validação de Turmas - deve rejeitar horário final anterior ao inicial', () => {
  const turmaInvalida = [
    {
      id: 1,
      codigo: 'TURMA-INV',
      nome: 'Turma Horário Invertido',
      horario_inicio: '22:30:00',
      horario_fim: '19:00:00'
    }
  ];
  const resultado = validarTurmas(turmaInvalida);
  assert.equal(resultado.valido, false);
  assert.match(resultado.erros[0], /Horário final/);
});

test('Validação de Alocações - deve detectar conflito de horário no mesmo ambiente', () => {
  const alocacoesConflitantes = [
    {
      id: 1,
      ambiente_id: 1,
      dia_semana: 'Segunda-feira',
      horario_inicio: '19:00:00',
      horario_fim: '21:00:00'
    },
    {
      id: 2,
      ambiente_id: 1,
      dia_semana: 'Segunda-feira',
      horario_inicio: '20:00:00',
      horario_fim: '22:00:00'
    }
  ];
  const resultado = validarAlocacoes(alocacoesConflitantes);
  assert.equal(resultado.valido, false);
  assert.match(resultado.erros[0], /Conflito de horário/);
});

test('Validação de Manutenção - deve rejeitar status desconhecido', () => {
  const manutencaoInvalida = [
    {
      id: 99,
      ambiente_id: 1,
      descricao: 'Teste',
      status: 'STATUS_INEXISTENTE'
    }
  ];
  const resultado = validarManutencao(manutencaoInvalida);
  assert.equal(resultado.valido, false);
  assert.match(resultado.erros[0], /Status inválido/);
});
