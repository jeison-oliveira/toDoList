import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Status {
  emAndamento = 0,
  finalizada,
}

export interface Atividade {
  id: string;
  descricao: string;
  status: Status;
}

interface ApiState {
  atividades: Atividade[];
}

const initialState: ApiState = {
  atividades: [],
};

let exists = (atividades: Atividade[], atividade: Atividade) => {
  for (let i = 0; i < atividades.length; i++) {
    if (
      atividades[i].id === atividade.id ||
      atividades[i].descricao === atividade.descricao
    )
      return true;
  }
  return false;
};
let add = (atividades: Atividade[], atividade: Atividade) => {
  // atividades.pop();
  atividades.push({ ...atividade, descricao: atividade.descricao.trim() });
};
let remove = (atividades: Atividade[], id: string) => {
  for (let i = 0; i < atividades.length; i++) {
    if (atividades[i].id === id) atividades.splice(i, 1);
  }
};
let finish = (atividades: Atividade[], id: string) => {
  for (let i = 0; i < atividades.length; i++) {
    if (atividades[i].id === id) atividades[i].status = Status.finalizada;
  }
};

const apiAtividadeSlice = createSlice({
  name: "apiAtividade",
  initialState,
  reducers: {
    addAtividade(state, action: PayloadAction<Atividade>) {
      if (!exists(state.atividades, action.payload))
        add(state.atividades, action.payload);
    },
    remAtividade(state, action: PayloadAction<string>) {
      remove(state.atividades, action.payload);
    },
    finAtividade(state, action: PayloadAction<string>) {
      finish(state.atividades, action.payload);
    },
  },
});
export const { addAtividade, remAtividade, finAtividade } =
  apiAtividadeSlice.actions;
export const { reducer: apiAtividadeReducer } = apiAtividadeSlice;
