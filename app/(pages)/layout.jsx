"use client";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@heroui/react";
import { useState, useEffect } from "react";
import {
  Bell,
  Briefcase,
  Building,
  CalendarHeart,
  ChevronDown,
  Key,
  LayoutDashboard,
  MessageSquareCode,
  Search,
  Server,
  User,
  Menu,
  X,
} from "lucide-react";

export default function PagesLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex flex-col items-center justify-start w-full h-full bg-default">
      <div className="flex flex-row items-start justify-between w-full p-2 gap-2 bg-white">
        <div className="flex flex-row items-center justify-center h-full gap-2">
          <div className="flex items-start justify-center w-full h-full p-2 gap-2">
            <Image
              src="/logoCompany/com-1.png"
              alt="mascot-1"
              width={75}
              height={75}
            />
          </div>
          <div className="flex flex-col items-start justify-center xl:justify-start w-full h-full p-2">
            <span> Channkorn Engineer</span>
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
                name="email"
                type="text"
                placeholder="Search.."
                variant="faded"
                color="secondary"
                radius="full"
                startContent={<Search />}
                isClearable
                isRequired
              />
            </div>
            <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 bg-default rounded-full">
              <Bell />
            </div>
            <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 bg-default rounded-full">
              <MessageSquareCode />
            </div>
            <div className="flex flex-row items-center justify-center w-96 h-full p-2 gap-2 bg-default rounded-full">
              <div className="flex items-center justify-center aspect-square h-full p-2 gap-2 bg-primary rounded-full relative">
                <Image
                  src="/logoCompany/com-1.png"
                  alt="mascot-1"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
              <div className="flex items-center justify-center w-full h-full p-2 gap-2">
                Channkorn Engineer
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
            <div className="flex flex-col items-start justify-center w-full p-2 gap-2 border-2 border-dark border-dashed">
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

            <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed bg-white">
              <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-2 border-dark border-dashed">
                <div className="flex items-center justify-center h-full p-2 gap-2 border-2 border-dark border-dashed">
                  <LayoutDashboard />
                </div>
                <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                  Dashboard
                </div>
              </div>

              <div className="flex flex-col items-center justify-center w-full gap-2">
                <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                  <div className="flex items-center justify-center h-full p-2 gap-2 border-2 border-dark border-dashed">
                    <User />
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                    Human Resource
                  </div>
                  <div className="flex items-center justify-center h-full p-2 gap-2 border-2 border-dark border-dashed rounded-full bg-default ">
                    <ChevronDown />
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-l-2 border-dark">
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                    Role
                  </div>
                  <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                    Branch
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-2 border-dark border-dashed">
                <div className="flex items-center justify-center h-full p-2 gap-2 border-2 border-dark border-dashed">
                  <Key />
                </div>
                <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-4 border-danger rounded-3xl overflow-auto">
        <div
          className={`${isMobileMenuOpen ? "hidden xl:flex" : "flex"} ${
            isMobile ? "hidden xl:flex" : "flex"
          } flex-col items-center justify-between w-[20%] h-full p-2 gap-2 border-2 border-dark border-dashed rounded-2xl bg-white overflow-auto`}
        >
          <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-2 border-dark border-dashed">
            <div className="flex items-center justify-center h-full p-2 gap-2 border-2 border-dark border-dashed">
              <LayoutDashboard />
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
              Dashboard
            </div>
          </div>

          <div className="flex flex-col items-center justify-center w-full gap-2">
            <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
              <div className="flex items-center justify-center h-full p-2 gap-2 border-2 border-dark border-dashed">
                <User />
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                Human Resource
              </div>
              <div className="flex items-center justify-center h-full p-2 gap-2 border-2 border-dark border-dashed rounded-full bg-default ">
                <ChevronDown />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-full p-2 gap-2 border-l-2 border-dark">
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                Role
              </div>
              <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
                Branch
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full p-2 gap-2 border-2 border-dark border-dashed">
            <div className="flex items-center justify-center h-full p-2 gap-2 border-2 border-dark border-dashed">
              <Key />
            </div>
            <div className="flex items-center justify-start w-full h-full p-2 gap-2 border-2 border-dark border-dashed">
              Logout
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full xl:w-[80%] h-full p-2 gap-2 border-2 border-dark border-dashed rounded-2xl bg-default overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
