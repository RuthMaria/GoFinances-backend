import Category from '../models/Category'
import Transaction from '../models/Transaction'

import { getRepository } from 'typeorm'

class CreateCategoryService {

  public async execute(title: string): Promise<Category> {
    
    const categoryRepository = getRepository(Category)

    const checkCategoryExists = await categoryRepository.findOne({
        where: { title }
    }) 

    if(checkCategoryExists)
         return checkCategoryExists

    const newCategory = categoryRepository.create({ title })

    await categoryRepository.save(newCategory)

    return newCategory
  }
}

export default CreateCategoryService;
