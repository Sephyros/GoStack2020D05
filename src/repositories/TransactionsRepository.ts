import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const incomeTotal = this.transactions
      .filter(item => {
        if (item.type === 'income') return item;
      })
      .reduce(
        (acumulador, transaction) => acumulador + transaction.value.valueOf(),
        0,
      );

    const outcomeTotal = this.transactions
      .filter(item => {
        if (item.type === 'outcome') return item;
      })
      .reduce(
        (acumulador, transaction) => acumulador + transaction.value.valueOf(),
        0,
      );

    const balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };
    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
