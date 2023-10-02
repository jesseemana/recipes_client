import GetRecipes from '@/api/GetRecipes'
import Content from '@/components/Wrappers/Content'

const Home = () => {
  return (
    <Content>
      <GetRecipes />
    </Content>
  )
}

export default Home 