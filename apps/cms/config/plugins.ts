export default ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-azure-storage',
      providerOptions: {
        authType: 'msi',
        account: env('STORAGE_ACCOUNT_NAME'),
        containerName: env('BLOB_CONTAINER_NAME'),
      },
    },
  },
});