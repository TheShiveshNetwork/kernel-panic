import { z } from "zod";

export const submitAnswerRequestSchema = z.object({
  body: z.object({
    answeredQuestion: z.object({
      questionId: z.string(),
      selectedOption: z.string(),
    }),
  }),
});

export const answerSchema = z.object({
  body: z.object({
    userId: z.string(),
    name: z.string(),
    timestamp: z.string(),
    accumulatedPoints: z.number(),
    currentQuestion: z.number(),
    answeredQuestions: z.array(
      z.object({
        questionId: z.string(),
        selectedOption: z.string(),
        timestamp: z.string(),
        points: z.object({
          health: z.number(),
          wealth: z.number(),
          happiness: z.number(),
        }),
      })
    ),
  }),
});

export type IAnswerSchema = z.infer<typeof answerSchema>;
