import * as express from "express";

import { createBoardActionValidation } from "./actions/create-board.action";
import { editBoardActionValidation } from "./actions/edit-board.action";
import { createColumnActionValidation } from "./actions/create-column.action";
import { addUserActionValidation } from "./actions/add-user.action";
import { editColumnActionValidation } from "./actions/edit-column.action";
import { deleteBoardActionValidation } from "./actions/delete-board.action";
import { createTaskActionValidation } from "./actions/create-task.action";
import { getUserBoardsActionValidation } from "./actions/get-user-boards.action";
import { getBoardActionValidation } from "./actions/get-board.action";
import { addWorkerActionValidation } from "./actions/add-worker.action";
// VALIDATION_IMPORTS

export interface BoardsRoutingDependencies {
  createBoardAction: express.RequestHandler;
  editBoardAction: express.RequestHandler;
  createColumnAction: express.RequestHandler;
  addUserAction: express.RequestHandler;
  editColumnAction: express.RequestHandler;
  deleteBoardAction: express.RequestHandler;
  createTaskAction: express.RequestHandler;
  getUserBoardsAction: express.RequestHandler;
  getBoardAction: express.RequestHandler;
  addWorkerAction: express.RequestHandler;
  // ACTIONS_IMPORTS
}

export const boardsRouting = (actions: BoardsRoutingDependencies) => {
  const router = express.Router();

  router.post("/create-board", [createBoardActionValidation], actions.createBoardAction);
  router.post("/edit-board", [editBoardActionValidation], actions.editBoardAction);
  router.post("/create-board", [createBoardActionValidation], actions.createBoardAction);
  router.post("/create-column", [createColumnActionValidation], actions.createColumnAction);
  router.post("/add-user", [addUserActionValidation], actions.addUserAction);
  router.post("/edit-column", [editColumnActionValidation], actions.editColumnAction);
  router.post("/delete-board", [deleteBoardActionValidation], actions.deleteBoardAction);
  router.post("/create-task", [createTaskActionValidation], actions.createTaskAction);
  router.get("/get-user-boards", [getUserBoardsActionValidation], actions.getUserBoardsAction);
  router.get("/get-board", [getBoardActionValidation], actions.getBoardAction);
  router.post("/add-worker", [addWorkerActionValidation], actions.addWorkerAction);
  // ACTIONS_SETUP

  return router;
};
