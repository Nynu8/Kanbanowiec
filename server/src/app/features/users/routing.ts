import * as express from "express";

import { usersActionValidation } from "./actions/users.action";
import { loginRefreshActionValidation } from "./actions/login-refresh.action";
import { registerActionValidation } from "./actions/register.action";
import { loginActionValidation } from "./actions/login.action";
// VALIDATION_IMPORTS

export interface UsersRoutingDependencies {
  usersAction: express.RequestHandler;
  loginRefreshAction: express.RequestHandler;
  registerAction: express.RequestHandler;
  loginAction: express.RequestHandler;
  getUserDetailsAction: express.RequestHandler;
  isLoggedInMiddleware: any;
  // ACTIONS_IMPORTS
}

export const usersRouting = (actions: UsersRoutingDependencies) => {
  const router = express.Router();

  router.get("/users", [usersActionValidation], actions.usersAction);
  router.post("/login-refresh", [loginRefreshActionValidation], actions.loginRefreshAction);
  router.post("/register", [registerActionValidation], actions.registerAction);
  router.post("/login", [loginActionValidation], actions.loginAction);
  router.get("/get-user-details", [actions.isLoggedInMiddleware], actions.getUserDetailsAction);
  // ACTIONS_SETUP

  return router;
};
