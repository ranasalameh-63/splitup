import { Schema, model, InferSchemaType } from 'mongoose';

const intFils = {
  type: Number,
  required: true,
  min: 0,
  validate: { validator: Number.isInteger, message: 'Amount must be an integer (fils)' },
};

const splitSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: intFils,
  },
  { _id: false }
);

const expenseSchema = new Schema(
  {
    group: { type: Schema.Types.ObjectId, ref: 'Group', required: true },
    paidBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true, trim: true },
    amount: { ...intFils, min: 1 },
    splits: { type: [splitSchema], required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// The shares must add up exactly to the expense amount
expenseSchema.pre('validate', function (next) {
  const sum = this.splits.reduce((total, s) => total + s.amount, 0);
  if (sum !== this.amount) {
    return next(new Error('Splits must add up to the expense amount'));
  }
  next();
});

expenseSchema.index({ group: 1, date: -1 });

export type ExpenseDoc = InferSchemaType<typeof expenseSchema>;
export const Expense = model('Expense', expenseSchema);