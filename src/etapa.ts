import Funcionario from "./funcionario"

type StatusEtapa = "PENDENTE" | "ANDAMENTO" | "CONCLUIDA"

export default class Etapa{
    public nome: string
    public prazo: string
    public status: StatusEtapa
    public funcionarios: Array<Funcionario>

    constructor(nome: string, prazo: string, status: StatusEtapa, funcionarios: Array<Funcionario>){
        this.nome = nome
        this.prazo = prazo
        this.status = status
        this.funcionarios = funcionarios
    }

    iniciar():void{

    }

    finalizar():void{

    }

    associarFuncionario(f:Funcionario):void{

    }

    // listarFuncionarios():Array<Funcionario>{
    //     return()
    // }
}