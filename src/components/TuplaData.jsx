import { Link } from "react-router-dom"

export function TuplaData(props) {
    const {usuario} = props
    return (<tr>
        <td>{usuario.id}</td>
        <td>{usuario.username}</td>
        <td><div className='centrar width100'>
            <button data-id={usuario.id} type="button" className="btn btn-delete btn-danger btn-sm">Eliminar</button>
        </div></td>
        <td><div className='centrar width100'>
            <Link to={`/usuarios/${usuario.id}`}>
                <button data-id={usuario.id} type="button" className="btn btn-edit  btn-success btn-sm">Editar</button>
            </Link>
        </div></td>
    </tr>)
}