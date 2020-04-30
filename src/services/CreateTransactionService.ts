/* eslint-disable import/no-unresolved */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionRequest): Transaction {
    const totalBalance = this.transactionsRepository.getBalance().total;

    if (type !== 'outcome' && type !== 'income') {
      throw Error('Invalid type');
    }

    if (type === 'outcome' && totalBalance < value) {
      throw Error('You dont have enough balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
