// -------------------------------------------------------------------
// This is the main entrypoint to the transformer, it should not be
// necessary to modify this file for a basic transformer.
// -------------------------------------------------------------------
import express, {Request, Response} from "express";
import health from "@functions/health.entrypoint";
import transform from "@functions/transform.entrypoint";
import start from "@functions/start.entrypoint";
import { Logger } from "./utils/logger";
import { get } from "radash";
import { env } from "./env";

const app = express();

app.use(express.json());

app.get("/health", async (req: Request, res: Response): Promise<Response> => {
  return res.send(await health());
});

app.post("/transform", async (req: Request, res: Response): Promise<Response> => {
  const { eventId, validTime, payload } = req.body;

  if(env.REQUIRE_VALUE_SET_PATH) {
    const valueSet =  get(payload, env.REQUIRE_VALUE_SET_PATH, null);
    if (!valueSet) {
      Logger.error(`Value set not found at path: ${env.REQUIRE_VALUE_SET_PATH}`);
      return res.status(200).send({ error: `Value set not found at path: ${env.REQUIRE_VALUE_SET_PATH}` });
    }
  }

  return res.send(await transform({
    eventId,
    validTime,
    payload,
  }));
});

const run = async (): Promise<void> => {
  const port = process.env.PORT || 4000;
  try {
    await start();
    app.listen(port, () => {
      Logger.info(`Server started on port ${port}`);
    });
  } catch (error) {
    Logger.error(error);
    process.exit(1);
  }
};

void run();
