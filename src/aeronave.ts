export type TipoAeronave = "COMERCIAL" | "MILITAR"

export default class Aeronave{
    public codigo:string
    public modelo: string
    public tipo: TipoAeronave
    public capacidade: number
    public alcance:number

    constructor(codigo:string, modelo: string, tipo: TipoAeronave, capacidade: number, alcance:number){
        this.codigo = codigo
        this.modelo = modelo
        this.tipo = tipo
        this.capacidade = capacidade
        this.alcance = alcance
    }

    detalhes():void{
        console.log(`Código: ${this.codigo}\n Modelo: ${this.modelo}\n Tipo: ${this.tipo}\n Capacidade: ${this.capacidade}\n Alcance: ${this.alcance}`)
    }

    salvar():void{

    }

    carregar():void{
        
    }
}
