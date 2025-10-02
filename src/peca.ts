export type TipoPeca = "NACIONAL" | "IMPORTADA"
export type StatusPeca = "EM_PRODUCAO" | "EM_TRANSPORTE" | "PRONTA"

export default class Pecas{
    public nome:string
    public tipo:TipoPeca
    public fornecedor:string
    public status:StatusPeca

    constructor(nome:string,tipo:TipoPeca,fornecedor:string,status:StatusPeca){
        this.nome = nome
        this.tipo = tipo
        this.fornecedor = fornecedor
        this.status = status
    }

    atualizaStatus(novoStatus:StatusPeca):void{

    }

    salvar():void{

    }

    carregar():void{
        
    }
}