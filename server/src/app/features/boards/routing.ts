import * as express from "express";

import { createBoardActionValidation } from "./actions/create-board.action";
import { editBoardActionValidation } from "./actions/edit-board.action";
// VALIDATION_IMPORTS

export interface BoardsRoutingDependencies {
  createBoardAction: express.RequestHandler;
  isLoggedInMiddleware: any;
  editBoardAction: express.RequestHandler;
  // ACTIONS_IMPORTS
}

export const boardsRouting = (actions: BoardsRoutingDependencies) => {
  const router = express.Router();

  router.post("/create-board", [createBoardActionValidation, actions.isLoggedInMiddleware], actions.createBoardAction);
  router.post("/edit-board", [editBoardActionValidation, actions.isLoggedInMiddleware], actions.editBoardAction);
  // ACTIONS_SETUP

  return router;
};
