import RecipeCard from './RecipeCard'
import Pagination from './Pagination'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Feed = ({recipes, pages, currentPage, setCurrentPage}) => {
  useDocumentTitle('Feed')

  return (
    <div className='pt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
      <RecipeCard data={recipes} />
      {recipes?.length < 12 && (
        <Pagination 
          pages={pages} 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
        />
      )}
    </div>
  )
}

export default Feed 