import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt, { compare } from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }
     // Verify the password
     const isPasswordValid = await compare(password, user.password);
     if (!isPasswordValid) {
       res.status(401).json({ message: 'Invalid email or password' });
     }
 
     // Generate a JWT token
     if (!process.env.ACCESS_TOKEN_SECRET) {
       throw new Error('ACCESS_TOKEN_SECRET is not defined');
     }
     const token = jwt.sign(
       { userId: user._id, email: user.email },
       process.env.ACCESS_TOKEN_SECRET,
       { expiresIn: '1h' }
     );
 
     res.status(200).json({ token });
     return;
     res.status(200).json({ token });
   } catch (error) {
     console.error('Error during login:', error);
     res.status(500).json({ message: 'Internal server error' });
   }
 };
 
 const router = Router();
 

// POST /login - Login a user
router.post('/login', login);

export default router;
// async function compare(password: string, hashedPassword: string): Promise<boolean> {
//   return await bcrypt.compare(password, hashedPassword);
// }
  // TODO: If the user exists and the password is correct, return a JWT token
async function compare(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}