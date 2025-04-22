import axios from "axios";

export default class apiDataController {
  private header = {
    headers: {
      "app-AUTH": "",
      "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
    },
  };

  constructor(token?: string) {
    this.header = {
      headers: {
        "app-AUTH": `SJWT ${token}`,
        "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
      },
    };
  }

  getDataApi = async (url: any) => {
    try {
      const { data } = await axios.get(url, {
        maxContentLength: Infinity,
      });
      return data;
    } catch (e) {
      throw e;
    }
  };
  GetApi = async (url: any) => {
    try {
      const { data } = await axios.get(url, {
        maxContentLength: Infinity,
      });
      return data;
    } catch (e) {
      throw e;
    }
  };
  GetApiWithToken = async (url: any) => {
    try {
      const { data } = await axios.get(url, this.header);
      return data;
    } catch (e) {
      throw e;
    }
  };

  PostDataApi = async (url: any, value: any) => {
    try {
      const { data } = await axios.post(url, value);
      return data;
    } catch (e) {
      throw e;
    }
  };
  PatchDataApi = async (url: any, value: any) => {
    try {
      const { data } = await axios.patch(url, value);
      return data;
    } catch (e) {
      throw e;
    }
  };
  DeleteDataApi = async (url: any) => {
    try {
      const { data } = await axios.delete(url, this.header);
      return data;
    } catch (e) {
      throw e;
    }
  };

  DeleteApiWithToken = async (url: any) => {
    try {
      const { data } = await axios.delete(url, this.header);
      return data;
    } catch (e) {
      throw e;
    }
  };

  PostApiWithToken = async (url: any, value: any) => {
    try {
      const { data } = await axios.post(url, value, this.header);
      return data;
    } catch (e) {
      throw e;
    }
  };
  PatchApiWithToken = async (url: any, value: any) => {
    try {
      const { data } = await axios.patch(url, value, this.header);
      return data;
    } catch (e) {
      throw e;
    }
  };
}
