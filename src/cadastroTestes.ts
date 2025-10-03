import Cadastro from "./cadastro";
import Entrada from "./entrada";
import Teste from "./teste";

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
        let tipo_teste = this.entrada.recebeTexto(`Tipo de teste: `)
        let resultado_teste = this.entrada.recebeTexto(`Resultado do teste: `)
        console.log(`Cadastro concluído!`)
    }
}