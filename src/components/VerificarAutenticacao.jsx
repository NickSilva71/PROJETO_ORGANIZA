import { useRouter } from "next/router";
import { useEffect } from "react";

export default function VerificarAutenticacao(Componente) {

  return function RotaProtegida(propriedades) {
    const router = useRouter();

    // Checa o token e redireciona caso não exista.
    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
      }

    }, [router]);

    return <Componente {...propriedades} />;
  }
};
