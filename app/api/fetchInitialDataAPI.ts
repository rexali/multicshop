export const fetchInitialDataAPI = async (url: string) => {
    try {
      let data = await fetch(url).then(res => res.json());
      if (data.data === null) {
        return {};
      }
      return data.data;
    } catch (error) {
      console.warn(error);
    }
  }