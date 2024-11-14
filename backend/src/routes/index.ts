import { Router } from 'express';
import { pingRoute } from './ping';
import { userRoutes } from './users';
import { questionRoutes } from './questions';
import { questionStatusRoutes } from './question-status';

export const routes = Router();

// add all the routes
routes.use(pingRoute);

// all the user operation routes
routes.use(userRoutes);

// all the question routes
routes.use(questionRoutes);

// all the question status routes
routes.use(questionStatusRoutes);
