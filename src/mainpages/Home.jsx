import Feed from './Feed'
import { useEffect } from 'react'
import Content from '@/components/Wrappers/Content'
import useFetchRecipes from '@/hooks/useFetchRecipes'
import PageLayout from '@/components/Wrappers/PageLayout'
import SkeletonCard from '@/components/Loaders/SkeletonCard'

const Home = () => {
  const { loading, user, recipes, currentPage, totalPages, getRecipes, setCurrentPage } = useFetchRecipes()

  useEffect(() => {
    getRecipes()
  },[])

  if (loading) return (
    <Content>
      <PageLayout>
        {...new Array(15).fill(0).map((item, index) => (
          <SkeletonCard key={index} />
        ))}
      </PageLayout>
    </Content>
  )

  return (
    <Content>
      <Feed 
        user={user}
        recipes={recipes}
        pages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
      />
    </Content>
  )
}

export default Home     