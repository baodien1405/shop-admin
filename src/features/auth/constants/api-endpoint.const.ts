export const ApiEndpoint = {
  // Authentication Endpoints
  LOGIN: '/v1/api/shop/login',
  REGISTER: '/v1/api/shop/sign-up',
  REFRESH_TOKEN: '/v1/api/shop/refresh-token',
  LOGOUT: '/v1/api/shop/logout',

  // Product Endpoints
  PRODUCT_LIST: '/v1/api/product',
  UPLOAD_IMAGE_PRODUCT: '/v1/api/product/upload-image',
  DRAFT_PRODUCT_LIST: '/v1/api/product/drafts/all',
  PUBLISHED_PRODUCT_LIST: '/v1/api/product/published/all',
  PUBLISH_PRODUCT: '/v1/api/product/publish/:id',
  UNPUBLISH_PRODUCT: '/v1/api/product/unpublish/:id',
  ADD_PRODUCT: '/v1/api/product',
  EDIT_PRODUCT: '/v1/api/product/:id',
  DELETE_PRODUCT: '/v1/api/product/:id'
}
