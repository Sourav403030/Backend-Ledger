import { Document } from 'mongoose';
import { userSchemaInterface } from './models/userModel';

declare global {
  namespace Express {
    interface Request {
      user?: Document & userSchemaInterface;
    }
  }
}