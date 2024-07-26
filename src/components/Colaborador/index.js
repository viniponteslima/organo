import { useState } from 'react';
import './Colaborador.css';

const Colaborador = (props) => {
  const propColor = props.color;
  const [isExcluded, setIsExcluded] = useState(false);
  const [confirmExclusao, setConfirmExclusao] = useState(false);
  const [isEditando, setIsEditando] = useState(false);
  const [nomeEditado, setNomeEditado] = useState(props.colaborador.nome);
  const [cargoEditado, setCargoEditado] = useState(props.colaborador.cargo);
  const [imagemEditada, setImagemEditada] = useState(props.colaborador.imagem);
  const [timeEditado, setTimeEditado] = useState(props.colaborador.time);
  const { colaborador } = props;

  const handleExcluirColaborador = () => {
    setConfirmExclusao(true);
  };

  const confirmarExclusao = () => {
    const colaboradoresSalvos = JSON.parse(localStorage.getItem('colaboradores'));
    const novosColaboradores = colaboradoresSalvos.filter(c => c.nome !== colaborador.nome);
    localStorage.setItem('colaboradores', JSON.stringify(novosColaboradores));
    setIsExcluded(true);
    setConfirmExclusao(false);
    window.location.reload();
  };

  const cancelarExclusao = () => {
    setConfirmExclusao(false);
  };

  const handleEditarColaborador = () => {
    setIsEditando(!isEditando);
  };

  const confirmarEdicao = () => {
    const colaboradoresSalvos = JSON.parse(localStorage.getItem('colaboradores'));
    const index = colaboradoresSalvos.findIndex(c => c.nome === colaborador.nome);
    colaboradoresSalvos[index].nome = nomeEditado;
    colaboradoresSalvos[index].cargo = cargoEditado;
    colaboradoresSalvos[index].imagem = imagemEditada;
    colaboradoresSalvos[index].time = timeEditado;
    localStorage.setItem('colaboradores', JSON.stringify(colaboradoresSalvos));
    setIsEditando(false);
  };

  const cancelarEdicao = () => {
    setIsEditando(false);
    setNomeEditado(colaborador.nome);
    setCargoEditado(colaborador.cargo);
    setImagemEditada(colaborador.imagem);
    setTimeEditado(colaborador.time);
  };

  const handleNomeChange = (e) => {
    setNomeEditado(e.target.value);
  };

  const handleCargoChange = (e) => {
    setCargoEditado(e.target.value);
  };

  const handleImagemChange = (e) => {
    setImagemEditada(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeEditado(e.target.value);
  };

  return (
    <div className={`colaborador ${isExcluded ? 'excluido' : ''}`}>
      {!isExcluded && (
        <>
          <div className='cabecalho' style={{ backgroundColor: propColor }}>
            <img src={colaborador.imagem} alt={colaborador.nome} />
          </div>
          <div className='rodape'>
            {!isEditando ? (
              <>
                <h4>{colaborador.nome}</h4>
                <h5>{colaborador.cargo}</h5>
              </>
            ) : (
              <>
                <form>
                  <input type="text" value={nomeEditado} onChange={handleNomeChange} />
                  <input type="text" value={cargoEditado} onChange={handleCargoChange} />
                  <input type="text" value={imagemEditada} onChange={handleImagemChange} />
                  <input type="text" value={timeEditado} onChange={handleTimeChange} />
                </form>
              </>
            )}
            <div className='edit-delete'>
              {!isEditando ? (
                <button title='Edit' className='edit' onClick={handleEditarColaborador}>✎</button>
              ) : (
                <>
                  <button onClick={confirmarEdicao}>✔</button>
                  <button onClick={cancelarEdicao}>✘</button>
                </>
              )}
              <button title='Delete' className='delete' onClick={handleExcluirColaborador}>X</button>
            </div>
          </div>
          {confirmExclusao && (
            <div className="delete-container">
              <div className="delete-content">
                <p>Deseja excluir <strong>{colaborador.nome}</strong> do time <strong>{colaborador.time}</strong>?</p>
                <button onClick={confirmarExclusao}>✘ Excluir</button>
                <button onClick={cancelarExclusao}>✔ Manter</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Colaborador;
