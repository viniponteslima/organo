import { useState, useEffect } from 'react';
import Banner from './components/Banner';
import Formulario from './components/Formulario';
import Time from './components/Time';
import Rodape from './components/Rodape';

function App() {
  const times = [
    {
      nome: 'Programação',
      color1: '#57C278',
    },
    {
      nome: 'Front-End',
      color1: '#82CFFA',
    },
    {
      nome: 'Data Science',
      color1: '#A6D157',
    },
    {
      nome: 'Devops',
      color1: '#E06B69',
    },
    {
      nome: 'UX e Design',
      color1: '#DB6EBF',
    },
    {
      nome: 'Mobile',
      color1: '#FFBA05',
    },
    {
      nome: 'Inovação e Gestão',
      color1: '#FF8A29',
    },
  ];

  const [colaboradores, setColaboradores] = useState(() => {
    const colaboradoresSalvos = localStorage.getItem('colaboradores');
    return colaboradoresSalvos ? JSON.parse(colaboradoresSalvos) : [];
  });

  const aoNovoColaboradorAdicionado = (colaborador) => {
    setColaboradores([...colaboradores, colaborador]);
  };

  useEffect(() => {
    localStorage.setItem('colaboradores', JSON.stringify(colaboradores));
  }, [colaboradores]);

  return (
    <div className="App">
      <Banner />
      <Formulario times={times.map(time => time.nome)} aoColaboradorCadastrado={aoNovoColaboradorAdicionado}/>

      {times.map(time => 
        <Time key={time.nome} nome={time.nome} color={time.color1} 
          colaboradores={colaboradores.filter(colaborador => colaborador.time === time.nome)} 
        />
      )}

      <Rodape />
    </div>
  );
}

export default App;
