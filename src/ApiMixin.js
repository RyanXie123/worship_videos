import axios from 'axios';

export default {
  methods: {
    async callApi(path, method, data) {
      try {
        const response = await axios.request({
          url: `https://alpha.jiuxingtang.online/${path}`,
          method,
          data,
        });
        return response.data;
      } catch (error) {
        // 处理错误
        console.error(error);
        throw error;
      }
    },
  },
};