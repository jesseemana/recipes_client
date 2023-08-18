import GetRecipes from '../api/GetRecipes'
import Content from '../components/Content'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Home = () => {
  useDocumentTitle('Home')

  return (
    <Content>
      <div>
        <h1>HELLO WORLD</h1>
      </div>
    </Content>
  )
}

export default Home 