import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });


// Registros
export const fetchRegistros = async (userId) => {
  return await api.get(`/registros?userId=${userId}`);
};

export const createRegistro = async (registro) => {
  return await api.post("/registros", registro);
};

export const deleteRegistro = async (id) => {
  return await api.delete(`/registros/${id}`);
};

export const updateRegistro = async (id, registro) => {
  return await api.put(`/registros/${id}`, registro);
};

// orçamento
export const fetchBudgetData = async (userId) => {
  return await api.get(`/orcamento?userId=${userId}`);
};

export const createBudget = async (data) => {
  return await api.post("/orcamento", data);
};

export const updateBudget = async (id, data) => {
  return await api.put(`/orcamento/${id}`, data);
};

export const deleteBudget = async (id) => {
  return await api.delete(`/orcamento/${id}`);
};


export const fetchInvestimentos = async (userId) => {
  return await api.get(`/investimentos?userId=${userId}`);
};

export const fetchNotificacoes = async (userId) => {
  return await api.get(`/notifications?userId=${userId}`);
};