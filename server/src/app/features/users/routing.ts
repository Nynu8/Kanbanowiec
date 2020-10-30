import * as express from "express";

import { loginActionValidation } from "./actions/login.action";
import { usersActionValidation } from "./actions/users.action";
import { loginRefreshActionValidation } from "./actions/login-refresh.action";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  loginAction: express.RequestHandler;
  usersAction: express.RequestHandler;
  registerAction: express.RequestHandler;
  loginRefreshAction: express.RequestHandler;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  router.post("/login", [loginActionValidation], actions.loginAction);
  router.get("/users", [usersActionValidation], actions.usersAction);
  router.post("/login-refresh", [loginRefreshActionValidation], actions.loginRefreshAction);
  // ACTIONS_SETUP

  return router;
};
