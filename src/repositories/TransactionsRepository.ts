import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {

  public async sumValues(type: string): Promise<number> {
    const transaction = await this.find()

    const sum = transaction.reduce((accumulator, transaction) => {
      if(transaction.type === type)
            return accumulator += transaction.value
      else 
            return accumulator
  }, 0)

  return sum
  }

  public async getBalance(): Promise<Balance> {
    const sumIncome = await this.sumValues('income')
    const sumOutcome = await this.sumValues('outcome')
    const total = sumIncome - sumOutcome

    const balance: Balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: total
    }

    return balance
  }
}

export default TransactionsRepository;
