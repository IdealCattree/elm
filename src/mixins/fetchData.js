export default {
  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    async fetchData() {
      this.isLoading = true;
      this.getData && (await this.getData());
      this.isLoading = false;
    },
  },

  async created() {
    await this.fetchData();
  },
};
