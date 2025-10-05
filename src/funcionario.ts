import * as fs from 'fs'

export enum NivelPermissao {
    "ADMINISTRADOR" = 1,
    "ENGENHEIRO" = 2,
    "OPERADOR" = 3
}

export default class Funcionario {
    public id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    public nivelPermissao: NivelPermissao

    constructor(id: string, nome: string, telefone: string, endereco: string, usuario: string, senha: string, nivelPermissao: NivelPermissao) {
        this.id = id
        this.nome = nome
        this.telefone = telefone
        this.endereco = endereco
        this.usuario = usuario
        this.senha = senha
        this.nivelPermissao = nivelPermissao
    }

    autenticar(usuario: string, senha: string): boolean {
        if (this.usuario == usuario && this.senha == senha) {
            return (true)
        } else {
            return (false)
        }
    }

    salvar(): void {
        try {
            fs.appendFileSync('arquivos/funcionariosSalvos.txt', `${this.id};${this.nome};${this.telefone};${this.endereco};${this.usuario};${this.senha};${NivelPermissao[this.nivelPermissao]}\n`);
            console.log(`funcionario salvo! :)`)
        } catch (err) {
            console.log(`Erro ao salvar :( ${err}`);
        }
    }

    carregar(): void {
        if (!fs.existsSync('arquivos/funcionariosSalvos.txt')) {
            console.log(`Nenhuma peça registrada!`)
            return
        }

        let informacoes = fs.readFileSync('arquivos/funcionariosSalvos.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        console.log(`Funcionários Salvos:\n`)
        linhas.forEach((linha: any, i: any) => {
            const [id, nome, telefone, endereco, usuario, senha, nivelPermissao] = linha.split(";")
            console.log(`${i + 1}. Id: ${id}, \nNome: ${nome}, \nTelefone: ${telefone}, \nEndereco: ${endereco}, \nUsuario: ${usuario}, \nSenha: ${senha}, \nNivel de Permissão: ${nivelPermissao}\n-----------------------\n`)
        })
    }

    public static funcionariosCads(): Array<Funcionario> {
        let listaFuncionarios: Array<Funcionario> = []

        if (!fs.existsSync('arquivos/funcionariosSalvos.txt')) {
            return listaFuncionarios
        }

        let informacoes = fs.readFileSync('arquivos/funcionariosSalvos.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        linhas.forEach((linha: any) => {
            const [id, nome, telefone, endereco,usuario, senha, nivelPermissao] = linha.split(";")
            listaFuncionarios.push(new Funcionario(id, nome, telefone, endereco, usuario, senha, nivelPermissao))
        })

        return listaFuncionarios
    }
}