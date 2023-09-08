import { useNavigate } from 'react-router-dom'
import Header from './Inputs/Header'
import Content from './Wrappers/Content'

interface EmptyState {
  title: string
  subtitle: string
  getStarted?: boolean
}

const EmptyState = ({ title, subtitle, getStarted }: EmptyState) => {
  const navigate = useNavigate()

  return (
    <Content>
      <div className='h-[79vh] flex items-center justify-center flex-col'>
        <Header 
          center
          title={title} 
          subtitle={subtitle} 
        />
        <div className='w-48'>
          {getStarted && (
            <button 
              onClick={() => navigate('/create')} 
              className='flex border p-2 ml-12 rounded-md border-gray-500 text-gray-800 capitalize'
            >
              get started
            </button>
          )}
        </div>
      </div>
    </Content>
  )
}

export default EmptyState  