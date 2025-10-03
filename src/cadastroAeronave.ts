import Aeronave from "./aeronave";
import Cadastro from "./cadastro";
import Entrada from "./entrada";

export default class cadastroAeronave extends Cadastro {
    public aeronaves: Array<Aeronave>
    public entrada: Entrada

    constructor(aeronave: Array<Aeronave>) {
        super()
        this.aeronaves = aeronave
        this.entrada = new Entrada
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro das aeronaves`)
        let codigo_aeronave = this.entrada.recebeTexto(`Código da aeronave: `)
        let modelo_aeronave = this.entrada.recebeTexto(`Modelo da aeronave: `)
        let tipo_aeronave = this.entrada.recebeTexto(`Tipo da aeronave: `)
        let capacidade_aeronave = this.entrada.recebeNumero(`Capacidade da aeronave: `)
        let alcance_aeronave = this.entrada.recebeNumero(`Alcance da aeronave: `)
        console.log(`Cadastro concluído!`)
    }
}