import { protect } from "@/shared/infrastructure/middleware/AuthMiddleware";
import { PrismaQueryBuilder } from "@/shared/infrastructure/query/QueryBuilder";
import { QueryStringSchema } from "@/shared/infrastructure/Transformers/QueryTransformer";
import { Router } from "express";
import { container } from "tsyringe";

export function createUserRoutes(): Router {
    const router = Router();

    router.use(protect(container));

    router.get("/", (req, res) => {
        const validation = QueryStringSchema.parse(req.query)
        const builder =new PrismaQueryBuilder()
        console.log(builder.buildQuery(validation))
        res.status(200).json({
            message: "Users",
            validation
        })
    })

    return router
}