import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { env } from '../config/env';
import { createError } from '../lib/AppError';
import { asyncHandler } from '../lib/asyncHandler';

function signToken(userId: string) {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: '7d' });
}

function publicUser(user: { id: string; name: string; email: string }) {
  return { id: user.id, name: user.name, email: user.email };
}

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) throw createError(409, 'Email already in use');

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, passwordHash });

  res.status(201).json({ token: signToken(user.id), user: publicUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const valid = user && (await bcrypt.compare(password, user.passwordHash));
  if (!user || !valid) throw createError(401, 'Invalid email or password');

  res.json({ token: signToken(user.id), user: publicUser(user) });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) throw createError(401, 'User no longer exists');

  res.json({ user: publicUser(user) });
});