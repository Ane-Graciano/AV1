import * as fs from 'fs'

export enum TipoTeste {
    "ELETRICO" = 1,
    "HIDRAULICO" = 2,
    "AERODINAMICO" = 3
}

export enum ResultadoTeste {
    "APROVADO" = 1,
    "REPROVADO" = 2
}

export default class Teste {
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
        this.tipo = tipo
        this.resultado = resultado
    }

    salvar(): void {
        try {
            fs.appendFileSync('arquivos/testesSalvos.txt', `${TipoTeste[this.tipo]};${ResultadoTeste[this.resultado]}\n`);
            console.log(`Teste salvo! :)`)
        } catch (err) {
            console.log(`Erro ao salvar :( ${err}`);
        }
    }

    carregar(): void {
        if (!fs.existsSync('arquivos/testesSalvos.txt')) {
            console.log(`Nenhum teste registrado!`)
            return
        }

        let informacoes = fs.readFileSync('arquivos/testesSalvos.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        console.log(`\nTestes Salvos:\n`)
        linhas.forEach((linha: any, i: any) => {
            const [tipo, resultado] = linha.split(";")
            console.log(`${i + 1}. Tipo de teste: ${tipo}, \nResultado do teste: ${resultado}\n-----------------------\n`)
        })
    }


    public static testesCads(): Array<Teste> {
        let listaTestes: Array<Teste> = []

        if (!fs.existsSync('arquivos/testesSalvos.txt')) {
            return listaTestes
        }

        let informacoes = fs.readFileSync('arquivos/testesSalvos.txt', 'utf-8')
        let linhas = informacoes.trim().split("\n")

        linhas.forEach((linha: any) => {
            const [tipo, resultado] = linha.split(";")
            let tipo_n: TipoTeste = TipoTeste[tipo as keyof typeof TipoTeste]
            let result_n: ResultadoTeste = ResultadoTeste[resultado as keyof typeof ResultadoTeste]
            listaTestes.push(new Teste(tipo_n, result_n))
        })

        return listaTestes
    }
}