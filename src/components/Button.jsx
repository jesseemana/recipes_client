const Button = ({ disabled, onClick, label, type}) => {
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick} 
      className='bg-[#38D6C4] rounded-sm py-2 text-white uppercase text-sm md:text-[17px] text-center font-normal disabled:opacity-70 disabled:cursor-not-allowed'
    >
      {label}
    </button>
  )
}

export default Button