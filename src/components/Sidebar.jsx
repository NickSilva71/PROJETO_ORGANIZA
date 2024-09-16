import {
  FaChartLine,
  FaWallet,
  FaClipboardList,
  FaDollarSign,
  FaBell,
} from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { href: "/painel_principal", icon: <FaChartLine />, label: "Painel Principal" },
    { href: "/receitas", icon: <FaWallet />, label: "Receitas e Despesas",},
    { href: "/orcamento", icon: <FaClipboardList />, label: "Orçamento" },
    { href: "/investimentos", icon: <FaDollarSign />, label: "Investimentos" },
    { href: "/notificacoes", icon: <FaBell />, label: "Notificações" },
  ];

  return (
    <div
      className="
        bg-teal-600 text-white
        flex fixed bottom-0 w-full
        flex-row        md:flex-col 
        justify-between md:justify-normal 
        p-2             md:px-2 md:py-6 md:gap-1
                        md:h-screen md:w-48
      "
    >
      {menuItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="
            flex p-2 rounded-lg items-center
            flex-col       md:flex-row md:gap-2
            justify-center md:justify-normal
            hover:bg-teal-950 
          "
        >
          {item.icon}
          <span className="text-xs mt-1 hidden md:block">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}
