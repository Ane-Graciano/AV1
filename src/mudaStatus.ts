import Aeronave, { TipoAeronave } from "./aeronave";
import Pecas, { StatusPeca, TipoPeca } from "./peca";
import fs from 'fs';
import Teste, { ResultadoTeste, TipoTeste } from "./teste";
import Etapa, { StatusEtapa } from "./etapa";
import Funcionario from "./funcionario";

export default class MudaStatus {
    static atualizaStatusP(peca: Pecas, novoStatus: StatusPeca) {
        if (!peca) {
            console.log(`Não há peças cadastradas`)
            return
        }

        peca.atualizaStatus(novoStatus)
        peca.salvar()
        let todasPecas = this.carregarPecas()
        todasPecas = todasPecas.map(p => p.id === peca.id ? peca : p)
        this.salvarPecas(todasPecas)

        let aeronave_cad = this.carregarAeronaves()
        aeronave_cad.forEach(a => {
            a.pecas.forEach(p => {
                if (p.id == peca.id) {
                    p.status = peca.status
                }
            })
        })
        this.salvarAeronaves(aeronave_cad)

        console.log(`Status da peça "${peca.nome}" atualizado para ${StatusPeca[peca.status]} em todas as aeronaves.`)
    }

    static carregarPecas(): Array<Pecas> {
        if (!fs.existsSync('arquivos/pecasSalvas.txt')) return []
        let linhas = fs.readFileSync('arquivos/pecasSalvas.txt', 'utf-8').trim().split("\n")
        return linhas.map(linha => {
            const [id, nome, tipo, fornecedor, status] = linha.split(";")
            return new Pecas(
                Number(id),
                nome,
                TipoPeca[tipo as keyof typeof TipoPeca],
                fornecedor,
                StatusPeca[status as keyof typeof StatusPeca]
            )
        })
    }

    static salvarPecas(pecas: Array<Pecas>) {
        let linhas = pecas.map(p => `${p.id};${p.nome};${TipoPeca[p.tipo]};${p.fornecedor};${StatusPeca[p.status]}`)
        fs.writeFileSync('arquivos/pecasSalvas.txt', linhas.join("\n"))
    }

    static carregarAeronaves(): Array<Aeronave> {
        if (!fs.existsSync('arquivos/aeronaves.txt')) return []

        let linhas = fs.readFileSync('arquivos/aeronaves.txt', 'utf-8').trim().split("\n")
        let aeronaves: Array<Aeronave> = []

        linhas.forEach(linha => {
            const [codigo, modelo, tipo, capacidade, alcance, pecasStr = "", testesStr = "", etapasStr = ""] = linha.split(";")
            const tipo_aero: TipoAeronave = TipoAeronave[tipo as keyof typeof TipoAeronave]
            let aero = new Aeronave(codigo, modelo, tipo_aero, Number(capacidade), Number(alcance))

            if (pecasStr) {
                pecasStr.split("|").forEach(p => {
                    if (!p) return
                    let [id, nome, tipo_n, fornecedor, status] = p.split(":")
                    let p_tipo_n: TipoPeca = TipoPeca[tipo_n as keyof typeof TipoPeca]
                    let status_n: StatusPeca = StatusPeca[status as keyof typeof StatusPeca]
                    aero.pecas.push(new Pecas(Number(id), nome, p_tipo_n, fornecedor, status_n))
                })
            }

            if (testesStr) {
                testesStr.split("|").forEach(t => {
                    if (!t) return
                    let [tipo_t, resultado] = t.split(":")
                    let tipo_n: TipoTeste = TipoTeste[tipo_t as keyof typeof TipoTeste]
                    let result_n: ResultadoTeste = ResultadoTeste[resultado as keyof typeof ResultadoTeste]
                    aero.testes.push(new Teste(tipo_n, result_n))
                })
            }

            if (etapasStr) {
                etapasStr.split("|").forEach(eStr => {
                    if (!eStr) return
                    let [id, nome, prazo, statusStr, funcionariosStr = ""] = eStr.split(":")
                    let idNum = isNaN(Number(id)) ? 0 : Number(id)
                    let statusNum = isNaN(Number(statusStr)) ? StatusEtapa.PENDENTE : Number(statusStr) as StatusEtapa

                    let funcionariosArray: Funcionario[] = []
                    if (funcionariosStr) {
                        funcionariosStr.split(",").forEach(fStr => {
                            if (!fStr) return
                            let [fid, fname, ftelefone, fendereco, fusuario, fsenha, fnivel] = fStr.split("/")
                            funcionariosArray.push(new Funcionario(fid, fname, ftelefone, fendereco, fusuario, fsenha, Number(fnivel)))
                        })
                    }

                    aero.etapas.push(new Etapa(idNum, nome, prazo, statusNum, funcionariosArray))
                });
            }

            aeronaves.push(aero)
        });

        return aeronaves
    }

    static salvarAeronaves(aeronaves: Array<Aeronave>) {
        let linhas = aeronaves.map(a => {
            let pecas = a.pecas.map(p => `${p.id}:${p.nome}:${TipoPeca[p.tipo]}:${p.fornecedor}:${StatusPeca[p.status]}`).join("|")
            let testes = a.testes.map(t => `${TipoTeste[t.tipo]}:${ResultadoTeste[t.resultado]}`).join("|")
            let etapas = a.etapas.map(e => {
                let funcs = e.funcionarios.map(f => `${f.id}/${f.nome}/${f.telefone}/${f.endereco}/${f.usuario}/${f.senha}/${f.nivelPermissao}`).join(",")
                return `${e.id}:${e.nome}:${e.prazo}:${e.status}:${funcs}`
            }).join("|")

            return `${a.codigo};${a.modelo};${TipoAeronave[a.tipo]};${a.capacidade};${a.alcance};${pecas};${testes};${etapas}`
        });

        fs.writeFileSync('arquivos/aeronaves.txt', linhas.join("\n"))
    }
}
