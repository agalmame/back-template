import { protect } from "@/shared/infrastructure/middleware/AuthMiddleware";
import { Router } from "express";
import { container } from "tsyringe";

export function createUserRoutes(): Router {

    const router = Router();

    router.use(protect(container));

    router.get("/", (req, res) => {
        res.status(200).json({
            message: "Users"
        })
    })

    return router
}