import GetRecipes from '../api/GetRecipes'
import Content from '../components/Content'
import useDocumentTitle from '../hooks/useDocumentTitle'

const Home = () => {
  useDocumentTitle('Home')

  return (
    <Content>
      <div className='bg-red-400'>
        <h1 >HELLO WORLD</h1>
      </div>
    </Content>
  )
}

export default Home 