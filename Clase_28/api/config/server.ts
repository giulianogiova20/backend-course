import { config } from "dotenv"
import * as path from "path"


config({ path: path.resolve(__dirname, "../../.env") })

const serverConfig = {
	admin: true,
	hostNanme: "http://localhost:8080",
	PORT: process.argv[2] || parseInt(process.env.PORT as string),
}

export default serverConfig