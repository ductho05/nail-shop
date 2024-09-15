import { SEX } from "@/enum/User.enum";

export default interface User {
  firstName?: string;
  lastName?: string;
  role?: string;
  sex?: SEX;
  email?: string;
  facebookId?: string;
  isActive?: boolean;
  addresses?: Array<string>;
}
