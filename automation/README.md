# 🏭 Módulo de Automação Industrial e Telemetria IoT — SGA (Bônus Opcional)

Este módulo documenta a **extensão de automação industrial e predial**, componente opcional do **Projeto Integrador II** que agrega valor à gestão de ambientes físicos através da coleta de telemetria e monitoramento de ativos em tempo real.

---

## 🎯 Objetivo da Extensão

Integrar o monitoramento de sensores ao fluxo acadêmico do SGA, permitindo:
1. **Verificação de Ocupação Real vs. Teórica:** Comparar se salas com reserva no sistema possuem de fato pessoas presentes através de sensores PIR;
2. **Eficiência Energética e Conforto Térmico:** Detectar ambientes vazios com ar-condicionado e luzes ligadas (desperdício de energia elétrica);
3. **Geração Automatizada de Alertas de Manutenção:** Caso um sensor de temperatura reporte valores acima de 26.5°C com ar-condicionado em carga alta, uma sugestão de manutenção preventiva pode ser pré-preenchida no sistema.

---

## 📡 Sensores e Telemetria

A arquitetura prevê três tipos de dispositivos de sensoriamento:

| Sensor | Modelo / Padrão | Grandeza Medida | Aplicação no SGA |
|---|---|---|---|
| **Presença** | Sensor PIR HC-SR501 | Detecção de movimento (0/1) | Validação de ocupação real do espaço físico |
| **Temperatura** | DHT22 / Termopar Industrial | Temperatura em °C | Monitoramento de conforto e falha de climatização |
| **Consumo Elétrico** | Sensor de Corrente SCT-013 | Potência Ativa (Watts) | Identificação de equipamentos ligados em salas ociosas |

---

## 💻 Script Simulador de Telemetria

O simulador está implementado em [`automation/simulador_sensores.js`](simulador_sensores.js) e fornece dados sintéticos para testes e demonstrações acadêmicas sem colocar em risco sistemas fabris ou consumir hardware físico:

```bash
# Executa a geração de um lote de leituras de telemetria
node automation/simulador_sensores.js
```

### Amostra de Dados de Entrada
As leituras estruturadas de telemetria podem ser consultadas em formato JSON em [`data/sample/telemetria_sensores.json`](../data/sample/telemetria_sensores.json).

---

## 🛡️ Segurança e Governança

- **Isolamento de Redes:** A extensão de automação opera em ambiente de demonstração acadêmica com dados 100% sintetizados e seguros;
- **Sem Risco a Equipamentos Críticos:** Nenhum CLP de fábrica ou máquina pesada é acionado remotamente sem intertravamento;
- **Não Comprometimento do Escopo Principal:** O fluxo de gestão acadêmica, reservas e chamados de manutenção continua plenamente funcional de forma independente.
