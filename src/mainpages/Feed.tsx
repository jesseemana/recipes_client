import RecipeCard from '@/components/RecipeCard'
import Pagination from '@/components/Buttons/Pagination'
import PageLayout from '@/components/Wrappers/PageLayout'

const Feed = ({ user, recipes, pages, currentPage, setCurrentPage }: Feed) => {
  return (
    <PageLayout>
      {recipes.map((recipe: Recipe) => (
        <RecipeCard
          user={user}
          data={recipe}
          key={recipe._id}
        />
      ))}
      {recipes?.length > 16 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </PageLayout>
  )
}

export default Feed  