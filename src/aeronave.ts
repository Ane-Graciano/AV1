import * as fs from 'fs'
import Pecas, { StatusPeca, TipoPeca } from './peca'
import Teste, { ResultadoTeste, TipoTeste } from './teste'
import Etapa from './etapa'

export enum TipoAeronave {
    "COMERCIAL" = 1,
    "MILITAR" = 2
}

export default class Aeronave {
    public codigo: string
    public modelo: string
    public tipo: TipoAeronave
    public capacidade: number
    public alcance: number
    public pecas: Array<Pecas>
    public testes: Array<Teste>
    public etapas: Array<Etapa>

    static listaAeronaves: Aeronave[] = []

    constructor(codigo: string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance: number) {
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
        this.pecas = []
        this.testes = []
        this.etapas = []
        Aeronave.listaAeronaves.push(this)
    }

    addPecas(peca: Pecas) {
        this.pecas.push(peca)
    }

    addTestes(teste: Teste) {
        this.testes.push(teste)
    }

    addEtapas(etapa: Etapa) {
        this.etapas.push(etapa)
    }

    salvar(): void {
        try {
            let pecas_add = this.pecas.map(p => `${p.id}:${p.nome}:${TipoPeca[p.tipo]}:${p.fornecedor}:${StatusPeca[p.status]}`).join("|")
            let testes_add = this.testes.map(t => `${TipoTeste[t.tipo]}:${ResultadoTeste[t.resultado]}`).join("|")
            let etapa_add = this.etapas.map(e => {
                let info_funcs = e.funcionarios.map(f => `${f.id}/${f.nome}/${f.telefone}/${f.endereco}/${f.usuario}/${f.senha}/${f.nivelPermissao}`).join(", ")
                return `${e.nome}:${e.prazo}:${e.status}:${info_funcs}`
            }).join("|")

            fs.appendFileSync('arquivos/aeronaves.txt', `${this.codigo};${this.modelo};${TipoAeronave[this.tipo]};${this.capacidade};${this.alcance};${pecas_add};${testes_add};${etapa_add}\r\n`);
            console.log(`Aeronave salva! :)`)
        } catch (err) {
            console.log(`Erro ao salvar :( ${err}`);
        }
    }

    static aeronavesCads(): Aeronave[] {
        return Aeronave.listaAeronaves;
    }

    carregar(): void {
        if (!fs.existsSync('arquivos/aeronaves.txt')) {
            console.log(`Nenhuma aeronave registrada!`)
            return
        }

        let informacoes = fs.readFileSync('arquivos/aeronaves.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        console.log(`\nAeronaves Salvas:\n`)
        linhas.forEach((linha: any, i: any) => {
            const [codigo, modelo, tipo, capacidade, alcance, pecas, testes, etapas] = linha.split(";")
            console.log(`${i + 1}. Código: ${codigo}, \nModelo: ${modelo}, \nTipo: ${tipo}, \nCapacidade: ${capacidade}, \nAlcance: ${alcance}\n`)
            if (pecas && pecas.length > 0) {
                console.log("Peças Associadas:")
                pecas.split("|").forEach((p: any) => {
                    let [nome, tipo, fornecedor, status] = p.split(":")
                    console.log(`Nome: ${nome}, Tipo: ${tipo}, Fornecedor: ${fornecedor}, Status: ${status}\n`)
                })
            }
            if (testes && testes.length > 0) {
                console.log(`Testes Associados:`)
                testes.split("|").forEach((t: any) => {
                    let [tipo, resultado] = t.split(":")
                    console.log(`Tipo: ${tipo}, Resultado: ${resultado}\n`)
                })
            }
            if (etapas && etapas.length > 0) {
                console.log(`Etapas Associados:`)
                etapas.split("|").forEach((e: any) => {
                    let [nome, prazo, status, funcionarios] = e.split(":")
                    console.log(`Nome: ${nome}, Prazo: ${prazo}, Status: ${status}, Funcionarios: ${funcionarios}`)
                })
            }
            console.log(`\n-----------------------\n`)
        })
    }
}
