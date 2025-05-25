import api from './api';

export const salvarObra = (obra) => api.post('', obra); 

export const listarObras = () => api.get('');

export const excluirObra = (id) => api.delete(`/${id}`);

export const editarDescricao = (id, descricao) => 
  api.put(`/${id}/descricao`, descricao, {
    headers: { 'Content-Type': 'text/plain' }
  });
  
export const buscarPorTitulo = (titulo) => api.get(`/busca?titulo=${titulo}`);
