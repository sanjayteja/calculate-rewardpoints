const logLevels = process.env.NODE_ENV === "production" ? "warn" : "log";
const noOperation = (message, ...optionalParams) => {};

class Logger {
  constructor(options) {
    const { level } = options || {};
    this.error = console.error.bind(console);
    if (level === "error") {
      this.warn = noOperation;
      this.log = noOperation;
      return;
    }
    this.warn = console.log.bind(console);
    if (level === "warn") {
      this.log = noOperation;
      return;
    }
    this.log = console.log.bind(console);
  }
}
const logger = new Logger({ level: logLevels });
export default logger;
