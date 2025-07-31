import { ApiEndpoint } from '@/features/auth/constants'
import { DiscountFiltersParamsType, DiscountInterface } from '@/features/discount/models'
import { ListResponse, ListResponseInterface, SuccessResponse } from '@/features/shared/models'
import { axiosClient } from '@/features/shared/utils'

class DiscountService {
  async getAll(params: DiscountFiltersParamsType) {
    const result = await axiosClient.get<SuccessResponse<ListResponseInterface<DiscountInterface>>>(
      ApiEndpoint.DISCOUNT_LIST,
      {
        params,
        paramsSerializer: {
          indexes: null
        }
      }
    )

    return new ListResponse<DiscountInterface>(result.data.metadata)
  }
}

const discountServiceInstance = new DiscountService()

export default discountServiceInstance
