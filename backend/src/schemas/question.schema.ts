import { z } from "zod";

export const createQuestionSchema = z.object({
    body: z.object({
        title: z.string().min(5),
        content: z.string().nullable(),
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
