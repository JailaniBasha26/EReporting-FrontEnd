import React from "react";
import { NavLink } from "react-router-dom";

import { HiOutlineDocumentReport } from "react-icons/hi";
import {
  MdSend,
  MdOutlineLiveHelp,
  MdOutlineCorporateFare,
  MdPayment,
  MdSendToMobile,
} from "react-icons/md";
import {
  BsFileEarmarkPdf,
  BsCalendarDate,
  BsFileEarmarkSpreadsheet,
  BsStickies,
} from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { AiFillDashboard } from "react-icons/ai";
import { TbFileInvoice, TbSignature } from "react-icons/tb";
import { CgNotes } from "react-icons/cg";
import { RxDoubleArrowRight, RxDoubleArrowLeft } from "react-icons/rx";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import Steps from "../Steps/steps";
import "./Sidebar.css";

const routes = [
  {
    name: "My Dashboard",
    icon: <AiFillDashboard className="icon" />,
    path: "/year",
    subRoutes: <Steps />,
  },
  {
    name: "Annual Report",
    icon: <HiOutlineDocumentReport className="icon" />,
    path: "/info",
    subRoutes: [
      {
        name: "Company Information ",
        icon: <MdOutlineCorporateFare className="icon" />,
        path: "/info",
      },
      {
        name: "Financial Year",
        icon: <BsCalendarDate className="icon" />,
        path: "/info",
      },
      {
        name: "Income Statement",
        icon: <TbFileInvoice className="icon" />,
        path: "/info",
      },
      {
        name: "Balance Sheet",
        icon: <BsFileEarmarkSpreadsheet className="icon" />,
        path: "/info",
      },
      {
        name: "Notes",
        icon: <BsStickies className="icon" />,
        path: "/fileSIE",
      },
      {
        name: "Management Statement",
        icon: <CgNotes className="icon" />,
        path: "/info",
      },
    ],
  },
  {
    name: "Send Annual Report",
    icon: <MdSend className="icon" />,
    path: "#/fileSIE",
    subRoutes: [
      {
        name: "Digital Signature",
        icon: <TbSignature className="icon" />,
        path: "/info",
      },
      {
        name: "Pay",
        icon: <MdPayment className="icon" />,
        path: "/info",
      },
      {
        name: "Send",
        icon: <MdSendToMobile className="icon" />,
        path: "/info",
      },
    ],
  },
  {
    name: "View PDF",
    icon: <BsFileEarmarkPdf className="icon" />,
    path: "#/fileSIE",
  },
  {
    name: "Help/Example Report",
    icon: <MdOutlineLiveHelp className="icon" />,
    path: "#/fileSIE",
  },
  {
    name: "Contact Support",
    icon: <BiSupport className="icon" />,
    path: "#/fileSIE",
  },
];

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "50px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                ></motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              {isOpen == true ? (
                <RxDoubleArrowLeft className="icon" onClick={toggle} />
              ) : (
                <RxDoubleArrowRight className="icon" onClick={toggle} />
              )}
              {/* <FaBars onClick={toggle} /> */}
            </div>
          </div>
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
