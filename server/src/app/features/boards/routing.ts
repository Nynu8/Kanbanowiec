import * as express from "express";

import { createBoardActionValidation } from "./actions/create-board.action";
// VALIDATION_IMPORTS

export interface BoardsRoutingDependencies {
  createBoardAction: express.RequestHandler;
  isLoggedInMiddleware: any;
  // ACTIONS_IMPORTS
}

export const boardsRouting = (actions: BoardsRoutingDependencies) => {
  const router = express.Router();

  router.post("/create-board", [createBoardActionValidation, actions.isLoggedInMiddleware], actions.createBoardAction);
  // ACTIONS_SETUP

  return router;
};
