import db from './db';

export type TransactionFunction<TReturn> = () => Promise<TReturn>;

export async function transaction<TReturn>(
  transactionFunction: TransactionFunction<TReturn>,
): Promise<TReturn> {
  try {
    await beginTransanction();

    const result = await transactionFunction();

    await commitTransanction();

    return result;
  } catch (error) {
    await rollbackTransanction();

    throw error;
  }
}

export async function beginTransanction(): Promise<void> {
  const beginTransanctionQuery = `
    BEGIN TRANSACTION;
  `;

  await db.raw(beginTransanctionQuery);
}

export async function commitTransanction(): Promise<void> {
  const commitTransanctionQuery = `
    COMMIT TRANSACTION;
  `;

  await db.raw(commitTransanctionQuery);
}

export async function rollbackTransanction(): Promise<void> {
  const rollbackTransanctionQuery = `
    ROLLBACK TRANSACTION;
  `;

  await db.raw(rollbackTransanctionQuery);
}
