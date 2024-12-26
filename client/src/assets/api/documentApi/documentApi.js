import axiosInstance from "../apiConfig";

export const addRegulatoryDocument = async (documentData, fileData) => {
  try {
    const formData = new FormData();
    formData.append("name", documentData.name);
    formData.append("approvalDate", documentData.approvalDate);
    formData.append("description", documentData.description);
    formData.append("file", fileData); 

    const response = await axiosInstance.post("/regulatoryDocuments", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении документа:", error.response?.data || error.message);
    throw error;
  }
};

export const getRegulatoryDocuments = async () => {
  try {
    const response = await axiosInstance.get("/regulatoryDocuments");
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении списка документов:", error.response?.data || error.message);
    throw error;
  }
};

export const searchRegulatoryDocumentByName = async (name) => {
  try {
    const response = await axiosInstance.get(`/regulatoryDocuments/search`, {
      params: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при поиске документа:", error.response?.data || error.message);
    throw error;
  }
};

export const getDocumentFileUrl = (fileName) => {
  return `http://localhost:5000/api/files/${fileName}`; 
};

export const downloadDocumentsHistoryReport = async () => {
  try {
    const response = await axiosInstance.get("/regulatoryDocuments/Downl/Daun", {
      responseType: "blob", 
    });
    return { data: response.data };
  } catch (error) {
    return { error: "Ошибка при скачивании файла." };
  }
};
