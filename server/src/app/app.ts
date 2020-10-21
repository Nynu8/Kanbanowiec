import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";
import { NotFoundError } from "../errors/not-found.error";

export interface AppDependencies {
  router: express.Router;
}

function createApp({ router }: AppDependencies) {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "200 - ok",
    });
  });

  app.use("/api", router);
  app.use("*", (req, res, next) => next(new NotFoundError("Page not found")));

  return app;
}

export { createApp };
