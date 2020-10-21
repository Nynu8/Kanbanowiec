import * as express from "express";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";

export interface RoutingDependencies {
  usersRouting: express.Router;
  currencyRouting: express.Router;
  externalAccessMiddleware: MiddlewareType;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  usersRouting,
}: // ROUTES_DEPENDENCIES
RoutingDependencies) => {
  const router = express.Router();

  router.use("/users", [], usersRouting);
  // ROUTES_CONFIG
  return router;
};
