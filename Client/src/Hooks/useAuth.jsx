import { useContext } from "react";
import {UserContext} from "../Context/UserContext.jsx";

export const useAuth = () => useContext(UserContext);
