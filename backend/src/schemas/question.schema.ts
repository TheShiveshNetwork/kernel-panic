import { z } from "zod";

export const createQuestionSchema = z.object({
    body: z.object({
        image: z.string().nullable(),
        question: z.string(),
        options: z.array(
            z.object({
                text: z.string(),
                points: z.object({
                    health: z.number(),
                    wealth: z.number(),
                    happiness: z.number(),
                }),
            }),
        ).min(2),
    }),
});

export const getQuestionByIdSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
