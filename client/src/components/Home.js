import './componentStyles/Home.css'
import Timer from './Timer';

const Home = (props) => {

  // const handleClick = (e) => {
  //   console.log('hello, world', e);
  // }

  // const handleClickAgain = (name) => {
  //   console.log('hello ' + name);
  // }

  return (
    <div className="home">
      <h2>Workout</h2>
      {/* <button onClick={props.toggle}>Slider</button> */}
      {/* <button onClick={handleClick}>Click me</button> */}
      {/* <button onClick={() => {handleClickAgain('mario')}}>Click me again</button> */}
      <Timer />
    </div>
  );
}

export default Home;
