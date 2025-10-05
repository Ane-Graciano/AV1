import Aeronave from "./aeronave";
import fs from 'fs'

export default class Relatorio {
    private conteudo: string = ""
    gerarRelatorio(aeronave: Aeronave): void {
        if (!aeronave) {
            console.log("A aeronave fornecida não existe.");
            return;
        }

        this.conteudo += `
        Relatório da Aeronave:
        ---------------------
        Código: ${aeronave.codigo}
        Modelo: ${aeronave.modelo}
        Tipo: ${aeronave.tipo}
        Capacidade: ${aeronave.capacidade}
        Alcance: ${aeronave.alcance}

        Peças:
        ${aeronave.pecas.map(p => `- ${p.nome} | Tipo: ${p.tipo} | Fornecedor: ${p.fornecedor} | Status: ${p.status}`).join("\n")}

        Testes:
        ${aeronave.testes.map(t => `- ${t.tipo} | Resultado: ${t.resultado}`).join("\n")}

        Etapas:
        ${aeronave.etapas.map(e => `- ${e.nome} | Prazo: ${e.prazo} | Status: ${e.status} | Funcionários: ${e.funcionarios.map(f => f.nome).join(", ")}`).join("\n")}

        -----------------------
        `;

        console.log("Relatório da aeronave gerado com sucesso!");
    }

    salvarEmArquivo(): void {
        if (!this.conteudo) {
            console.log("Nenhum relatório gerado para salvar.");
            return;
        }

        const nomeArquivo = "relatorio_completo.txt";

        fs.appendFileSync(nomeArquivo, this.conteudo, "utf-8");
        console.log(`Relatório salvo em: ${nomeArquivo}`);

        this.conteudo = "";
    }
}