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
    { href: "/dashboard", icon: <FaChartLine />, label: "Dashboard" },
    {
      href: "/income-expenses",
      icon: <FaWallet />,
      label: "Income & Expenses",
    },
    { href: "/budget", icon: <FaClipboardList />, label: "Budget" },
    { href: "/investments", icon: <FaDollarSign />, label: "Investments" },
    { href: "/notifications", icon: <FaBell />, label: "Notifications" },
  ];

  return (
    <div
      className="
      bg-teal-600 text-white
      flex fixed
      flex-row        md:flex-col 
      justify-between md:justify-normal 
      p-2             md:px-2 md:py-6 md:gap-1
      bottom-0 md:h-screen md:w-48 w-full"
    >
      {menuItems.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className="
          flex flex-col 
          md:flex-row md:gap-2
          items-center
          justify-center md:justify-normal
         hover:bg-teal-950 p-2 rounded-lg"
        >
          {item.icon}
          <span className="text-xs mt-1 hidden md:block">{item.label}</span>
        </Link>
      ))}
    </div>
  );
}