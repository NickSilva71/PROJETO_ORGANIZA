import Image from "next/image";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Cadastro() {
  return (
    <div className="flex flex-col font-medium text-2xl text-center p-6 max-w-fit m-auto border-r-2 border-b-2 border-teal-600 bg-teal-100 rounded-xl shadow-lg">
      <h1>Pagina de Cadastro</h1>
    </div>
  
  );
}

