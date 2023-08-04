import GetRecipes from '../api/GetRecipes'
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Home')

  return (
    <>
      <div className='max-w-full px-[4%]'>
        <GetRecipes />
      </div>
    </>
  )
}

export default Home