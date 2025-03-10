import { Router, Response, NextFunction } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import jwt from 'jsonwebtoken';
const router = Router();

router.use('/auth', authRoutes);
interface AuthenticatedRequest extends Request {
    user?: string | object | undefined;
}

function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    // TODO: Add authentication to the API routes
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('ACCESS_TOKEN_SECRET is not defined');
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = user;
        next();
    }
    );
}

router.use('/api', apiRoutes);

export default router
