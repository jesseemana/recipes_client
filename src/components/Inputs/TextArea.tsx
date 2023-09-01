interface TextAreaProps {
  id: string
  rows: number
  name: string
  error: string
  label: string
  htmlFor: string
  placeholder: string
  inputProps: unknown
}

const TextArea = ({ htmlFor, label, id, name, rows,  placeholder, inputProps, error }: TextAreaProps) => {
  return (
    <>
      <label 
        htmlFor={htmlFor}
        className='text-sm md:text-[15px] capitalize text-gray-500'
      >
        {label}
      </label>
      <textarea 
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        {...(inputProps ?? {})}
        className='border border-gray-200 p-2 rounded-sm resize-none outline-[#38D6C4]'
      />
      {error && <span className='text-red-600 text-sm'>{error}</span>}
    </>
  )
}

export default TextArea 