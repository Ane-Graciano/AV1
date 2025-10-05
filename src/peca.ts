import * as fs from 'fs'

export enum TipoPeca {
    "NACIONAL" = 1,
    "IMPORTADA" = 2
}

export enum StatusPeca {
    "EM_PRODUCAO" = 1,
    "EM_TRANSPORTE" = 2,
    "PRONTA" = 3
}

export default class Pecas {
    public id: number
    public nome: string
    public tipo: TipoPeca
    public fornecedor: string
    public status: StatusPeca

    constructor(id: number,nome: string, tipo: TipoPeca, fornecedor: string, status: StatusPeca) {
        this.id = id
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }

    atualizaStatus(novoStatus: StatusPeca): void {
        if (novoStatus != this.status) {
            this.status = novoStatus
        } else {
            console.log(`Novo status é igual ao status anterior`)
        }
    }

    salvar(): void {
        try {
            let pecas: Array<string> = [];
            if (fs.existsSync('arquivos/pecasSalvas.txt')) {
                pecas = fs.readFileSync('arquivos/pecasSalvas.txt', 'utf-8').trim().split("\n")
            }

            pecas = pecas.filter(p => !p.startsWith(this.id + ";"))

            pecas.push(`${this.id};${this.nome};${TipoPeca[this.tipo]};${this.fornecedor};${StatusPeca[this.status]}`)

            fs.writeFileSync('arquivos/pecasSalvas.txt', pecas.join("\n"))
            console.log(`Peça salva! :)`)
        } catch (err) {
            console.log(`Erro ao salvar :( ${err}`);
        }
    }

    carregar(): void {
        if (!fs.existsSync('arquivos/pecasSalvas.txt')) {
            console.log(`Nenhuma peça registrada!`)
            return
        }

        let informacoes = fs.readFileSync('arquivos/pecasSalvas.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        console.log(`\nPeças Salvas:\n`)
        linhas.forEach((linha: any, i: any) => {
            const [id, nome, tipo, fornecedor, status] = linha.split(";")
            console.log(`${i + 1}. Id:${id} \nNome: ${nome}, \nTipo: ${tipo}, \nFornecedor: ${fornecedor}, \nStatus: ${status}\n-----------------------\n`)
        })
    }

    public static pecasCads(): Array<Pecas> {
        let listaPecas: Array<Pecas> = []

        if (!fs.existsSync('arquivos/pecasSalvas.txt')) {
            return listaPecas
        }

        let informacoes = fs.readFileSync('arquivos/pecasSalvas.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        linhas.forEach((linha: any) => {
            const [id, nome, tipo, fornecedor, status] = linha.split(";")
            let tipo_n: TipoPeca = TipoPeca[tipo as keyof typeof TipoPeca]
            let status_n: StatusPeca = StatusPeca[status as keyof typeof StatusPeca]
            listaPecas.push(new Pecas(id, nome, tipo_n, fornecedor, status_n))
        })

        return listaPecas
    }

}