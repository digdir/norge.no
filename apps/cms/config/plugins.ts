export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-azure-storage',
      providerOptions: {
        connectionString: env('STORAGE_CONNECTION_STRING'),
        containerName: env('STORAGE_CONTAINER_NAME'),
        // ... other options
      },
    },
  },
});
