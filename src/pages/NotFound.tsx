import { Link } from "react-router";
import { Paths } from "../routes/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 p-4 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <p className="text-gray-600">La página que buscas no existe</p>
      <Link
        to={Paths.dashboard}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
