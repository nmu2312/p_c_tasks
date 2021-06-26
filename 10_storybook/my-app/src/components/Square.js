export default function Square(props) {
  return (
    <button style={props.style} className='square' onClick={props.onClick}>
      {props.value}
    </button>
  );
}
