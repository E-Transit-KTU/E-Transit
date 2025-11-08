import api from "./apiClient";

export const getExample = async () => {
  const response = await api.get("/example");
  return response.data;
};
