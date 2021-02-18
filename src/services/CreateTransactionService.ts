import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm'
import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository'

interface Request {
  title: string
  value: number
  type: 'income' | 'outcome';
  category_id: string
}

class CreateTransactionService {
  public async execute({ title, value, type, category_id}: Request): Promise<Transaction> {
     
    if( !['income', 'outcome'.includes(type)]){
        throw new AppError('Transaction type is invalid!')
      }
      
      const transactionRepository = getCustomRepository(TransactionRepository)

      const { total } = await transactionRepository.getBalance()
    
      const deniedTransition = type === 'outcome' && value > total

      if(deniedTransition)
            throw new AppError('You do not have enough balance!')
    
      const transaction = transactionRepository.create({
        title,
        type,
        value,
        category_id
      })

     await transactionRepository.save(transaction)
      
      return transaction
    }
}

export default CreateTransactionService;
