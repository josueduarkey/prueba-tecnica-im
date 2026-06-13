import { FormLogin } from "../components/login/FormLogin";
import { Carousel } from "../components/ui/Carousel";

const slides = [
  { src: "/assets/imagen-1.png", alt: "Imagen de Impresos Múltiples" },
  { src: "/assets/imagen-2.png", alt: "Imagen de Impresos Múltiples" },
  { src: "/assets/imagen-3.jpg", alt: "Imagen de Impresos Múltiples" },
  { src: "/assets/imagen-4.png", alt: "Imagen de Impresos Múltiples" },
];

export default function Login() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-primary-dark lg:block">
        <Carousel slides={slides} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-white/70">
            Impresos Múltiples
          </span>
          <h1 className="mt-5 max-w-md text-3xl font-semibold leading-tight">
            Gestiona los proyectos de tu organización con seguridad y rapidez.
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center bg-primary-light p-6 sm:p-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center gap-4 text-center">
            <img src="/impresos-multiples.png" alt="Logo" className="mx-auto w-64" />
            <p className="text-lg text-gray-500">Sistema de Gestión de Proyectos</p>
          </div>
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
