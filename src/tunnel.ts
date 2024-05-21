import * as fs from "fs";
import { Client } from "ssh2";
import net from "net";
import logger from "./logger";
import { ConfigFile } from "./config";

export default function tunnel(
  config: ConfigFile,
  remotePort: number,
  localPort: number,
  localHost: string = "127.0.0.1"
) {
  if (config.privateKey) {
    config.privateKey = fs.readFileSync(config.privateKey);
  }

  const conn = new Client();
  conn
    .on("ready", () => {
      logger.info("Client :: ready");
      conn.forwardIn("0.0.0.0", remotePort, (err) => {
        if (err) {
          logger.error("Forwarding error:", err);
          return;
        }
        logger.info(
          `Forwarding from remote "0.0.0.0":${remotePort} to local ${localHost}:${localPort}`
        );
      });

      conn.on("tcp connection", (_info, accept, _reject) => {
        const stream = accept();
        const localConn = net.connect(localPort, localHost, () => {
          stream.pipe(localConn).pipe(stream);
        });

        localConn.on("error", (err) => {
          console.error("Local connection error:", err);
          stream.end();
        });
      });
    })
    .connect(config);

  conn.on("error", (err) => {
    logger.error("Connection error:", err);
  });

  conn.on("end", () => {
    logger.info("Client :: disconnected");
  });
}
