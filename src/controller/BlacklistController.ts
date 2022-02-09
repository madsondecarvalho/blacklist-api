import { Request, Response } from "express"
import Blacklist from "../schemas/Blacklist"
import { cpf } from 'cpf-cnpj-validator';

class BlacklistController {

    async findOne(req: Request, res: Response) {

        const { document } = req.query

        try {
            const blacklist = await Blacklist.findOne({ document: document }, {}).exec()

            return res.status(200).json(blacklist ? { blacklist: "BLOCK" } : { blacklist: "FREE" })
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "An error ocurred trying to fetch data from blacklist" })
        }

    }

    async create(req: Request, res: Response) {
        const { document } = req.body

        try {

            if (cpf.isValid(document)) {
                const blacklist = await Blacklist.create({ document })
                return res.status(201).json(blacklist)
            } else {
                return res.status(400).json({ message: "Not a valid document." })
            }

        } catch (error) {
            console.error(error)

            if (error.code = 11000)
                return res.status(400).json({ message: "document already exists on blacklist" })
            else
                return res.status(400).json({ message: "An error ocurred", error: error })

        }
    }

    async delete(req: Request, res: Response) {
        const { document } = req.body

        try {
            if (cpf.isValid(document)) {
                const result = await Blacklist.deleteOne({ document })
                return res.status(200).json(result.deletedCount ? { message: "Document deleted from blacklist" } : { message: "Document was not deleted from blacklist" })
            } else {
                return res.status(400).json({ message: "Not a valid document." })
            }
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "An error ocurred trying to delete data from blacklist" })
        }
    }

}

export default new BlacklistController()