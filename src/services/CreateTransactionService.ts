import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Resquest {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Resquest): Transaction {
    const balance = this.transactionsRepository.getBalance().total - value;
    if (type === 'outcome' && balance < 0) {
      throw new Error('You dont have balance to do this!');
    } else {
      const transaction = this.transactionsRepository.create({
        title,
        type,
        value,
      });
      return transaction;
    }
  }
}

export default CreateTransactionService;
