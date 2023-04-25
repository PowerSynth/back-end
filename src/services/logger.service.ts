import { ILoggerService } from "../interfaces/ILoggerService";

export class LoggerService implements ILoggerService {
   log(message: string): void {
      console.log(message);
   }

   error(message: string): void {
      console.error(message);
   }
}
