import Cadastro from "./cadastro";
import Entrada from "./entrada";
import Funcionario from "./funcionario";

export default class cadastroFuncionario extends Cadastro {
    public funcionarios: Array<Funcionario>
    public entrada: Entrada

    constructor(funcionarios: Array<Funcionario>) {
        super()
        this.funcionarios = funcionarios
        this.entrada = new Entrada
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro dos funcionários`)
        let id = this.entrada.recebeTexto(`Id do funcionário: `)
        let nome_func = this.entrada.recebeTexto(`Nome do funcionario: `)
        let telefone_func = this.entrada.recebeTexto(`Telefone do ${nome_func}: `)
        let endereco_func = this.entrada.recebeTexto(`Endereço do ${nome_func}: `)
        let usuario_func = this.entrada.recebeTexto(`Nome de usuário do ${nome_func}: `)
        let senha_func = this.entrada.recebeTexto(`Senha do ${nome_func}: `)
        let nivel_acesso_func = this.entrada.recebeNumero(`Nível de acesso do ${nome_func} (1-Administrador ou 2-Engenheiro ou 3-Operador): `)
        let funcionarios = new Funcionario(id,nome_func,telefone_func,endereco_func,usuario_func,senha_func,nivel_acesso_func)
        funcionarios.salvar()
        console.log(`Cadastro concluído!`)
    }
}