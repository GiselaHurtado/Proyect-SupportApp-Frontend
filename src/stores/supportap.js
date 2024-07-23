import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// Configurar Axios para incluir credenciales
axios.defaults.withCredentials = true;

export const useRequestStore = defineStore('request', () => {
  const uri = import.meta.env.VITE_API_ENDPOINT_REQUEST;
  const requests = ref([]);
  const isLoading = ref(false);
  const error = ref(null);

  async function fetchRequests() {
    if (isLoading.value || requests.value.length > 0) return; // Previene llamadas repetidas

    try {
      isLoading.value = true;
      error.value = null;
      console.log(`Fetching requests from ${uri}/all`);
      const response = await axios.get(`${uri}/all`);
      console.log('Fetched requests:', response.data);
      requests.value = response.data;
    } catch (err) {
      console.error('Error loading requests:', err);
      error.value = 'Error loading requests: ' + err.message;
    } finally {
      isLoading.value = false;
    }
  }

  async function addRequest(newRequest) {
    try {
      console.log('Sending request:', newRequest);
      isLoading.value = true;
      error.value = null;
      const response = await axios.post(`${uri}`, newRequest);
      console.log('Response:', response.data); 
      requests.value.push(response.data);
      return response.data;
    } catch (err) {
      console.error('Error adding request:', err);
      error.value = 'Error adding request: ' + err.message;
      throw err;
    } finally {
      isLoading.value = false; // Mover esta línea aquí para asegurar que isLoading se actualice correctamente
    }
  }

  async function updateRequest(id, updatedRequest) {
    try {
      isLoading.value = true;
      error.value = null;
      console.log(`Updating request with ID ${updatedRequest.id}`);
      const response = await axios.put(`${uri}/${updatedRequest.id}`, updatedRequest);
      console.log('Updated request:', response.data);
      const index = requests.value.findIndex(req => req.id === updatedRequest.id);
      if (index !== -1) {
        requests.value[index] = response.data;
      }
    } catch (err) {
      console.error('Error updating request:', err);
      error.value = 'Error updating request: ' + err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  const getRequestById = (id) => {
    return requests.value.find(request => request.id === id);
  };

  return { 
    requests, 
    isLoading, 
    error, 
    fetchRequests, 
    addRequest, 
    updateRequest, 
    getRequestById 
  };
});

