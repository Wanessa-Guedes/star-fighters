import { NextFunction, Request, Response } from "express";

export default async function handleError(error, req: Request, res: Response, next: NextFunction) {
    if(error.type == "Not Found"){
        return res.status(404).send(`${error.type}`);
    }

    return res.status(500).send("Internal Server Error")
}