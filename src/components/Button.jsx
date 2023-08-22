const Button = ({ disabled, onClick, label, type}) => {
  return (
    <button 
      type={type}
      disabled={disabled}
      onClick={onClick} 
      className={`text-[#38D6C4] text-sm md:text-[17px] underline capitalize cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed
        ${type === 'submit' 
        ? 'bg-[#38D6C4] text-white uppercase rounded-sm py-2 text-sm text-center' 
        : 'bg-rose-500 text-white uppercase rounded-sm no-underline py-1' }
      `}
    >
      {label}
    </button>
  )
}

export default Button 