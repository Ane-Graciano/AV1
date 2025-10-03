import Cadastro from "./cadastro";
import Entrada from "./entrada";
import Pecas from "./peca";

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
        let nome_peca = this.entrada.recebeTexto(`Nome da peça: `)
        let tipo_peca = this.entrada.recebeTexto(`Tipo da peça`)
        let fornecedor = this.entrada.recebeTexto(`Fornecedor da peça: `)
        let status_peca = this.entrada.recebeTexto(`Status da peça: `)
        console.log(`Cadastro concluído!`)
    }
}