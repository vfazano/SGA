const test = require('node:test');
const assert = require('node:assert/strict');

function verificarPermissaoReserva(statusAmbiente) {
  if (statusAmbiente === 'Disponível' || statusAmbiente === 'LIVRE') {
    return { permitido: true, motivo: 'Ambiente livre para reserva.' };
  }
  if (statusAmbiente === 'Ocupada' || statusAmbiente === 'OCUPADA') {
    return { permitido: false, motivo: 'Ambiente já possui alocação ou reserva no horário selecionado.' };
  }
  if (statusAmbiente === 'Em Manutenção' || statusAmbiente === 'EM MANUTENÇÃO') {
    return { permitido: false, motivo: 'Ambiente indisponível devido a ocorrência ou manutenção preventiva.' };
  }
  return { permitido: false, motivo: 'Status de ambiente desconhecido.' };
}

function processarTriagemManutencao(sugestao, decisaoAprovacao, motivo) {
  if (!sugestao || sugestao.status !== 'PENDENTE_ANALISE') {
    throw new Error('Apenas solicitações com status PENDENTE_ANALISE podem ser triadas.');
  }

  if (decisaoAprovacao === true) {
    return {
      ...sugestao,
      status: 'APROVADA',
      analisado_em: new Date().toISOString(),
      observacao_triagem: motivo || 'Aprovado na triagem técnica.'
    };
  } else {
    return {
      ...sugestao,
      status: 'NAO_APROVADA',
      analisado_em: new Date().toISOString(),
      observacao_triagem: motivo || 'Rejeitado por improcedência ou duplicidade.'
    };
  }
}

test('Regra de Reserva - Permite reserva apenas se sala estiver Disponível/LIVRE', () => {
  assert.equal(verificarPermissaoReserva('Disponível').permitido, true);
  assert.equal(verificarPermissaoReserva('LIVRE').permitido, true);
  
  const ocupada = verificarPermissaoReserva('Ocupada');
  assert.equal(ocupada.permitido, false);
  assert.match(ocupada.motivo, /possui alocação/);

  const manutencao = verificarPermissaoReserva('Em Manutenção');
  assert.equal(manutencao.permitido, false);
  assert.match(manutencao.motivo, /indisponível devido a ocorrência/);
});

test('Regra de Triagem - Separação estrita entre sugestão pública e ocorrência oficial', () => {
  const sugestaoPendente = {
    id: 10,
    ambiente_id: 2,
    descricao: 'Janela quebrada',
    status: 'PENDENTE_ANALISE'
  };

  const aprovada = processarTriagemManutencao(sugestaoPendente, true, 'Confirmado risco de segurança');
  assert.equal(aprovada.status, 'APROVADA');
  assert.ok(aprovada.analisado_em);
  assert.equal(aprovada.observacao_triagem, 'Confirmado risco de segurança');

  const rejeitada = processarTriagemManutencao(sugestaoPendente, false, 'Alarme falso');
  assert.equal(rejeitada.status, 'NAO_APROVADA');
  assert.equal(rejeitada.observacao_triagem, 'Alarme falso');
});
