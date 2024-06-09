import { useEffect, useState, useRef } from "react";
import DashboardHome from "../components/outbound/DashboardHome";
import EmailTab from "../components/outbound/EmailTab";
import { OutboundTab } from "../components/outbound/OutboundTab";

export default function OutboundDasboard() {
  let DashboardHomeRef = useRef();
  let EmailTabRef = useRef();
  let OutboundTabRef = useRef();
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedTabHeader, setSelectedTabHeader] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState("");

  useEffect(() => {
    if (EmailTabRef.current) {
      EmailTabRef.current.click();
    }
  }, []);

  function handleshowmobilemenu() {
    setShowMobileMenu(!showMobileMenu);
  }

  function handleTabSelect(item) {
    setSelectedTab(item);
    if (item === "DashboardHome") {
      setSelectedTabHeader("Home");
    } else if (item === "EmailTab") {
      setSelectedTabHeader("Emails");
    } else if (item === "OutboundTab") {
      setSelectedTabHeader("Outbounds");
    }
    removeActive();
    addActive(item);
  }

  function renderTab(selectedTab) {
    switch (selectedTab) {
      case "DashboardHome":
        return <DashboardHome />;
      case "EmailTab":
        return <EmailTab />;
      case "OutboundTab":
        return <OutboundTab />;
      default:
        return null;
    }
  }

  function removeActive() {
    DashboardHomeRef.current.classList.remove("dashboardMenuActive");
    EmailTabRef.current.classList.remove("dashboardMenuActive");
    OutboundTabRef.current.classList.remove("dashboardMenuActive");
  }

  function addActive(selectedTab) {
    switch (selectedTab) {
      case "DashboardHome":
        DashboardHomeRef.current.classList.add("dashboardMenuActive");
        break;
      case "EmailTab":
        EmailTabRef.current.classList.add("dashboardMenuActive");
        break;
      case "OutboundTab":
        OutboundTabRef.current.classList.add("dashboardMenuActive");
        break;
      default:
        break;
    }
  }

  return (
    <main className="grid grid-cols-1 sm:grid-cols-6">
      <div className="bg-green-50 col-span-1 p-0 sm:pl-2 pt-10 relative">
        <div
          className="sm:hidden rounded-3xl border border-green-500 inline-block p-2 ml-5"
          onClick={handleshowmobilemenu}
        >
          <svg
            className="text-green-300 w-8 h-8 dark:text-white left-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="M5 7h14M5 12h14M5 17h10"
            />
          </svg>
        </div>

        <ul
          className={`w-full p-2 ${showMobileMenu ? "block" : "hidden"} sm:block sm:p-0 ` }
        >
          {/* <li
            className="p-5 w-full"
            ref={DashboardHomeRef}
            onClick={() => {
              handleTabSelect("DashboardHome");
              handleshowmobilemenu();
            }}
          >
            Dashboard
          </li> */}
          <li
            className="w-full p-5"
            onClick={() => {
              handleTabSelect("EmailTab");
              handleshowmobilemenu();
            }}
            ref={EmailTabRef}
          >
            Emails
          </li>
          <li
            className="w-full p-5"
            onClick={() => {
              handleTabSelect("OutboundTab");
              handleshowmobilemenu();
            }}
            ref={OutboundTabRef}
          >
            Outbounds
          </li>
        </ul>
      </div>

      <div className="col-span-5 bg-green-50 p-2 sm:p-5">
        <div className="bg-white rounded-xl p-3 h-full sm:p-5">
          <div className="bg-green-400 rounded-2xl p-3 text-white">
            {selectedTabHeader}
          </div>
          {renderTab(selectedTab)}
        </div>
      </div>
    </main>
  );
}
