import express, { Request, Response } from "express"
import BlacklistController from "./controller/BlacklistController"

const routes = express.Router();

//blacklist routes
routes.put('/add', BlacklistController.create)
routes.delete('/remove', BlacklistController.delete)
routes.get('/blacklist', BlacklistController.findOne)


export { routes }