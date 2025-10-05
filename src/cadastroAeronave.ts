import Aeronave from "./aeronave";
import Cadastro from "./cadastro";
import Entrada from "./entrada";
import Etapa from "./etapa";
import Pecas, { StatusPeca, TipoPeca } from "./peca";
import Teste, { ResultadoTeste, TipoTeste } from "./teste";

export default class cadastroAeronave extends Cadastro {
    public aeronaves: Array<Aeronave>
    public pecas: Array<Pecas>
    public testes: Array<Teste>
    public entrada: Entrada

    constructor(aeronave: Array<Aeronave>, pecas: Array<Pecas>, testes: Array<Teste>) {
        super()
        this.aeronaves = aeronave
        this.pecas = pecas
        this.testes = testes
        this.entrada = new Entrada
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro das aeronaves`)
        let codigo_aeronave = this.entrada.recebeTexto(`Código da aeronave: `)
        let modelo_aeronave = this.entrada.recebeTexto(`Modelo da aeronave: `)
        let tipo_aeronave = this.entrada.recebeNumero(`Tipo da aeronave(1-Comercial ou 2-Militar): `)
        let capacidade_aeronave = this.entrada.recebeNumero(`Capacidade da aeronave: `)
        let alcance_aeronave = this.entrada.recebeNumero(`Alcance da aeronave: `)
        let aeronaves = new Aeronave(codigo_aeronave, modelo_aeronave, tipo_aeronave, capacidade_aeronave, alcance_aeronave)
        let cad_pecas = this.entrada.recebeNumero(`Deseja associar peças a essa aeronave? (1-Sim/2-Não)`)
        if (cad_pecas == 1) {

            let pecasSalvas: Array<Pecas> = Pecas.pecasCads()

            if (pecasSalvas.length == 0) {
                console.log("Não há peças cadastradas ainda.");
            } else {
                console.log(`Peças Disponíveis:`)
                pecasSalvas.forEach((p, i) => {
                    console.log(`${i + 1}-Nome: ${p.nome}, Tipo: ${p.tipo}, Fornecedor: ${p.fornecedor}, Status: ${p.status}\n-----------------------\n`)
                })
                let qtd_addPeca = this.entrada.recebeNumero(`Quantas peças vai associar a aeronave? `)
                for (let i = 0; i < qtd_addPeca; i++) {
                    let indice = this.entrada.recebeNumero(`Digite o número da peça ${i + 1}: `);
                    let escolhida = pecasSalvas[indice - 1];
                    if (escolhida) {
                        aeronaves.addPecas(escolhida)
                    }
                }
            }
        }

        let cad_testes = this.entrada.recebeNumero(`Deseja associar testes a essa aeronave? (1-Sim/2-Não)`)
        if (cad_testes == 1) {

            let testesSalvos: Array<Teste> = Teste.testesCads()

            if (testesSalvos.length == 0) {
                console.log(`Não há testes cadastrados ainda para serem associados`)
            } else {
                console.log(`Teste Disponíveis:`)
                testesSalvos.forEach((t, i) => {
                    console.log(`${i + 1}-Tipo: ${t.tipo}, Resultado: ${t.resultado}`)
                })
                let qtd_addTeste = this.entrada.recebeNumero(`Quntos teste vai associar à essa aeronave? `)
                for (let i = 0; i < qtd_addTeste; i++) {
                    let indice = this.entrada.recebeNumero(`Digite o número da peça ${i + 1}: `);
                    let escolhida = testesSalvos[indice - 1];
                    if (escolhida) {
                        aeronaves.addTestes(escolhida)
                    }
                }
            }
        }

        let cad_etapas = this.entrada.recebeNumero(`Deseja associar etapa a essa aeronave? (1-Sim/2-Não)`)
        if (cad_etapas == 1) {

            let etapasSalvos: Array<Etapa> = Etapa.etapasCads()

            if (etapasSalvos.length == 0) {
                console.log(`Não há etapas cadastradas ainda para serem associados`)
            } else {
                console.log(`Etapas Disponíveis:`)
                etapasSalvos.forEach((e, i) => {
                    console.log(`${i + 1}-Nome da Etapa: ${e.nome}, Prazo: ${e.prazo}, Status: ${e.status}, Funcionários: ${e.funcionarios}`)
                })
                let qtd_addEtapas = this.entrada.recebeNumero(`Quntas etapas vai associar à essa aeronave? `)
                for (let i = 0; i < qtd_addEtapas; i++) {
                    let indice = this.entrada.recebeNumero(`Digite o número da etapa ${i + 1}: `);
                    let escolhida = etapasSalvos[indice - 1];
                    if (escolhida) {
                        aeronaves.addEtapas(escolhida)
                    }
                }
            }
        }
        console.log(`Cadastro concluído!`)
        aeronaves.salvar()
    }
}