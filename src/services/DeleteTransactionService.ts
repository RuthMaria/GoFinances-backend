 import AppError from '../errors/AppError';
 import TransactionRepository from '../repositories/TransactionsRepository'
 import { getCustomRepository } from 'typeorm'

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    
    const transactionRepository = getCustomRepository(TransactionRepository)

    const deleteTransaction = await transactionRepository.delete(id)

    if( !deleteTransaction )
          throw new AppError('Transaction no exist.')

  }
}

export default DeleteTransactionService;
