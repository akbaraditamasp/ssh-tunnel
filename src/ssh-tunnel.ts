#!/usr/bin/env node

import { Command } from "commander";
import tunnel from "./tunnel";
import fs from "fs";
import { ConfigFile } from "./config";

const program = new Command();

program
  .name("ssh-tunnel")
  .description("CLI to create SSH Tunnel")
  .version("1.0.3");

program
  .command("start")
  .description("Start SSH Tunnel")
  .argument("<REMOTE_PORT>", "Remote port forwarding")
  .argument("<LOCAL_PORT>", "Local port forwarding")
  .requiredOption("-c, --config <CONFIG_PATH>", "SSH config file path")
  .action((remotePort: number, local: string, { config: configPath }) => {
    const config = JSON.parse(
      fs.readFileSync(configPath).toString("utf-8")
    ) as ConfigFile;
    const parseLocal = local.split(":");
    let localHost = "127.0.0.1";
    let localPort = Number(local);

    if (parseLocal.length > 1) {
      localHost = parseLocal[0];
      localPort = Number(parseLocal[1]);
    }

    tunnel(config, remotePort, localPort, localHost);
  });

program.parse();
