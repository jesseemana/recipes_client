const InputField = (props: InputProps) => {
  return (
    <>
      <label 
        htmlFor={props.htmlFor} 
        className='text-sm md:text-[15px] capitalize text-gray-500'
      >
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        {...(props.inputProps ?? {})}
        autoComplete='off'
        className='py-1 md:py-2 px-1 text-sm text-gray-600 border border-gray-300 rounded-sm outline-[#38D6C4] file:cursor-pointer file:border-0 file:text-gray-600'
      />
      {props.error && <span className='text-red-600 text-sm'>{props.error}</span>}
    </>
  )
}

export default InputField 