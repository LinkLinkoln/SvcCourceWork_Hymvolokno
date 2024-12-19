import axiosInstance from "../apiConfig";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/employees/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post("/employees/register", {
      name: formData.name,
      lastName: formData.lastName,
      fatherName: formData.fatherName,
      position: formData.position,
      phone: formData.phone,
      email: formData.email,
      role: formData.role,
      password: formData.password,
    });
    return { data: response.data };
  } catch (error) {
    if (error.response) {
      const message = error.response.data?.message;
      return { error: message || "Registration failed" };
    } else {
      return { error: "An unexpected error occurred. Please try again." };
    }
  }
};

