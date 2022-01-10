import Login from "./screens/login";
import Signup from "./screens/signup";
import ResetPassword from "./screens/resetpassword";
import CodeVerify from "./screens/codeverify";
import SetPassword from "./screens/setpassword";
import { slice } from "./actions";

export const slices = ["Auth", slice];
export const navigators = [
  ["Login", Login],
  ["Signup", Signup],
  ["ResetPassword", ResetPassword],
  ["CodeVerify", CodeVerify],
  ["SetPassword", SetPassword],
];

export default {
  slices: slices,
  navigators: navigators
}
