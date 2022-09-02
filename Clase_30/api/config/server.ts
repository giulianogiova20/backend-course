import { config } from "dotenv"
import * as path from "path"
import minimist from 'minimist'


config({ path: path.resolve(__dirname, "../../.env") })

export const serverConfig = {
	admin: true,
	hostNanme: "http://localhost:8080",
	PORT: process.argv[2] || parseInt(process.env.PORT as string),
}

//Liberia Minimist
export const args = minimist(process.argv.slice(2), {
    alias: { m: "modo", p: "port", d: "debug" },
    default: { modo: "prod", port: 8080, debug: false },
  });
