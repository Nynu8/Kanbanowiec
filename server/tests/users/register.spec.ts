import { Application } from "express-serve-static-core";
import { Repository } from "typeorm";
import * as request from "supertest";
import { expect } from "chai";
import { UserModel } from "../../src/app/features/users/models/user.model";

let userRepository: Repository<UserModel>;
let app: Application;

const requestTemplate = {
  email: "test@email.com",
  password: "123456789",
  confirmPassword: "123456789",
};

type requestType = typeof requestTemplate;
let requestData: requestType;

describe("register handler", () => {
  before(async () => {
    userRepository = global.container.resolve("userRepository");
    app = global.container.resolve("app");
  });

  beforeEach(async () => {
    await userRepository.delete({});
    requestData = { ...requestTemplate };
  });

  it("should register user and create user in database", async () => {
    await request(app).post("/api/users/register").send(requestData).expect(200);

    const user = await userRepository.findOne({});
    expect(user!.email).to.equal(requestData.email);
    expect(user!.password).to.not.equal(undefined);
    expect(user!.salt).to.not.equal(undefined);
  });

  it("should fail because of not matching passwords", async () => {
    requestData.confirmPassword += "a";

    await request(app).post("/api/users/register").send(requestData).expect(400);

    const user = await userRepository.findOne({});
    expect(user).to.equal(undefined);
  });

  it("should fail to register user with the same email twice", async () => {
    await request(app).post("/api/users/register").send(requestData).expect(200);
    await request(app).post("/api/users/register").send(requestData).expect(500);

    const users = await userRepository.find({});
    expect(users).to.be.length(1);
  });
});
