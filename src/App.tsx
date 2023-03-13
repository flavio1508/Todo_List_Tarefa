import { type } from 'os';
import React, { useRef, useState } from 'react';
import logo from './logo.svg';

type ITarefa = {
  id: number;
  tarefa: string;
  pronto: boolean
};
function App() {
  const [tarefas, setTarefas] = useState<ITarefa[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const criarTarefa = () => {
    if (inputRef.current) {
      setTarefas([
        { id: Math.random(), tarefa: inputRef.current.value, pronto: false },
        ...tarefas,
      ]);
      inputRef.current.value = "";
    }
  };
  const tornarTarefaPronto=(id:number)=>{
    setTarefas(
      tarefas.map((tarefa)=>({
        id:tarefa.id,
        tarefa:tarefa.tarefa,
        pronto:tarefa.id === id ? !tarefa.pronto : tarefa.pronto,
      }))
    )
  };
  const deletarTarefa = (id:number)=>{
    setTarefas(tarefas.filter((tarefa)=> tarefa.id !==id))
  };
  return (
    <div className="min-h-screen bg-slate-700 flex items-center justify-center">
      <div className='bg-slate-200 p-4 rounded-lg'>
        <h1>Tarefa</h1>
        {tarefas.length > 0 && (<div className='bg-slate-700 p-2 rounded-md flex flex-col gap-4'>
          {tarefas.map((tarefa) =>
            <div className='bg-slate-200 p-2 rounded-md flex justify-between gap-3' key={tarefa.id}>
              <span className={tarefa.pronto?"line-through font-bold text-emerald-100": ""}>{tarefa.tarefa}</span>
              <div>
                <button onClick={()=> tornarTarefaPronto(tarefa.id)} className={tarefa.pronto ? "bg-emerald-800": "bg-slate-800"}>Pronto</button>
                <button onClick={()=> deletarTarefa(tarefa.id)} className='bg-red-800 ml-3'>Deletar</button>
              </div>
            </div>)}
        </div>)}

        <form onSubmit={(e) => {
          e.preventDefault();
          criarTarefa();
        }}>
          <input ref={inputRef} type="text" required />
          <button className='bg-emerald-800'>Criar tarefa</button>
        </form>
      </div>
    </div>

  );
}

export default App;
