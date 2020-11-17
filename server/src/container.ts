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
import { Translation } from "./shared/translations/translation";
import { errorHandler } from "./middleware/error-handler";
import { winstonLogger } from "./shared/logger";
import { QueryBus } from "./shared/query-bus";
import { EventDispatcher } from "./shared/event-dispatcher";
import AccessTokenService from "./app/features/users/services/access-token.service";

import { UserModel } from "./app/features/users/models/user.model";
// MODELS_IMPORTS

import { usersRouting } from "./app/features/users/routing";
// ROUTING_IMPORTS

import UsersQueryHandler from "./app/features/users/query-handlers/users.query.handler";
import DeleteUserCommandHandler from "./app/features/users/handlers/delete-user.handler";
import RegisterCommandHandler from "./app/features/users/handlers/register.handler";
import LoginCommandHandler from "./app/features/users/handlers/login.handler";
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
    // ROUTING_SETUP
  });

  container.register({
    router: awilix.asFunction(createRouter),
    errorHandler: awilix.asFunction(errorHandler),
    translationService: awilix.asClass(Translation),

    eventDispatcher: awilix.asClass(EventDispatcher).classic().singleton(),
    eventSubscribers: asArray<any>([
      // SUBSCRIBERS_SETUP
    ]),

    commandBus: awilix.asClass(CommandBus).classic().singleton(),
    commandHandlers: asArray<any>([
      awilix.asClass(DeleteUserCommandHandler),
      awilix.asClass(RegisterCommandHandler),
      awilix.asClass(LoginCommandHandler),
      // COMMAND_HANDLERS_SETUP
    ]),

    queryBus: awilix.asClass(QueryBus).classic().singleton(),
    queryHandlers: asArray<any>([
      awilix.asClass(UsersQueryHandler),
      // QUERY_HANDLERS_SETUP
    ]),

    userRepository: awilix.asValue(dbConnection.getRepository(UserModel)),
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
    // SERVICES
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
