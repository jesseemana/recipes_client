import Content from '../components/Wrappers/Content'
import { useParams } from 'react-router-dom'

const EditRecipe = () => {
  const { id } = useParams()

  return (
    <Content>
      <div>Edit Recipe</div>
    </Content>
  )
}

export default EditRecipe  