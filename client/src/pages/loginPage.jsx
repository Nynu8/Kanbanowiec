import Login from "../components/login/login"
import Register from "../components/login/register"
import WaitingWindow from "../components/waitingWindow"

const LoginPage = () => {

    const [showLogin, showRegister,showWindow, setShow] = useState(false);

    const showLogin = () =>{

    }
    const showRegister = () =>{

    }


    return(
        <div>
            <Register id="register-container"></Register>
            <Login id="login-container"></Login>
            <button>I already have an account</button>
            <button>I don't have an account</button>
            <WaitingWindow></WaitingWindow>
        </div>
    )

}

export default LoginPage;