import promptSync from "prompt-sync";
export default class Entrada{
    public recebeNumero(mensagem:string):number{
        let prompt = promptSync()
        let valor = prompt(mensagem)
        let numero = new Number(valor)
        return numero.valueOf()
    }
    public recebeTexto(mensagem:string):string{
        let prompet = promptSync()
        let texto = prompet(mensagem)
        return texto
    }
}