import * as express from "express";

import { createBoardActionValidation } from "./actions/create-board.action";
import { editBoardActionValidation } from "./actions/edit-board.action";
import { createColumnActionValidation } from "./actions/create-column.action";
import { editColumnActionValidation } from "./actions/edit-column.action";
import { deleteBoardActionValidation } from "./actions/delete-board.action";
// VALIDATION_IMPORTS

export interface BoardsRoutingDependencies {
  createBoardAction: express.RequestHandler;
  editBoardAction: express.RequestHandler;
  createColumnAction: express.RequestHandler;
  editColumnAction: express.RequestHandler;
  deleteBoardAction: express.RequestHandler;
  // ACTIONS_IMPORTS
}

export const boardsRouting = (actions: BoardsRoutingDependencies) => {
  const router = express.Router();

  router.post("/create-board", [createBoardActionValidation], actions.createBoardAction);
  router.post("/edit-board", [editBoardActionValidation], actions.editBoardAction);
  router.post("/create-board", [createBoardActionValidation], actions.createBoardAction);
  router.post("/create-column", [createColumnActionValidation], actions.createColumnAction);
  router.post("/edit-column", [editColumnActionValidation], actions.editColumnAction);
  router.post("/delete-board", [deleteBoardActionValidation], actions.deleteBoardAction);
  // ACTIONS_SETUP

  return router;
};
