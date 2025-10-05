import Cadastro from "./cadastro"
import Entrada from "./entrada"
import Etapa, { StatusEtapa } from "./etapa"
import Funcionario, { NivelPermissao } from "./funcionario"

export default class cadastroEtapa extends Cadastro {
    public etapas: Array<Etapa>
    public funcionarios_associados: Array<Funcionario>
    public entrada: Entrada

    constructor(etapas: Array<Etapa>, funcionarios_associados: Array<Funcionario>) {
        super()
        this.etapas = etapas
        this.funcionarios_associados = funcionarios_associados
        this.entrada = new Entrada
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro das etapas`)
        let id = this.entrada.recebeNumero(`Id:`)
        let nome = this.entrada.recebeTexto(`Nome da etapa: `)
        let prazo = this.entrada.recebeTexto(`Prazo da etapa: `)
        let status = this.entrada.recebeNumero(`Status da etapa: (1-PENDENTE, 2-ANDAMENTO, 3-CONCLUIDA): `)
        let qtd_ass_func = this.entrada.recebeNumero(`Quantos funcionarios deseja associar a essa etapa? `)
        let etapa = new Etapa(id,nome,prazo,status)

        let FuncionariosSalvos: Array<Funcionario> = Funcionario.funcionariosCads()

        if (FuncionariosSalvos.length == 0) {
            console.log("Não há funcionários cadastradas ainda.");
        } else {
            console.log(`Funcionários Disponíveis:`)
            FuncionariosSalvos.forEach((f, i) => {
                console.log(`${i + 1}-Id: ${f.id}, Nome: ${f.nome}, Telefone: ${f.telefone}, Endereço: ${f.endereco}, Usuário: ${f.usuario}, Senha: ${f.senha}, Nível de permissão: ${f.nivelPermissao}\n-----------------------\n`)
            })
            for (let i = 0; i < qtd_ass_func; i++) {
                let indice = this.entrada.recebeNumero(`Digite o número do funcionario ${i + 1}: `);
                let escolhida = FuncionariosSalvos[indice - 1];
                if (escolhida) {
                    etapa.associarFuncionario(escolhida)
                }
            }
        }
        etapa.salvar()
        console.log(`Cadastro concluído!`)
    }

}