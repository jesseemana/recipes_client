const Button = ({ disabled, onClick, label, type}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`disabled:opacity-80 disabled:cursor-not-allowed text-sm cursor-pointer
        ${type === 'submit'
          ? 'bg-[#38D6C4] text-white uppercase rounded-sm py-2'
          : 'text-[#38D6C4] md:text-[17px] underline capitalize'}
      `}
    >
      {label}
    </button>
  )
}

export default Button 