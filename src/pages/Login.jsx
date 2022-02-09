import { memo, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

    const Login = memo((props)=> {

    const { setUsuario } = useContext(UserContext)
    const formLogin = useRef()
    const navigate = useNavigate()

    function send(e) {
        e.preventDefault()

        fetch(`${import.meta.env.VITE_URL_DOMAIN}/login`,{
                body: new FormData(formLogin.current),
                method: "post"
            }).then(response =>{
                if(response.ok){
                    console.log('status: ',response.status); 
                    return response.json()
                }else{
                    console.log('bad credentials');
                }
            })
            .then(data => {
                console.log('datos login: ',data);
                setUsuario(data)
                //navigate('/')
                //return <Navigate to='/' />
            }).catch((error) => {
                console.error('Error:', error);
              });
    }

    return (
        <div className="centrar" style={{ height: '100vh' }}>

            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <a href="." className="h1"> <b>Admin</b> </a>
                    </div>
                    <div className="card-body">


                        <form ref={formLogin} onSubmit={send}>
                            <div className="input-group mb-3">
                                <input type="text" name="username" className="form-control" placeholder="Usuario" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" name="password" className="form-control" placeholder="Contraseña" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-4">
                                    <button type="submit" onClick={send} className="btn btn-primary btn-block">Sign In</button>
                                </div>
                            </div>
                        </form>

                        <div className="social-auth-links text-center mt-2 mb-3">
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                            </a>
                        </div>

                        <p className="mb-1">
                            <a href="forgot-password.html">Olvide mi contraseña</a>
                        </p>

                    </div>
                </div>
            </div>

        </div>
    )
})
export default Login