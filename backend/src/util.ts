import { Request, Response } from 'express';

export function createRouteErrorResponse(error: any, request: Request, response: Response) {
    if (error instanceof Error) {
        response.status(500).json({ message: error.message });
    } else {
        response.status(500).json({ message: 'An unknown error occurred' });
    }
}

export function generateSeatLabels() {
    return ['C1', 'C2', 'C3', 'F1'];
}
