import * as express from "express";

import { createBoardActionValidation } from "./actions/create-board.action";
import { editBoardActionValidation } from "./actions/edit-board.action";
import { createColumnActionValidation } from "./actions/create-column.action";
import { addUserActionValidation } from "./actions/add-user.action";
// VALIDATION_IMPORTS

export interface BoardsRoutingDependencies {
  createBoardAction: express.RequestHandler;
  editBoardAction: express.RequestHandler;
  createColumnAction: express.RequestHandler;
  addUserAction: express.RequestHandler;
  // ACTIONS_IMPORTS
}

export const boardsRouting = (actions: BoardsRoutingDependencies) => {
  const router = express.Router();

  router.post("/create-board", [createBoardActionValidation], actions.createBoardAction);
  router.post("/edit-board", [editBoardActionValidation], actions.editBoardAction);
  router.post("/create-board", [createBoardActionValidation], actions.createBoardAction);
  router.post("/create-column", [createColumnActionValidation], actions.createColumnAction);
  router.post("/add-user", [addUserActionValidation], actions.addUserAction);
  // ACTIONS_SETUP

  return router;
};
