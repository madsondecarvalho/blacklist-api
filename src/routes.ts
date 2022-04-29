import express, { Request, Response } from "express"
import BlacklistController from "./controller/BlacklistController"

const routes = express.Router();

routes.get('/', (req: Request, res: Response) => { res.status(200).send() })

//blacklist routes
routes.put('/add', BlacklistController.create)
routes.delete('/remove', BlacklistController.delete)
routes.get('/blacklist', BlacklistController.findOne)



export { routes }