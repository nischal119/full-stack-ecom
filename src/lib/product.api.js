import { $axios } from "./axios";

const fetchSellerProducts = async (paginationData) => {
  const response = await $axios.post("/product/seller/all", paginationData);
  return response;
};
export { fetchSellerProducts };

export const deleteProduct = async (_id) => {
  return await $axios.delete(`/product/delete/${_id}`);
};

export const addProduct = async (values) => {
  return await $axios.post("/product/add", values);
};

export const getBuyerProducts = async (paginationData) => {
  return await $axios.post("/product/buyer/all", paginationData);
};
export const getProductDetails = async (id) => {
  return await $axios.get(`/product/details/${id}`);
};

export const editProduct = async (productId, values) => {
  return await $axios.put(`/product/edit/${productId}`, values);
};
