import { z } from "zod";

export const submitAnswerRequestSchema = z.object({
  body: z.object({
    answeredQuestion: z.object({
      questionId: z.string(),
      selectedOption: z.string(),
    }),
  }).strict(),
});

export const answerSchema = z.object({
  body: z.object({
    userId: z.string(),
    answeredQuestion: z.object({
      questionId: z.string(),
      selectedOption: z.string(),
    }),
    points: z.object({
      health: z.number(),
      wealth: z.number(),
      happiness: z.number(),
    }),
    accumulatedPoints: z.number(),
  }).strict(),
});
