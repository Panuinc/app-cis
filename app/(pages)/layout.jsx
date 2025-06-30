"use client";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@heroui/react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  Building,
  CalendarHeart,
  ChevronDown,
  Computer,
  Key,
  LayoutDashboard,
  MessageCircleMore,
  Search,
  Server,
  User,
  Menu,
  X,
} from "lucide-react";

export default function PagesLayout({ children }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const defaultOpenMenus = {};
    menuData.forEach((menu) => {
      if (menu.children?.some((child) => pathname.startsWith(child.href))) {
        defaultOpenMenus[menu.key] = true;
      }
    });
    setOpenMenus(defaultOpenMenus);
  }, [pathname]);

  const menuData = [
    {
      key: "dashboard",
      icon: <LayoutDashboard />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      key: "hr",
      icon: <User />,
      label: "HR",
      children: [
        { label: "Role", href: "/hr/role" },
        { label: "Branch", href: "/hr/branch" },
        { label: "Division", href: "/hr/division" },
        { label: "Department", href: "/hr/department" },
        { label: "Position", href: "/hr/position" },
        { label: "Employee", href: "/hr/employee" },
      ],
    },
    {
      key: "it",
      icon: <Computer />,
      label: "IT",
      children: [
        { label: "Back Up", href: "/it/backup" },
        { label: "Repair", href: "/it/repair" },
      ],
    },
    {
      key: "logout",
      icon: <Key />,
      label: "Logout",
      href: "/logout",
    },
  ];

  const renderSidebarMenu = () =>
    menuData.map((menu, index) => {
      const isOpen = openMenus[menu.key];

      const toggleMenu = () => {
        setOpenMenus((prev) => ({
          ...prev,
          [menu.key]: !prev[menu.key],
        }));
      };

      const MenuWrapper = ({ children, href }) =>
        href ? (
          <Link href={href} className="w-full">
            {children}
          </Link>
        ) : (
          <div className="w-full">{children}</div>
        );

      const isActive =
        (menu.href && pathname.startsWith(menu.href)) ||
        menu.children?.some((child) => pathname.startsWith(child.href));

      return (
        <div key={index} className="w-full flex flex-col items-center gap-2">
          <MenuWrapper href={menu.href}>
            <div
              className={`flex flex-row items-center justify-center w-full h-full p-2 gap-2 ${
                menu.children ? "cursor-pointer" : ""
              } ${isActive ? "bg-default rounded-full" : ""}`}
              onClick={menu.children ? toggleMenu : undefined}
            >
              <div className="flex items-center justify-center h-full p-2 gap-2">
                {menu.icon}
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2">
                {menu.label}
              </div>
              {menu.children && (
                <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 rounded-full bg-default">
                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          </MenuWrapper>

          {menu.children && isOpen && (
            <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-l-2 border-default">
              {menu.children.map((child, cIdx) => {
                const isChildActive = pathname.startsWith(child.href);
                return (
                  <Link
                    key={cIdx}
                    href={child.href}
                    className={`flex items-center justify-start w-full h-full p-3 gap-2 ${
                      isChildActive ? "bg-default rounded-full" : ""
                    }`}
                  >
                    {child.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    });

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-start w-full h-full bg-white">
      <div className="flex flex-row items-start justify-between w-full p-2 gap-2 bg-white">
        <div className="flex flex-row items-center justify-center h-full gap-2">
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Image
              src="/logoCompany/com-1.png"
              alt="mascot-1"
              width={75}
              height={75}
              priority
            />
          </div>
          <div className="flex flex-col items-start justify-center xl:justify-start w-full h-full p-2">
            <span> Channkorn{""}Engineer</span>
            <span className="text-xs text-dark/50"> Internal System</span>
          </div>
        </div>

        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden flex items-center justify-center aspect-square h-full p-2 gap-2"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        )}

        <div
          className={`${isMobile ? "hidden xl:flex" : "flex"} ${
            isMobileMenuOpen ? "hidden" : "flex"
          } flex-col items-center justify-center w-full h-full gap-2`}
        >
          <div className="flex flex-row items-center justify-center w-full h-[68px] p-2 gap-2">
            <div className="flex items-center justify-center w-full h-full p-2 gap-2 bg-default rounded-full">
              <Input
                name="search"
                placeholder="Search.."
                variant="faded"
                color="default"
                radius="full"
                startContent={<Search />}
              />
            </div>
            <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 bg-default rounded-full">
              <Bell />
            </div>
            <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 bg-default rounded-full">
              <MessageCircleMore />
            </div>
            <div className="flex flex-row items-center justify-center w-96 h-full p-2 gap-2 bg-default rounded-full">
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 bg-primary rounded-full relative">
                <Image
                  src="/logoCompany/com-1.png"
                  alt="mascot-1"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                  priority
                />
              </div>
              <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                Admin Channkorn
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-start w-full h-full p-2 gap-2">
            <Link
              href="https://channakorn.co.th/"
              target="_blank"
              className="flex items-center justify-center h-full p-2 gap-2 hover:border-b-2 hover:border-default"
            >
              <Building /> Channakorn Home
            </Link>
            <Link
              href="http://49.0.64.242:8023/Main/"
              target="_blank"
              className="flex items-center justify-center h-full p-2 gap-2 hover:border-b-2 hover:border-default"
            >
              <Briefcase /> Channakorn CNE
            </Link>
            <Link
              href="http://cnecloud01.myqnapcloud.com:8011/cgi-bin/"
              target="_blank"
              className="flex items-center justify-center h-full p-2 gap-2 hover:border-b-2 hover:border-default"
            >
              <Server /> Channakorn Clound
            </Link>
            <Link
              href="http://49.0.64.242:8088/LoginERS/login.aspx"
              target="_blank"
              className="flex items-center justify-center h-full p-2 gap-2 hover:border-b-2 hover:border-default"
            >
              <CalendarHeart /> Channakorn Leave
            </Link>
          </div>
        </div>
      </div>

      {isMobile && isMobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-50 mt-24 bg-white overflow-auto">
          <div className="flex flex-col items-center justify-center w-full p-2 gap-2 border-4 border-danger">
            <div className="flex flex-col items-start justify-center w-full p-2 gap-2">
              <Link
                href="https://channakorn.co.th/"
                target="_blank"
                className="flex items-center justify-center h-full p-2 gap-2 hover:border-b-2 hover:border-default"
              >
                <Building /> Channakorn Home
              </Link>
              <Link
                href="http://49.0.64.242:8023/Main/"
                target="_blank"
                className="flex items-center justify-center h-full p-2 gap-2 hover:border-b-2 hover:border-default"
              >
                <Briefcase /> Channakorn CNE
              </Link>
              <Link
                href="http://cnecloud01.myqnapcloud.com:8011/cgi-bin/"
                target="_blank"
                className="flex items-center justify-center h-full p-2 gap-2 hover:border-b-2 hover:border-default"
              >
                <Server /> Channakorn Clound
              </Link>
              <Link
                href="http://49.0.64.242:8088/LoginERS/login.aspx"
                target="_blank"
                className="flex items-center justify-center h-full p-2 gap-2 hover:border-b-2 hover:border-default"
              >
                <CalendarHeart /> Channakorn Leave
              </Link>
            </div>

            <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 bg-white">
              {renderSidebarMenu()}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-center w-full h-full gap-2 border-2 border-default rounded-3xl overflow-auto">
        <div
          className={`${isMobileMenuOpen ? "hidden xl:flex" : "flex"} ${
            isMobile ? "hidden xl:flex" : "flex"
          } flex-col items-center justify-start w-[15%] h-full p-2 gap-2 rounded-2xl bg-white overflow-auto`}
        >
          {renderSidebarMenu()}
        </div>
        <div className="flex flex-col items-center justify-start w-full xl:w-[85%] h-full p-4 gap-2 rounded-3xl bg-default overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
