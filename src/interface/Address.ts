export default interface Address {
  nameCustomer: string;
  phoneNumber: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  idUser?: string;
  _id?: string
}

export interface Province {
  province_id: string;
  province_name: string;
  province_type: string
}

export interface District {
  district_id: string;
  district_name: string;
  district_type: string
}

export interface Ward {
  ward_id: string;
  ward_name: string;
  ward_type: string
}
