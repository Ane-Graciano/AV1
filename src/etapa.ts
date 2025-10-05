import fs from 'fs'
import Funcionario, { NivelPermissao } from "./funcionario"

export enum StatusEtapa {
    "PENDENTE" = 1,
    "ANDAMENTO" = 2,
    "CONCLUIDA" = 3
}

export default class Etapa {
    public id: number
    public nome: string
    public prazo: string
    public status: StatusEtapa
    public funcionarios: Array<Funcionario>

    constructor(id: number, nome: string, prazo: string, status: StatusEtapa, funcionarios: Array<Funcionario> = []) {
        this.id = id
        this.nome = nome
        this.prazo = prazo
        this.status = status
        this.funcionarios = funcionarios
    }


    iniciar(): void {
        if (this.status == StatusEtapa.PENDENTE) {
            this.status = StatusEtapa.ANDAMENTO
            console.log(`Etapa ${this.nome} iniciada com sucesso! :)`)
        } else {
            console.log(`A etapa ${this.nome} não pode ser iniciada, ela está ${StatusEtapa[this.status]}`)
        }
    }

    finalizar(): void {
        if (this.status == StatusEtapa.ANDAMENTO) {
            this.status = StatusEtapa.CONCLUIDA
            console.log(`Etapa ${this.nome} concluida com sucesso! :)`)
        } else {
            console.log(`A etapa ${this.nome} não pode ser concluíida, ela está ${StatusEtapa[this.status]}`)
        }
    }

    associarFuncionario(f: Funcionario): void {
        this.funcionarios.push(f)
    }

    salvar(): void {
        try {
            let etapas: Array<string> = [];
            if (fs.existsSync('arquivos/etapas.txt')) {
                etapas = fs.readFileSync('arquivos/etapas.txt', 'utf-8').trim().split("\n")
            }

            etapas = etapas.filter(e => !e.startsWith(this.id + ";"))

            let funcs_add = this.funcionarios.map(f => `${f.id}|${f.nome}|${f.telefone}|${f.endereco}|${f.usuario}|${f.senha}|${NivelPermissao[f.nivelPermissao]}`).join("/")
            etapas.push(`${this.id};${this.nome};${this.prazo};${StatusEtapa[this.status]};${funcs_add}`)

            fs.writeFileSync('arquivos/etapas.txt', etapas.join("\n"))
            console.log(`Etapa salva! :)`)
        } catch (err) {
            console.log(`Erro ao salvar :( ${err}`);
        }
    }

    carregar(): void {
        if (!fs.existsSync('arquivos/etapas.txt')) {
            console.log(`Nenhuma etapa registrada!`)
            return
        }

        let informacoes = fs.readFileSync('arquivos/etapas.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        console.log(`\nEtapas Salvas:\n`)
        linhas.forEach((linha: any, i: any) => {
            const [id, nome, prazo, status, funcionarios] = linha.split(";")
            console.log(`${i + 1}. Id: ${id} \nNome: ${nome}, \nPrazo: ${prazo}, \nStatus: ${status}`)
            if (funcionarios && funcionarios.length > 0) {
                console.log("Funcionários Associados:")
                funcionarios.split("/").forEach((p: any) => {
                    let [id, nome, telefone, endereco, usuario, senha, nivelPermissao] = p.split("|")
                    console.log(`Id: ${id}, Nome: ${nome}, Telefone: ${telefone}, Endereço: ${endereco}, Usuário: ${usuario}, Senha: ${senha}, Nível de Permissão: ${NivelPermissao[nivelPermissao]}`)
                });
                console.log(`\n`)
            }
            console.log(`\n-----------------------\n`)
        })
    }

    public static etapasCads(): Array<Etapa> {
        let listaEtapas: Array<Etapa> = []

        if (!fs.existsSync('arquivos/etapas.txt')) {
            return listaEtapas
        }

        let informacoes = fs.readFileSync('arquivos/etapas.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        linhas.forEach((linha: any) => {
            const [id, nome, prazo, status, funcionarios] = linha.split(";")

            let id_n = Number(id)
            let status_n: StatusEtapa
            if (!isNaN(Number(status))) {
                status_n = Number(status) as StatusEtapa
            } else {
                status_n = StatusEtapa[status as keyof typeof StatusEtapa]
            }

            let funcionariosArray: Array<Funcionario> = []
            if (funcionarios && funcionarios.length > 0) {
                funcionarios.split("/").forEach((f: string) => {
                    let [fid, fname, ftelefone, fendereco, fusuario, fsenha, fnivel] = f.split("|")
                    funcionariosArray.push(new Funcionario(fid, fname, ftelefone, fendereco, fusuario, fsenha, Number(fnivel)))
                })
            }

            listaEtapas.push(new Etapa(id_n, nome, prazo, status_n, funcionariosArray))
        })

        return listaEtapas
    }
}