import { api } from "../config/apiConfig";

export const SiteService = {
  createSite: async (payload) => {
    try {
      const { data } = await api.post("api/sites", payload);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  updateSite: async (siteId, payload) => {
    try {
      const { data } = await api.put(`api/sites/${siteId}`, payload);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};
