import './componentStyles/SlideDrawer.css';

const SlideDrawer = (props) => {
  let drawerClasses = 'side-drawer';
  // if (this.props.show) {
  if (props.show) {
    drawerClasses = 'side-drawer open'
  }

  return ( 
    <div className={drawerClasses}>
      <h1>Hello, I'm sliding!</h1>
    </div>
  );
}
 
export default SlideDrawer;