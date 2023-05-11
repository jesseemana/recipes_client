function DropdownItem(props){
  return(
    <li className='flex items-center justify-center'>
      <props.img />
      <a className="max-w-[100px] ml-[10px] transition"> {props.text} </a>
    </li>
  );
}

export default DropdownItem