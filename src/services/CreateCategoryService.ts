import Category from '../models/Category'
import Transaction from '../models/Transaction'

import { getRepository } from 'typeorm'

class CreateCategoryService {


  public async searchCategory(id: string): Promise<Category | undefined>{

    const categoryRepository = getRepository(Category)

    const category =  await categoryRepository.findOne({
      where: { id }
     })

     return category
  }

  // public transactionDTO(transactions: Transaction[]): Promise<Transaction[]>{

  //   const newTransactions = transactions.map(transaction => {
  //     return transaction.category
  //           })
  //   })

  //  return newTransactions

  // }

  public async execute(title: string): Promise<Category> {
    
    const categoryRepository = getRepository(Category)

    const checkCategoryExists = await categoryRepository.findOne({
        where: { title }
    }) 

    if(checkCategoryExists)
         return checkCategoryExists

    const category = categoryRepository.create({ title })

    await categoryRepository.save(category)

    return category
  }
}

export default CreateCategoryService;
