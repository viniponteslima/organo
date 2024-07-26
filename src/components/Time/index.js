import Colaborador from '../Colaborador'
import './Time.css'

const Time = (props) => {
    return (
        (props.colaboradores.length > 0) && <section className='time' style={{ backgroundColor: `${props.color}33` }}>
            <h3 style={{ borderColor: props.color }}>{props.nome}</h3>
            {props.colaboradores.map( colaborador => <Colaborador key={colaborador} colaborador={colaborador} color={props.color} />)}
        </section>
    )
}

export default Time