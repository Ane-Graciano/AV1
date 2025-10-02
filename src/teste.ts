export type TipoTeste = "ELETRICO" | "HIDRAULICO" | "AERODINAMICO"
export type ResultadoTeste = "APROVADO" | "REPROVADO"

export default class Teste{
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    constructor(tipo: TipoTeste,resultado: ResultadoTeste){
        this.tipo = tipo
        this.resultado = resultado
    }

    salvar():void{

    }

    carregar():void{
        
    }
}