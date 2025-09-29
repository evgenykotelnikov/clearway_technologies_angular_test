import { LogLevel } from "../app/services/logger/log-level.enum";
import { Environment } from "./environment.interface";

export const environment: Environment = {
  logLevel: LogLevel.ERROR,
  apiUrl: ''
};
