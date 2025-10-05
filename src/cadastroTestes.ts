import Cadastro from "./cadastro";
import Entrada from "./entrada";
import Teste, { TipoTeste } from "./teste";

export default class cadastroTestes extends Cadastro {
    public testes: Array<Teste>
    public entrada: Entrada

    constructor(testes: Array<Teste>) {
        super()
        this.testes = testes
        this.entrada = new Entrada
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro dos testes`)
        let tipo_teste = this.entrada.recebeNumero(`Tipo de teste (1-Elétrico ou 2-Hidráulico ou 3-Aerodinâmico): `)
        let resultado_teste = this.entrada.recebeNumero(`Resultado do teste (1-Aprovado ou 2-Reprovado): `)
        let teste = new Teste(tipo_teste,resultado_teste)
        teste.salvar()
        console.log(`Cadastro concluído!`)
    }
}