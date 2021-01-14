import * as express from "express";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";

export interface RoutingDependencies {
  usersRouting: express.Router;
  currencyRouting: express.Router;
  externalAccessMiddleware: MiddlewareType;
  boardsRouting: express.Router;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  usersRouting,
  boardsRouting,
}: // ROUTES_DEPENDENCIES
RoutingDependencies) => {
  const router = express.Router();

  router.use("/users", [], usersRouting);
  router.use("/boards", boardsRouting);
  // ROUTES_CONFIG
  return router;
};
