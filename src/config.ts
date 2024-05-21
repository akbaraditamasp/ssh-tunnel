export type ConfigFile = {
  host: string;
  port: number;
  username: string;
  privateKey?: string | Buffer;
  password?: string;
};
