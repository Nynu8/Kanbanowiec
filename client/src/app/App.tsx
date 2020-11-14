import React from "react";
import { Type } from "typescript";
import { boolean } from "yargs";
import "../assets/styles/App.css";
import { Login, Register } from "../components/login/index"

type AppState = {
  isLogginActive: boolean;
}

class App extends React.Component<{},AppState>{

  public rightSide: any;
  public container: any;
  public current: any;

  constructor(props: any){
    super(props);
    this.state = {
      isLogginActive: true,
    }
    this.rightSide = React.createRef();
    this.container = React.createRef();
    this.current = React.createRef();
    //this.componentDidMount();
  }

  componentDidMount() {
    this.rightSide.classList.add("right");
  }

  changeState(){
    const {isLogginActive} = this.state;
    if(isLogginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    }
    else{
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }

    this.setState((prevState) => ({ isLogginActive: !prevState.isLogginActive }));
  }

  render(){
    const isLogginActive = this.state;
    this.current = isLogginActive ? "Register" : "Login";
    const currentActive = isLogginActive ? "login" : "register";
    return(
      <div className="App">
      <div className="login">
        <div className="container" ref={ref => (this.container = ref)}>
          {isLogginActive && <Login containerRef={(ref: any) => (this.current = ref)} />}
          {!isLogginActive && <Register containerRef={(ref: any) => this.current = ref}/>}
        </div>
        <RightSide current={this.current} 
                   currentActive={currentActive}
                   containerRef={(ref: any)=>(this.rightSide = ref)} 
                   onClick={this.changeState.bind(this)}/>
      </div>
      </div>
    )
  }
}

const RightSide = (props: any) =>{
  return (
    <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
      <div className="inner-container">
  <div className="text">{props.current}</div>
      </div>
    </div>
  );
}

export default App;
