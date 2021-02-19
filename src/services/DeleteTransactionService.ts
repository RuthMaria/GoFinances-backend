 import AppError from '../errors/AppError';
 import TransactionRepository from '../repositories/TransactionsRepository'
 import { getCustomRepository } from 'typeorm'

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    
    const transactionRepository = getCustomRepository(TransactionRepository)

    const checkTransactionExists = await transactionRepository.findOne(id)
    
    if( !checkTransactionExists )
          throw new AppError('Transaction does not exist.')
    
    await transactionRepository.delete(id)
  }
}

export default DeleteTransactionService;
