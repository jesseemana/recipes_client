const InputField = ({type, value, placeholder, onChange, htmlFor, label, id}) => {
  return (
    <>
      <label htmlFor={htmlFor} className='text-sm md:text-[15px] capitalize text-gray-500'>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange} 
        placeholder={placeholder}
        autoComplete='off'
        className='py-2 px-1 text-gray-600 border border-gray-300 rounded-sm outline-[#38D6C4] file:cursor-pointer file:border-0 file:text-gray-600'
        required
      />
    </>
  )
}

export default InputField