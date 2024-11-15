import { z } from "zod";

export const submitAnswerRequestSchema = z.object({
    body: z.object({
        userId: z.string(),
        answeredQuestions: z.array(
            z.object({
                questionId: z.string(),
                selectedOption: z.string(),
                points: z.object({
                    health: z.number(),
                    wealth: z.number(),
                    happiness: z.number(),
                }),
            })
        ),
        currentQuestion: z.number(),
    }),
});

export const answerSchema = z.object({
    body: z.object({
        userId: z.string(),
        answeredQuestions: z.array(
            z.object({
                questionId: z.string(),
                selectedOption: z.string(),
                points: z.object({
                    health: z.number(),
                    wealth: z.number(),
                    happiness: z.number(),
                }),
            })
        ),
        currentQuestion: z.number(),
        points: z.object({
            health: z.number(),
            wealth: z.number(),
            happiness: z.number(),
        }),
        accumulatedPoints: z.number(),
    }),
});

export const getQuestionStatusByUserIdSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});
