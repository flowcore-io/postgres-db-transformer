import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({
  path: path.join(__dirname, "../", ".env"),
  override: false,
});

dotenv.config({
  path: path.join(__dirname, ".env.config"),
  override: false,
});
