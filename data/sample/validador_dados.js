/**
 * Script de Validação de Dados de Entrada e Integridade do SGA
 * Projeto Integrador II - Ciência de Dados, DevOps e Nuvem
 * 
 * Regras auditadas:
 * 1. Formato e esquema dos dados de ambientes, turmas, alocações e manutenção.
 * 2. Horários consistentes (horário de fim > horário de início).
 * 3. Validação de capacidade (> 0) e unicidade de chaves.
 * 4. Detecção e rejeição de alocações conflitantes (mesmo ambiente e mesmo horário).
 * 5. Ciclo de vida e consistência de status de manutenção.
 */

const fs = require('fs');
const path = require('path');

function carregarJSON(nomeArquivo) {
  const caminho = path.join(__dirname, nomeArquivo);
  if (!fs.existsSync(caminho)) {
    throw new Error(`Arquivo não encontrado: ${caminho}`);
  }
  return JSON.parse(fs.readFileSync(caminho, 'utf-8'));
}

function validarAmbientes(ambientes) {
  const erros = [];
  const codigos = new Set();

  ambientes.forEach((a, idx) => {
    if (!a.id || !a.codigo || !a.nome) {
      erros.push(`[Ambiente #${idx + 1}] Campos obrigatórios ausentes (id, codigo ou nome).`);
    }
    if (typeof a.capacidade !== 'number' || a.capacidade <= 0) {
      erros.push(`[Ambiente ${a.codigo || idx}] Capacidade inválida (${a.capacidade}). Deve ser > 0.`);
    }
    if (codigos.has(a.codigo)) {
      erros.push(`[Ambiente ${a.codigo}] Código duplicado detectado.`);
    }
    codigos.add(a.codigo);
  });

  return { valido: erros.length === 0, total: ambientes.length, erros };
}

function validarTurmas(turmas) {
  const erros = [];
  const codigos = new Set();

  turmas.forEach((t, idx) => {
    if (!t.id || !t.codigo || !t.nome) {
      erros.push(`[Turma #${idx + 1}] Identificador ou código ausente.`);
    }
    if (t.horario_inicio && t.horario_fim && t.horario_fim <= t.horario_inicio) {
      erros.push(`[Turma ${t.codigo}] Horário final (${t.horario_fim}) deve ser posterior ao inicial (${t.horario_inicio}).`);
    }
    if (t.periodo_inicio && t.periodo_fim && t.periodo_fim < t.periodo_inicio) {
      erros.push(`[Turma ${t.codigo}] Período de término anterior ao período de início.`);
    }
    if (codigos.has(t.codigo)) {
      erros.push(`[Turma ${t.codigo}] Código de turma duplicado.`);
    }
    codigos.add(t.codigo);
  });

  return { valido: erros.length === 0, total: turmas.length, erros };
}

function validarAlocacoes(alocacoes) {
  const erros = [];
  const mapaConflitos = new Map();

  alocacoes.forEach((al, idx) => {
    if (!al.ambiente_id || !al.dia_semana || !al.horario_inicio || !al.horario_fim) {
      erros.push(`[Alocação #${idx + 1}] Campos obrigatórios de tempo/ambiente ausentes.`);
      return;
    }

    const chave = `${al.ambiente_id}-${al.dia_semana}`;
    if (!mapaConflitos.has(chave)) {
      mapaConflitos.set(chave, []);
    }

    const alocacoesMesmoDia = mapaConflitos.get(chave);
    for (const previa of alocacoesMesmoDia) {
      const colide = (al.horario_inicio < previa.horario_fim) && (al.horario_fim > previa.horario_inicio);
      if (colide) {
        erros.push(`[Alocação #${al.id}] Conflito de horário no ambiente ${al.ambiente_id} (${al.dia_semana}) com alocação #${previa.id}.`);
      }
    }
    alocacoesMesmoDia.push(al);
  });

  return { valido: erros.length === 0, total: alocacoes.length, erros };
}

function validarManutencao(sugestoes) {
  const erros = [];
  const statusPermitidos = ['PENDENTE_ANALISE', 'APROVADA', 'NAO_APROVADA', 'EM_ATENDIMENTO', 'FINALIZADA'];

  sugestoes.forEach((s) => {
    if (!s.id || !s.ambiente_id || !s.descricao) {
      erros.push(`[Manutenção #${s.id}] Descrição ou ambiente ausente.`);
    }
    if (!statusPermitidos.includes(s.status)) {
      erros.push(`[Manutenção #${s.id}] Status inválido '${s.status}'. Permitidos: ${statusPermitidos.join(', ')}.`);
    }
    if (s.finalizado_em && s.status !== 'FINALIZADA') {
      erros.push(`[Manutenção #${s.id}] Data de finalização presente, mas status é '${s.status}'.`);
    }
  });

  return { valido: erros.length === 0, total: sugestoes.length, erros };
}

function executarValidacaoCompleta() {
  console.log('🔍 [SGA - Data Quality] Iniciando validação dos conjuntos de dados sintéticos...');
  
  const relatorio = {
    timestamp: new Date().toISOString(),
    status_geral: 'APROVADO',
    detalhes: {}
  };

  try {
    const ambientes = carregarJSON('ambientes.json');
    relatorio.detalhes.ambientes = validarAmbientes(ambientes);

    const turmas = carregarJSON('turmas.json');
    relatorio.detalhes.turmas = validarTurmas(turmas);

    const alocacoes = carregarJSON('alocacoes.json');
    relatorio.detalhes.alocacoes = validarAlocacoes(alocacoes);

    const manutencao = carregarJSON('sugestoes_manutencao.json');
    relatorio.detalhes.manutencao = validarManutencao(manutencao);

    const temErros = Object.values(relatorio.detalhes).some(d => !d.valido);
    if (temErros) {
      relatorio.status_geral = 'FALHA_VALIDACAO';
    }

    console.log(`✅ Validação concluída. Status: ${relatorio.status_geral}`);
    console.log(JSON.stringify(relatorio, null, 2));
    return relatorio;
  } catch (err) {
    console.error('❌ Erro fatal durante a validação:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  executarValidacaoCompleta();
}

module.exports = {
  validarAmbientes,
  validarTurmas,
  validarAlocacoes,
  validarManutencao,
  executarValidacaoCompleta
};
