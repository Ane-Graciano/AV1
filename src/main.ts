import Cadastrados from "./cadastrados"
import cadastroAeronave from "./cadastroAeronave"
import cadastroFuncionario from "./cadastroFuncionario"
import cadastroPeca from "./cadastroPeca"
import cadastroTestes from "./cadastroTestes"
import Entrada from "./entrada"
import Pecas from "./peca"

console.log(`Seja bem-vindo ao sistema da empresa tal! :)`)
let executa = true
let pecas_cadastradas = new Cadastrados()
let funcionarios_cadastrados = new Cadastrados()
let aeronave_cadastradas = new Cadastrados()
let teste_cadastrados = new Cadastrados()

while (executa) {
    console.log(`Opções:`)
    console.log(`1- Cadastrar Peça`)
    console.log(`2- Cadastrar Funcionário`)
    console.log(`3- Cadastrar Aeronave`)
    console.log(`4- Cadastrar Teste`)
    console.log(`0- Sair`)

    let entrada = new Entrada
    let op_escolhida = entrada.recebeNumero(`Escolha uma opção: `)

    switch (op_escolhida) {
        case 1:
            let cadastro_peca = new cadastroPeca(pecas_cadastradas.getPecas())
            cadastro_peca.cadastrar()
            break
        case 2:
            let cadastro_funcionario = new cadastroFuncionario(funcionarios_cadastrados.getFuncionarios())
            cadastro_funcionario.cadastrar()
            break
        case 3:
            let cadastro_aeronave = new cadastroAeronave(aeronave_cadastradas.getAeronave())
            cadastro_aeronave.cadastrar()
            break
        case 4:
            let cadastro_teste = new cadastroTestes(teste_cadastrados.getTetes())
            cadastro_teste.cadastrar()
            break
        case 0:
            executa = false
            console.log(`Obrigada, até mais`)
            break
        default:
            console.log(`Número inválido`)
    }
}