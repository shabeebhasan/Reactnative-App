import Auth from "./auth";

export const initialRoute = 'Login';
export const slices = [Auth.slices];
export const navigators = [...Auth.navigators];
