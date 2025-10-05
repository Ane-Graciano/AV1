import Aeronave, { TipoAeronave } from "./aeronave"
import Cadastrados from "./cadastrados"
import cadastroAeronave from "./cadastroAeronave"
import cadastroEtapa from "./cadastroEtapa"
import cadastroFuncionario from "./cadastroFuncionario"
import cadastroPeca from "./cadastroPeca"
import cadastroTestes from "./cadastroTestes"
import Entrada from "./entrada"
import Etapa, { StatusEtapa } from "./etapa"
import Funcionario, { NivelPermissao } from "./funcionario"
import MudaStatus from "./mudaStatus"
import Pecas, { StatusPeca, TipoPeca } from "./peca"
import Relatorio from "./relatorio"
import Teste, { ResultadoTeste, TipoTeste } from "./teste"
import fs from "fs"

console.log(`Seja bem-vindo ao sistema da empresa Aerocode! :)`)
let executa = true
let pecas_cadastradas = new Cadastrados()
let funcionarios_cadastrados = new Cadastrados()
let aeronave_cadastradas = new Cadastrados()
let teste_cadastrados = new Cadastrados()
let etapa_cadastrados = new Cadastrados()

while (executa) {
    console.log(`Opções:`)
    console.log(`1- Cadastrar Peça`)
    console.log(`2- Cadastrar Funcionário`)
    console.log(`3- Cadastrar Aeronave`)
    console.log(`4- Cadastrar Teste`)
    console.log(`5- Cadastrar Etapa`)
    console.log(`6- Listar as Peças`)
    console.log(`7- Listar as Funcionários`)
    console.log(`8- Listar as Aeronaves`)
    console.log(`9- Listar as Testes`)
    console.log(`10- Listar as Etapas`)
    console.log(`11- Iniciar etapa`)
    console.log(`12- Concluir etapa`)
    console.log(`13- Atualizar Status de peça`)
    console.log(`14- Gerar relatorio final`)
    console.log(`0- Sair`)

    let entrada = new Entrada
    let op_escolhida = entrada.recebeNumero(`Escolha uma opção: `)

    switch (op_escolhida) {
        case 1:
            let cadastro_peca = new cadastroPeca(pecas_cadastradas.getPecas())
            cadastro_peca.cadastrar()
            break
        case 2:
            let cadastro_funcionario = new cadastroFuncionario(funcionarios_cadastrados.getFuncionarios())
            cadastro_funcionario.cadastrar()
            break
        case 3:
            let cadastro_aeronave = new cadastroAeronave(aeronave_cadastradas.getAeronave(), pecas_cadastradas.getPecas(), teste_cadastrados.getTetes())
            cadastro_aeronave.cadastrar()
            break
        case 4:
            let cadastro_teste = new cadastroTestes(teste_cadastrados.getTetes())
            cadastro_teste.cadastrar()
            break
        case 5:
            let cadastro_etapa = new cadastroEtapa(etapa_cadastrados.getEtapa(), funcionarios_cadastrados.getFuncionarios())
            cadastro_etapa.cadastrar()
            break
        case 6:
            let lista_pecas = new Pecas(0, '', 0 as TipoPeca, '', 0 as StatusPeca)
            lista_pecas.carregar()
            break
        case 7:
            let lista_funcionarios = new Funcionario('', '', '', '', '', '', 0 as NivelPermissao)
            lista_funcionarios.carregar()
            break
        case 8:
            let lista_aeronaves = new Aeronave('', '', 0 as TipoAeronave, 0, 0)
            lista_aeronaves.carregar()
            break
        case 9:
            let lista_testes = new Teste(0 as TipoTeste, 0 as ResultadoTeste)
            lista_testes.carregar()
            break
        case 10:
            let lista_etapas = new Etapa(0, '', '', 0 as StatusEtapa)
            lista_etapas.carregar()
            break
        case 11:
            let etapas = Etapa.etapasCads()
            if (etapas.length == 0) {
                console.log(`Não há etapas para isso`)
                break
            } else {
                console.log(`Etapas:`)
                etapas.forEach((e, i) => {
                    console.log(`${i + 1}- Nome: ${e.nome}, Prazo: ${e.prazo}, Status: ${StatusEtapa[e.status]}`)
                })
                let etapa_inicia = entrada.recebeNumero(`qual etapa deseja iniciar? `)
                let e_inicia = etapas[etapa_inicia - 1]
                if (e_inicia) {
                    e_inicia.iniciar()
                    e_inicia.salvar()
                } else {
                    console.log(`Número de etapa inválida!`)
                }
                break
            }
        case 12:
            let etapas_f = Etapa.etapasCads()
            if (etapas_f.length == 0) {
                console.log(`Não há etapas para isso`)
                break
            } else {
                console.log(`Etapas:`)
                etapas_f.forEach((e, i) => {
                    console.log(`${i + 1}- Nome: ${e.nome}, Prazo: ${e.prazo}, Status: ${StatusEtapa[e.status]}`)
                })
                let etapa_finaliza = entrada.recebeNumero(`qual etapa deseja finalizar? `)
                let e_finaliza = etapas_f[etapa_finaliza - 1]
                if (e_finaliza) {
                    e_finaliza.finalizar()
                    e_finaliza.salvar()
                } else {
                    console.log(`Número de etapa inválida!`)
                }
                break
            }
        case 13:
            let pecas = Pecas.pecasCads()
            if (pecas.length == 0) {
                console.log(`Não há peças para isso`)
                break
            } else {
                console.log(`Peças:`)
                pecas.forEach((p, i) => {
                    console.log(`${i + 1}- Nome: ${p.nome}, Tipo: ${p.tipo}, Fornecedor: ${p.fornecedor}, Status Atual: ${p.status} `)
                })
                let n_peca_atualiza = entrada.recebeNumero(`qual peça deseja atualizar (digite o número)? `)
                let peca_atualiza = pecas[n_peca_atualiza - 1]
                if (peca_atualiza) {
                    let pnovo_status = entrada.recebeNumero(`Novo status da peça (1-Em Produção ou 2-Em transporte ou 3-Pronta):`)
                    let status_enum: StatusPeca | undefined;
                    switch (pnovo_status) {
                        case 1: status_enum = StatusPeca.EM_PRODUCAO; break;
                        case 2: status_enum = StatusPeca.EM_TRANSPORTE; break;
                        case 3: status_enum = StatusPeca.PRONTA; break;
                        default:
                            console.log(`Status inválido!`);
                            break;
                    }

                    if (status_enum !== undefined) {
                        MudaStatus.atualizaStatusP(peca_atualiza, status_enum);
                    }
                } else {
                    console.log(`Número de etapa inválida!`)
                }
                break
            }
        case 14:
            const relatorio = new Relatorio();
            const caminhoArquivo = "arquivos/aeronaves.txt";

            if (!fs.existsSync(caminhoArquivo)) {
                console.log("Nenhum arquivo de aeronaves encontrado para gerar relatório.");
                break;
            }

            const conteudo = fs.readFileSync(caminhoArquivo, "utf-8").trim();
            if (!conteudo) {
                console.log("O arquivo de aeronaves está vazio.");
                break;
            }

            const linhas = conteudo.split(/\r?\n/);

            // Monta as aeronaves a partir do arquivo
            const aeronaves: Aeronave[] = linhas.map((linha) => {
                const [codigo, modelo, tipoStr, capacidadeStr, alcanceStr, pecasStr = "", testesStr = "", etapasStr = ""] = linha.split(";");

                const tipo = tipoStr === "COMERCIAL" ? TipoAeronave.COMERCIAL : TipoAeronave.MILITAR;
                const capacidade = Number(capacidadeStr);
                const alcance = Number(alcanceStr);

                const aeronave = new Aeronave(codigo, modelo, tipo, capacidade, alcance);

                // --- PECAS ---
                if (pecasStr) {
                    const listaPecas = pecasStr.split("|");
                    listaPecas.forEach(p => {
                        const [id, nome, tipoP, fornecedor, statusP] = p.split(":");
                        if (!nome) return;
                        const novaPeca = new Pecas(
                            Number(id),
                            nome,
                            (TipoPeca as any)[tipoP],
                            fornecedor,
                            (StatusPeca as any)[statusP]
                        );
                        aeronave.addPecas(novaPeca);
                    });
                }

                // --- TESTES ---
                if (testesStr) {
                    const listaTestes = testesStr.split("|");
                    listaTestes.forEach(t => {
                        const [tipoT, resultadoT] = t.split(":");
                        if (!tipoT) return;
                        const novoTeste = new Teste(
                            (TipoTeste as any)[tipoT],
                            (ResultadoTeste as any)[resultadoT]
                        );
                        aeronave.addTestes(novoTeste);
                    });
                }

                // --- ETAPAS ---
                if (etapasStr) {
                    const listaEtapas = etapasStr.split("|");
                    listaEtapas.forEach(e => {
                        const [nomeE, prazoE, statusE, funcionariosStr = ""] = e.split(":");
                        if (!nomeE) return;
                        const novaEtapa = new Etapa(0, nomeE, prazoE, Number(statusE));

                        if (funcionariosStr) {
                            const listaFuncs = funcionariosStr.split(",");
                            listaFuncs.forEach(f => {
                                const [idF, nomeF, telF, endF, userF, senhaF, nivelF] = f.split("/");
                                const novoFunc = new Funcionario(
                                    idF,
                                    nomeF,
                                    telF,
                                    endF,
                                    userF,
                                    senhaF,
                                    Number(nivelF)
                                );
                                novaEtapa.funcionarios.push(novoFunc);
                            });
                        }

                        aeronave.addEtapas(novaEtapa);
                    });
                }

                return aeronave;
            });

            console.log("Aeronaves disponíveis:");
            aeronaves.forEach((a, i) => {
                console.log(`${i + 1} - Código: ${a.codigo}, Modelo: ${a.modelo}`);
            });
            console.log("0 - Gerar relatório de TODAS as aeronaves");

            const escolha = entrada.recebeNumero("Digite o número da aeronave (ou 0 para todas): ");

            if (escolha === 0) {
                aeronaves.forEach(a => relatorio.gerarRelatorio(a));
                relatorio.salvarEmArquivo();
            } else {
                const aeronaveSelecionada = aeronaves[escolha - 1];
                if (!aeronaveSelecionada) {
                    console.log("Número inválido.");
                    break;
                }
                relatorio.gerarRelatorio(aeronaveSelecionada);
                relatorio.salvarEmArquivo();
            }

            break;
        case 0:
            executa = false
            console.log(`Obrigada, até mais`)
            break
        default:
            console.log(`Número inválido`)
    }
}