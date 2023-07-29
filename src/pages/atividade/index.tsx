import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Status, addAtividade, remAtividade, finAtividade} from "../../redux/features/atividade.slice";
import { AppDispatch, RootState } from "../../redux/store";
import "./index.css";
import { v4 as uuidv4 } from "uuid";

export default function Atividade() {
  const atividade = useSelector((state: RootState) => state.atividade);

  const dispatch = useDispatch<AppDispatch>();

  const [inputAtividade, SetAtividade] = useState({
    id: "",
    descricao: "",
    status: Status.emAndamento
  });

  const handleInput = (e: any) => {
    SetAtividade({ ...inputAtividade, descricao: e.target.value });
  };
  
  const handleAdd = (e: any) => {   
    SetAtividade({ ...inputAtividade, id: uuidv4() });
    dispatch(addAtividade(inputAtividade));
  };
  
  const handleDel = (e: any) => {
    dispatch(remAtividade(e.target.id));
  };
  
  const handleDone = (e: any) => {   
    dispatch(finAtividade(e.target.id));
  };

  return (
    <div className="container">
      <div className="row text-center">
        <div className="col-12">
          <h1>React Todo App</h1>
        </div>       
        <div className="col-9">
          <input
            type="text"
            className="form-control"
            name="descricao"
            value={inputAtividade.descricao}
            onChange={handleInput} />
        </div>
        <div className="col-3">
          <button type="submit" className="btn btn-primary bnt-lg" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
        <ul className="list-group row">
          {atividade.atividades.map((atividade, index) => {
            if(atividade.status === Status.emAndamento) {
              return ( 
                  <li className="list-group-item col-12" key={index}> 
                    {atividade.descricao}
                    <a className="icon-link text-success" href="#!" onClick={handleDone}>
                      <i className="bi bi-check-circle-fill" id={atividade.id}></i>
                    </a>
                    <a className="icon-link col-2 text-danger" href="#!" onClick={handleDel}>
                      <i className="bi bi-x-circle" id={atividade.id}></i>
                    </a>     
                  </li>
              )          
            } else {
              return ( 
                <li className="list-group-item " key={index}> 
                  <del>
                  {atividade.descricao} 
                  </del>
                </li>
              ) 
            }
          })}
        </ul>
    </div>
  );
}