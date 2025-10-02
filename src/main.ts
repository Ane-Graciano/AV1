import * as readline from 'node:readline/promises';
import Pecas, { StatusPeca, TipoPeca } from './peca';
import { error } from 'node:console';
import Teste, { TipoTeste, ResultadoTeste } from './teste';
import Funcionario, { NivelPermissao } from './funcionario';
import RegistraAeronave, { TipoAeronave } from './registroAeronave';


async function getInfo() {
    let leitor = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })


    try {

        let tarefa = await leitor.question(`O de deseja fazer?\n1)Cadastrar peça\n2)Cadastar testen\n3)Cadastar funcionário\n4)Cadastrar Aeronave\nSair\n`)

        switch (tarefa) {
            case "1":
                // pegando informações das peças
                let nome_peca = await leitor.question('nome da peça: ');
                let tipo_peca = await leitor.question(`tipo da peça: `)
                let fornecedor = await leitor.question(`Fornecedor da peça: `)
                let status_peca = await leitor.question(`Status da peça: `)

                let tipo_recebido = tipo_peca
                let tipo: TipoPeca

                if (tipo_recebido == 'NACIONAL' || tipo_recebido == 'IMPORTADA') {
                    tipo = tipo_recebido
                } else {
                    throw new Error("tipo de peça inválido")
                }

                let status_recebido = status_peca
                let status: StatusPeca

                if (status_recebido == 'EM_PRODUCAO' || status_recebido == 'EM_TRANSPORTE' || status_recebido == 'PRONTA') {
                    status = status_recebido
                } else {
                    throw new Error("status inválido")
                }

                let peca = new Pecas(nome_peca, tipo, fornecedor, status)
                console.log(peca)
                break
            case "2":
                // pegando informações dos testes
                let tipo_teste = await leitor.question(`qual o tipo de teste está sendo realizado? `)
                let resultado_teste = await leitor.question(`Qual o resultado do teste? `)

                let tipo_teste_recebido = tipo_teste
                let tipo_t: TipoTeste

                if (tipo_teste_recebido == 'ELETRICO' || tipo_teste_recebido == 'HIDRAULICO' || tipo_teste_recebido == 'AERODINAMICO') {
                    tipo_t = tipo_teste_recebido
                } else {
                    throw new Error("resultado inválido")
                }

                let resultado_recebido = resultado_teste
                let resultado: ResultadoTeste

                if (resultado_recebido == 'APROVADO' || resultado_recebido == 'REPROVADO') {
                    resultado = resultado_recebido
                }
                else {
                    throw new Error("resultado inválido")
                }

                let teste = new Teste(tipo_t, resultado)
                console.log(teste)
                break
            case "3":
                // pegando informação do funcionario
                let id = await leitor.question(`id: `)
                let nome_func = await leitor.question(`Nome do Funcionario: `)
                let telefone_func = await leitor.question(`Telefone do ${nome_func}: `)
                let endereco_func = await leitor.question(`enderço do ${nome_func}: `)
                let usuario_func = await leitor.question(`Nome de usuario do ${nome_func}: `)
                let senha_func = await leitor.question(`senha do ${nome_func}: `)
                let nivel_acesso_func = await leitor.question(`Nível de acesso do ${nome_func}: `)

                let nivel_recebido = nivel_acesso_func
                let nivel: NivelPermissao

                if (nivel_recebido == 'ADMINISTRADOR' || nivel_recebido == 'ENGENHEIRO' || nivel_recebido == 'OPERADOR') {
                    nivel = nivel_recebido
                } else {
                    throw new Error(`resultado inválido`)
                }

                let func = new Funcionario(id, nome_func, telefone_func, endereco_func, usuario_func, senha_func, nivel)
                console.log(func)
                break
            case "4":
                // pegando informação da aeronave
                let codigo_aeronave = await leitor.question(`Codigo da aeronave: `)
                let modelo_aeronave = await leitor.question(`Modelo da aeronave: `)
                let tipo_aeronave = await leitor.question(`Tipo da aeronave: `)
                let capacidade_aeronave = await leitor.question(`Capacidade da aeronave: `)
                let alcance_aeronave = await leitor.question(`Alcance da aeronave: `)

                let tipo_aeronave_recebido = tipo_aeronave
                let tipo_ae: TipoAeronave

                if(tipo_aeronave_recebido == "COMERCIAL" || tipo_aeronave_recebido == "MILITAR"){
                    tipo_ae = tipo_aeronave_recebido
                }else{
                    throw new Error(`resultado inválido`)
                }

                let capacidade:number = Number(capacidade_aeronave)
                let alcance:number = Number(alcance_aeronave)

                let aeronave = new RegistraAeronave(codigo_aeronave,modelo_aeronave,tipo_ae,capacidade,alcance)
                console.log(aeronave)
                break
            case "Sair":
                console.log(`Obrigada, até a próxima!`)
                break
        }
    } catch (error) {
        console.error(`Erro: ${error}`)
    } finally {
        leitor.close()
    }
}


getInfo()


