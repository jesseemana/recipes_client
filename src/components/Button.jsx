const Button = ({ disabled, onClick, label}) => {
  return (
    <button 
      disabled={disabled}
      onClick={onClick} 
      className='bg-[#38D6C4] rounded-sm py-1 text-white uppercase text-sm md:text-[17px] text-center font-medium disabled:opacity-70 disabled:cursor-not-allowed'
    >
      {label}
    </button>
  )
}

export default Button