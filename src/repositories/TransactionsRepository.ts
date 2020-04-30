/* eslint-disable import/no-unresolved */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allTransactions = this.transactions;

    const totalIncome = allTransactions
      .filter(elemento => elemento.type === 'income')
      .reduce((acc, element) => {
        return acc + element.value;
      }, 0);

    const totalOutcome = allTransactions
      .filter(elemento => elemento.type === 'outcome')
      .reduce((acc, element) => {
        return acc + element.value;
      }, 0);

    const totalAll = totalIncome - totalOutcome;

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalAll,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
