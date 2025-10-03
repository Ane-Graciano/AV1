import Aeronave from "./aeronave";
import Funcionario from "./funcionario";
import Pecas from "./peca";
import Teste from "./teste";

export default class Cadastrados{
    public pecas_cadastradas: Array<Pecas>
    public funcionarios_cadastradas: Array<Funcionario>
    public aeronave_cadastradas: Array<Aeronave>
    public testes_cadastradas: Array<Teste>

    constructor(){
        this.pecas_cadastradas = []
        this.funcionarios_cadastradas = []
        this.aeronave_cadastradas = []
        this.testes_cadastradas = []
    }

    getPecas(){
        return this.pecas_cadastradas
    }

    getFuncionarios(){
        return this.funcionarios_cadastradas
    }

    getAeronave(){
        return this.aeronave_cadastradas
    }

    getTetes(){
        return this.testes_cadastradas
    }
}