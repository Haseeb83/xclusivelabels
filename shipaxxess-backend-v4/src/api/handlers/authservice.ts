import jwt from 'jsonwebtoken';

export class AuthService {
    public generateCookie(userId: string) {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
        return token;
    }

    public validateCookie(token: string) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            return decoded;
        } catch (error) {
            return null;
        }
    }
}