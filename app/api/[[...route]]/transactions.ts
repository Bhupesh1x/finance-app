import { z } from "zod";
import { Hono } from "hono";
import { parse, subDays } from "date-fns";
import { zValidator } from "@hono/zod-validator";
import { and, desc, eq, gte, lte } from "drizzle-orm";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";

import { db } from "@/db/drizzle";
import { accounts, categories, transactions } from "@/db/schema";

const app = new Hono().get(
  "/",
  clerkMiddleware(),
  zValidator(
    "param",
    z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      acountId: z.string().optional(),
    })
  ),
  async (c) => {
    const auth = getAuth(c);
    const { from, to, acountId } = c.req.valid("param");

    if (!auth?.userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const defaultTo = new Date();
    const defaultForm = subDays(defaultTo, 30);

    const startDate = from
      ? parse(from, "yyyy-MM-dd", new Date())
      : defaultForm;
    const toDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

    const data = await db
      .select({
        id: transactions.id,
        account: accounts.name,
        accountId: transactions.accountId,
        payee: transactions.payee,
        notes: transactions.notes,
        amount: transactions.amount,
        categoryId: transactions.categoryId,
        category: categories.name,
      })
      .from(transactions)
      .innerJoin(accounts, eq(transactions.accountId, accounts.id))
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .where(
        and(
          acountId ? eq(transactions.accountId, acountId) : undefined,
          eq(accounts.userId, auth.userId),
          gte(transactions.date, startDate),
          lte(transactions.date, toDate)
        )
      )
      .orderBy(desc(transactions.date));

    return c.json({ data });
  }
);

export default app;
