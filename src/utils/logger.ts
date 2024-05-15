import { env } from "../env";

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

export class Logger {
  private static logLevel: LogLevel = LogLevel[env.LOG_LEVEL.toUpperCase() as keyof typeof LogLevel] || LogLevel.INFO;

  static error(...args: any[]) {
    if (this.logLevel >= LogLevel.ERROR) {
      console.error(...args);
    }
  }

  static warn(...args: any[]) {
    if (this.logLevel >= LogLevel.WARN) {
      console.warn(...args);
    }
  }

  static info(...args: any[]) {
    if (this.logLevel >= LogLevel.INFO) {
      console.info(...args);
    }
  }

  static debug(...args: any[]) {
    if (this.logLevel >= LogLevel.DEBUG) {
      console.debug(...args);
    }
  }
}