import * as awilix from "awilix";
import { AwilixContainer, Lifetime, Resolver } from "awilix";
import { Application } from "express";
import * as http from "http";
import { createConnection, ConnectionOptions } from "typeorm";
import { makeApiConfig } from "../config/services";
import { createApp } from "./app/app";
import { createRouter } from "./app/router";
import { CommandBus } from "./shared/command-bus";
import * as db from "../config/db";
import { errorHandler } from "./middleware/error-handler";
import { winstonLogger } from "./shared/logger";
import { QueryBus } from "./shared/query-bus";
import { EventDispatcher } from "./shared/event-dispatcher";
import { isLoggedIn } from "./middleware/is-logged-in";
import AccessTokenService from "./app/features/users/services/access-token.service";

import { UserModel } from "./app/features/users/models/user.model";
import { TokenModel } from "./app/features/users/models/token.model";
import { BoardModel } from "./app/features/boards/models/board.model";
import { PermissionModel } from "./app/features/boards/models/permission.model";
import { ColumnModel } from "./app/features/boards/models/column.model";
import { TaskModel } from "./app/features/boards/models/task.model";
// MODELS_IMPORTS

import { usersRouting } from "./app/features/users/routing";
import { boardsRouting } from "./app/features/boards/routing";
// ROUTING_IMPORTS

import UsersQueryHandler from "./app/features/users/query-handlers/users.query.handler";
import RegisterCommandHandler from "./app/features/users/handlers/register.handler";
import LoginCommandHandler from "./app/features/users/handlers/login.handler";
import GetUserDetailsQueryHandler from "./app/features/users/query-handlers/get-user-details.query.handler";
import ChangeUserDetailsCommandHandler from "./app/features/users/handlers/change-user-details.handler";
import CreateBoardCommandHandler from "./app/features/boards/handlers/create-board.handler";
import EditBoardCommandHandler from "./app/features/boards/handlers/edit-board.handler";
import CreateColumnCommandHandler from "./app/features/boards/handlers/create-column.handler";
import DeleteUserCommandHandler from "./app/features/users/handlers/delete-user.handler";
import AddUserCommandHandler from "./app/features/boards/handlers/add-user.handler";
import EditColumnCommandHandler from "./app/features/boards/handlers/edit-column.handler";
import DeleteBoardCommandHandler from "./app/features/boards/handlers/delete-board.handler";
import CreateTaskCommandHandler from "./app/features/boards/handlers/create-task.handler";
import GetUserBoardsQueryHandler from "./app/features/boards/query-handlers/get-user-boards.query.handler";
import GetBoardQueryHandler from "./app/features/boards/query-handlers/get-board.query.handler";
import AddWorkerCommandHandler from "./app/features/boards/handlers/add-worker.handler";
// HANDLERS_IMPORTS

// SUBSCRIBERS_IMPORTS

const config = makeApiConfig();

function asArray<T>(resolvers: Resolver<T>[]): Resolver<T[]> {
  return {
    resolve: (container: AwilixContainer) => resolvers.map((r: Resolver<T>) => container.build(r)),
  };
}

export async function createContainer(): Promise<AwilixContainer> {
  const container: AwilixContainer = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  const dbConnection = await createConnection(db as ConnectionOptions);
  await dbConnection.runMigrations();

  container.register({
    port: awilix.asValue(config.port),
    logger: awilix.asValue(winstonLogger),
  });

  container.loadModules(["src/**/*.action.ts", "src/**/*.action.js"], {
    formatName: "camelCase",
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
      register: awilix.asFunction,
    },
  });

  container.register({
    usersRouting: awilix.asFunction(usersRouting),
    boardsRouting: awilix.asFunction(boardsRouting),
    // ROUTING_SETUP
  });

  container.register({
    router: awilix.asFunction(createRouter),
    errorHandler: awilix.asFunction(errorHandler),

    eventDispatcher: awilix.asClass(EventDispatcher).classic().singleton(),
    eventSubscribers: asArray<any>([
      // SUBSCRIBERS_SETUP
    ]),

    commandBus: awilix.asClass(CommandBus).classic().singleton(),
    commandHandlers: asArray<any>([
      awilix.asClass(RegisterCommandHandler),
      awilix.asClass(LoginCommandHandler),
      awilix.asClass(ChangeUserDetailsCommandHandler),
      awilix.asClass(CreateBoardCommandHandler),
      awilix.asClass(EditBoardCommandHandler),
      awilix.asClass(CreateColumnCommandHandler),
      awilix.asClass(DeleteUserCommandHandler),
      awilix.asClass(AddUserCommandHandler),
      awilix.asClass(EditColumnCommandHandler),
      awilix.asClass(DeleteBoardCommandHandler),
      awilix.asClass(CreateTaskCommandHandler),
      awilix.asClass(AddWorkerCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),

    queryBus: awilix.asClass(QueryBus).classic().singleton(),
    queryHandlers: asArray<any>([
      awilix.asClass(UsersQueryHandler),
      awilix.asClass(GetUserDetailsQueryHandler),
      awilix.asClass(GetUserBoardsQueryHandler),
      awilix.asClass(GetBoardQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),

    userRepository: awilix.asValue(dbConnection.getRepository(UserModel)),
    tokenRepository: awilix.asValue(dbConnection.getRepository(TokenModel)),
    boardRepository: awilix.asValue(dbConnection.getRepository(BoardModel)),
    permissionRepository: awilix.asValue(dbConnection.getRepository(PermissionModel)),
    columnRepository: awilix.asValue(dbConnection.getRepository(ColumnModel)),
    taskRepository: awilix.asValue(dbConnection.getRepository(TaskModel)),
    // MODELS_SETUP
  });

  container.register({
    secret: awilix.asValue(process.env.SECRET),
    accessTokenLifetime: awilix.asValue(process.env.ACCESS_TOKEN_LIFETIME),
    refreshTokenLifetime: awilix.asValue(process.env.REFRESH_TOKEN_LIFETIME),
    // ENVS
  });

  container.register({
    accessTokenService: awilix.asClass(AccessTokenService).singleton(),
    isLoggedInMiddleware: awilix.asFunction(isLoggedIn),
  });

  container.register({
    app: awilix.asFunction(createApp).singleton(),
  });

  const app: Application = container.resolve("app");

  container.register({
    server: awilix.asValue(http.createServer(app)),
  });

  return container;
}
