import { UserDocument } from '../User';
import { Profile } from '../../graphql.types';

export const prepareProfile = (item: UserDocument): Profile => {
  if (!item) return null;

  const raw = item.toObject();
  return {
    id: raw._id.toString(),
    firstName: raw.firstName,
    lastName: raw.lastName,
    email: raw.email,
    phone: raw.phone,
    signUpDate: raw.signUpDate,
    age: raw.age,
    gender: raw.gender,
    role: raw.role,
  };
};
