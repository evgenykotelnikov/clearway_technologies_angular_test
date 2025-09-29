import {Injectable} from '@angular/core';
import {noop} from "rxjs";
import {environment} from "../../../environments/environment";
import {LogLevel} from "./log-level.enum";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  get log(): Function {
    return this.bindLog(LogLevel.DEBUG);
  }

  get info(): Function {
    return this.bindLog(LogLevel.INFO);
  }

  get warn(): Function {
    return this.bindLog(LogLevel.WARN);
  }

  get error(): Function {
    return this.bindLog(LogLevel.ERROR);
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= environment.logLevel;
  }

  private bindLog(level: LogLevel): Function {
    if (!this.shouldLog(level)) {
      return noop;
    }

    if (level === LogLevel.INFO) {
      return console.info.bind(console, '%cINFO:', 'color: #0000FF');
    }
    else if (level === LogLevel.WARN) {
      return console.warn.bind(console, 'WARN:');
    }
    else if (level === LogLevel.ERROR) {
      return console.error.bind(console, 'ERROR:');
    }

    return console.log.bind(console, 'LOG:');
  }
}
