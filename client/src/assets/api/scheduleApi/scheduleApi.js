import axiosInstance from '../apiConfig'; // Импорт вашего axiosInstance

const getConfig = async () => {
    try {
      const response = await axiosInstance.get("/config");
      console.log("Config:", response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Ошибка при получении конфигурации:", error.response.data.message);
      } else {
        console.error("Ошибка при запросе на сервер:", error.message);
      }
    }
  };
  
  // Обновление конфигурации
  const updateConfig = async (configId, newConfigData) => {
    try {
      const response = await axiosInstance.put(`/config/${configId}`, newConfigData);
      console.log("Конфигурация обновлена:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Ошибка при обновлении конфигурации:", error.response.data.message);
      } else {
        console.error("Ошибка при запросе на сервер:", error.message);
      }
    }
  };
  
  // Создание новой конфигурации
  const createConfig = async (newConfigData) => {
    try {
      const response = await axiosInstance.post("/config", newConfigData);
      console.log("Конфигурация успешно создана:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Ошибка при создании конфигурации:", error.response.data.message);
      } else {
        console.error("Ошибка при запросе на сервер:", error.message);
      }
    }
  };
  
  // Удаление конфигурации
  const deleteConfig = async (configId) => {
    try {
      const response = await axiosInstance.delete(`/config/${configId}`);
      console.log("Конфигурация удалена:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Ошибка при удалении конфигурации:", error.response.data.message);
      } else {
        console.error("Ошибка при запросе на сервер:", error.message);
      }
    }
  };
  
  export { getConfig, updateConfig, createConfig, deleteConfig };