export enum SEX {
  MALE = "male",
  FEMALE = "female",
}

export enum PAYMENT_METHOD {
  BANK_TRANSFER = "BANK_TRANSFER",
}

export enum AUTH_MESSAGE_ERROR {
  ERROR_LOGIN = "Vui lòng đăng nhập để có thể truy cập!",
  ERROR_EXPRIEED = "Đã hết phiên. Vui lòng đăng nhập lại!",
  ERROR_LOGGED_IN = "Tài khoản của bạn đã được đăng nhập!",
}

export enum TYPE_ERROR {
  TOKEN_EXPRIED = "TokenExpired",
  NOT_LOGIN = "NotLoggedIn",
  IS_LOGGED_IN = "IsLoggedIn",
}

export enum TYPE_CONTROLL {
  CHOOSE_ADDRESS = "choose-address"
}

export enum ORDER_STATUS {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ORDER_STATUS_VN {
  PENDING = 'Chờ thanh toán',
  PAID = 'Đã thanh toán',
  PROCESSING = 'Đang giao',
  COMPLETED = 'Hoàn thành',
  CANCELLED = 'Đã huỷ',
}
