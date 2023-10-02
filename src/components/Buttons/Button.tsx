const Button = ({ disabled, onClick, label, type}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`disabled:opacity-80 disabled:cursor-not-allowed text-sm cursor-pointer
        ${type === 'submit'
          ? 'bg-[#38D6C4] text-white uppercase rounded-sm py-1 md:py-2 font-semibold'
          : 'text-[#38D6C4] md:text-[15px] underline capitalize'}
      `}
    >
      {label}
    </button>
  )
}

export default Button 