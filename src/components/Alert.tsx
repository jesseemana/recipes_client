import { 
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel, 
} from './ui/alert-dialog'

interface Alert {
  onClick: () => void 
  children: React.ReactNode
}

const Alert = ({ onClick, children }: Alert) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-red-500 uppercase'>delete recipe?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>cancel</AlertDialogCancel>
          <button 
            className='text-red-500 border border-red-500 bg-white px-2 rounded-md font-semibold hover:text-white hover:bg-red-500' 
            onClick={onClick}
          >
            delete
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Alert 