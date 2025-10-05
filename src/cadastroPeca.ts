import Cadastro from "./cadastro";
import Entrada from "./entrada";
import Pecas, { StatusPeca, TipoPeca } from "./peca";

export default class cadastroPeca extends Cadastro {
    public pecas: Array<Pecas>
    public entrada: Entrada

    constructor(pecas: Array<Pecas>) {
        super()
        this.pecas = pecas
        this.entrada = new Entrada
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro das peças`)
        let id = this.entrada.recebeNumero(`Id: `)
        let nome_peca = this.entrada.recebeTexto(`Nome da peça: `)
        let tipo_peca = this.entrada.recebeNumero(`Tipo da peça (1-Nacional ou 2-Importada): `)
        let fornecedor = this.entrada.recebeTexto(`Fornecedor da peça: `)
        let status_peca = this.entrada.recebeNumero(`Status da peça (1-Em Produção ou 2-Em transporte ou 3-Pronta): `)
        let pecas = new Pecas(id,nome_peca,tipo_peca as TipoPeca,fornecedor,status_peca as StatusPeca)
        pecas.salvar()
        console.log(`Cadastro concluído!`)
    }

}