import { Request, Response, NextFunction } from "express";

export function E404Handler(req: Request, res: Response, next: NextFunction) {
    return next(new Error("Sidan kunde inte hittas."));
}
