import { ApiEndpoint } from '@/features/auth/constants'
import { ProductFiltersPayloadInterface, ProductInterface } from '@/features/product/models'
import { ListResponse, ListResponseInterface, SuccessResponse } from '@/features/shared/models'
import { axiosClient } from '@/features/shared/utils'

class ProductService {
  async getAllDrafts(params: ProductFiltersPayloadInterface) {
    const result = await axiosClient.get<SuccessResponse<ListResponseInterface<ProductInterface>>>(
      ApiEndpoint.DRAFT_PRODUCT_LIST,
      {
        params,
        paramsSerializer: {
          indexes: null
        }
      }
    )

    return new ListResponse<ProductInterface>(result.data.metadata)
  }

  async getAllPublished(params: ProductFiltersPayloadInterface) {
    const result = await axiosClient.get<SuccessResponse<ListResponseInterface<ProductInterface>>>(
      ApiEndpoint.PUBLISHED_PRODUCT_LIST,
      {
        params,
        paramsSerializer: {
          indexes: null
        }
      }
    )

    return new ListResponse<ProductInterface>(result.data.metadata)
  }

  uploadImage(formData: FormData) {
    return axiosClient.post<SuccessResponse<string>>(ApiEndpoint.UPLOAD_IMAGE_PRODUCT, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  publish(id: string) {
    return axiosClient.post<SuccessResponse<number>>(ApiEndpoint.PUBLISH_PRODUCT.replace(':id', id))
  }

  unpublish(id: string) {
    return axiosClient.post<SuccessResponse<number>>(ApiEndpoint.UNPUBLISH_PRODUCT.replace(':id', id))
  }

  // get(id: string) {
  //   const apiEndpoint = ApiEndpoints.StaffDetail.replace('{id}', id);
  //   return axiosClient.get<StaffInterface>(apiEndpoint);
  // }

  add(body: Partial<ProductInterface>) {
    return axiosClient.post(ApiEndpoint.ADD_PRODUCT, body)
  }

  edit({ _id, ...body }: Partial<ProductInterface>) {
    return axiosClient.patch(ApiEndpoint.EDIT_PRODUCT.replace(':id', _id as string), body)
  }

  delete(id: string) {
    return axiosClient.delete(ApiEndpoint.DELETE_PRODUCT.replace(':id', id))
  }

  // import(payload: FormData) {
  //   return axiosClient.post<ImportStaffResponseInterface>(ApiEndpoints.ImportStaff, payload, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   });
  // }

  // export(params: StaffFiltersParamsType) {
  //   return axiosClient.get(ApiEndpoints.ExportStaff, {
  //     params,
  //     responseType: 'blob',
  //   });
  // }
}

const productServiceInstance = new ProductService()

export default productServiceInstance
