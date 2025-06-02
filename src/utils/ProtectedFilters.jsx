import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import Filters from "../Blocks/Filters/Filters";

function ProtectedFilters() {
  if (!isAuthenticated()) {
    // перенаправляем на страницу входа
    return <Navigate to="/account" />;
  }
  return <Filters />;
}
export default ProtectedFilters;
