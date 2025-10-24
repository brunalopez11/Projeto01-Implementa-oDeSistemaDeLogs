//  SISTEMA DE LOGS - Chain of Responsibility

// 1. Classe base abstrata
class Logger {
  constructor() {
    this.proximo = null;
  }

  setProximo(proximo) {
    this.proximo = proximo;
  }

  log(nivel, mensagem) {
    throw new Error("O método log() deve ser implementado nas subclasses");
  }
}

// 2. Classes concretas

class LoggerConsole extends Logger {
  log(nivel, mensagem) {
    if (nivel === "INFO") {
      console.log(`[Console] INFO: ${mensagem}`);
    }
    if (this.proximo) {
      this.proximo.log(nivel, mensagem);
    }
  }
}

class LoggerArquivo extends Logger {
  log(nivel, mensagem) {
    if (nivel === "INFO" || nivel === "WARNING") {
      console.log(`[Arquivo] ${nivel}: ${mensagem}`);
    }
    if (this.proximo) {
      this.proximo.log(nivel, mensagem);
    }
  }
}

class LoggerEmail extends Logger {
  log(nivel, mensagem) {
    if (nivel === "ERROR") {
      console.log(`[Email] ERROR: ${mensagem}`);
    }
    if (this.proximo) {
      this.proximo.log(nivel, mensagem);
    }
  }
}

// 3. Configuração da cadeia de responsabilidade

const consoleLogger = new LoggerConsole();
const arquivoLogger = new LoggerArquivo();
const emailLogger = new LoggerEmail();

consoleLogger.setProximo(arquivoLogger);
arquivoLogger.setProximo(emailLogger);

// 4. Testes

consoleLogger.log("INFO", "Aplicação iniciada com sucesso.");
consoleLogger.log("WARNING", "Uso de memória acima do esperado.");
consoleLogger.log("ERROR", "Falha ao conectar ao banco de dados.");
