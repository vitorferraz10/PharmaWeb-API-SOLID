import { Router } from "express";
import { createUserController } from "./useCases/CreateUser";
import * as data from "./_mock_/medication";

const router = Router();

router.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});

router.get("/", (request, response) => {
  return response.json(data.orderPayload);
});

export { router };
