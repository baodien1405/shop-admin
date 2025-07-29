export interface NotificationInterface {
  _id: string
  notification_type: string
  notification_senderId: string
  notification_receiverId: number
  notification_content: string
  notification_options: {
    shop_name: string
    product_name: string
  }
  createdAt: string
  isRead: boolean
}
