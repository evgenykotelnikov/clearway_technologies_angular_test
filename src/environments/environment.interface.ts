import { LogLevel } from "../app/services/logger/log-level.enum";

export interface Environment {
  logLevel: LogLevel;
  apiUrl: string;
}