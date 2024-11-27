import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerificarAutenticacao(Componente) {

  return function RotaProtegida(propriedades) {
    const router = useRouter();
    const [autenticado, setAutenticado] = useState(false);

    // Checa o token e redireciona caso não exista.
    useEffect(() => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        router.push("/login");
      } else {
        setAutenticado(true);
      }

    }, [router]);

    if (!autenticado) {
      return null;
    }

    return <Componente {...propriedades} />;
  }
};
