export default ({ env })_ => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-azure-storage',
      providerOptions: {
        accountName: env('STORAGE_ACCOUNT_NAME'),
        containerName: env('BLOB_CONTAINER_NAME'),
      },
    },
  },
});