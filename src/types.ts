export interface AppConfig {
   port: number;
   env: string;
}

export interface PowerSynthRequest extends Request {
   file: {
      path: string;
      originalname: string;
   };
}