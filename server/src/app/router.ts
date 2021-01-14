import * as express from "express";
import { MiddlewareType } from "../shared/middleware-type/middleware.type";

export interface RoutingDependencies {
  usersRouting: express.Router;
  boardsRouting: express.Router;
  isLoggedInMiddleware: MiddlewareType;
  // ROUTES_INTERFACE
}

export const createRouter = ({
  usersRouting,
  boardsRouting,
  isLoggedInMiddleware
}: // ROUTES_DEPENDENCIES
RoutingDependencies) => {
  const router = express.Router();

  router.use("/users", usersRouting);
  router.use("/boards", [isLoggedInMiddleware], boardsRouting);
  // ROUTES_CONFIG
  return router;
};
