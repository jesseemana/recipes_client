import { z } from 'zod'
import axios from '../api/axios'
import { RecipeSchema } from '@/model/model'

const RecipeResults = z.array(RecipeSchema)

type RecipeArray = z.infer<typeof RecipeResults>

export async function fetchRecipes({currentPage = 1}: { currentPage: number }): Promise<RecipeArray | undefined> {
    try {
        const response = await axios.get(`/recipes?page=${currentPage}`)
        const data = await response.data
        return data
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong: '
        if (error instanceof Error)
          errorMessage += error
        console.log(errorMessage)
    }
}   