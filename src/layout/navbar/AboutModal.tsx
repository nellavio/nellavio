import React, { useRef, useEffect } from "react";
import Link from "next/link";

import { CloseIcon } from "../../assets/icons/CloseIcon";
import { useCloseModal } from "../../hooks/useCloseModal";
import { OutlinedButton } from "../../components/common/OutlinedButton";
import { AboutModalProps } from "./types";

export const AboutModal = ({ closeModal }: AboutModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, closeModal);

  // Block body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    // I didn't use common modal component here because this modal needs unique padding values for mobile and tablet
    <div className="aboutModal alternativeScrollbar">
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0 backdrop-blur-md z-40" />
      <div className="fixed w-screen h-full flex justify-center items-center top-0 left-0 z-50">
        <div
          ref={modalRef}
          className="w-screen h-full md:w-auto md:h-auto bg-loginModalBg shadow-xl px-[0vw] md:px-10 pt-0 md:pt-[3rem] md:pb-12 flex flex-col items-center justify-start md:rounded-2xl relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-xl fill-secondaryText stroke-secondaryText hover:stroke-secondaryTextHover hover:fill-secondaryTextHover"
          >
            <CloseIcon />
          </button>
          <div className="md:max-h-[70vh] 1xl-max-h-[60vh] w-full -mr-4 overflow-auto pr-4 max-w-full md:max-w-[36rem]">
            <div className="flex items-center justify-center w-full flex-col gap-2 mt-8 md:-mt-4 px-8 md:px-0">
              <h2 className="text-primaryText text-3xl w-full text-left mt-2">
                About
              </h2>
            </div>
            <div className="text-primaryText text-base w-full mt-4 text-left px-8 md:px-0">
              <p className="mb-4 text-base">
                Spireflow is an open source and free dashboard template, written
                in NextJS and TypeScript. It is connected to NodeJS backend with
                PostgreSQL database containing AI generated data for fictional
                electronic store.
              </p>
              <p className="text-left w-full mt-4 text-xl">Tech stack:</p>
              <div className="mt-4">
                <p className="text-secondaryText mb-2">Front-End:</p>
              </div>
              <ul className="list-disc list-inside mb-4 pl-3 text-primaryText">
                <li>ReactJS</li>
                <li>NextJS</li>
                <li>TypeScript</li>
                <li>Tailwind</li>
                <li>Zustand</li>
                <li>Apollo Client</li>
                <li>Recharts</li>
                <li>Clerk</li>
                <li>Jest</li>
              </ul>
              <div>
                <p className="text-secondaryText mb-2">Back-End:</p>
              </div>
              <ul className="list-disc list-inside pl-3">
                <li>NodeJS</li>
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>Prisma</li>
                <li>GraphQL</li>
              </ul>
            </div>
            <p className="text-left w-full mt-4 text-xl text-primaryText px-8 md:px-0">
              Links
            </p>
            <div className="flex flex-col sm:flex-row justify-start w-[14rem] sm:w-full mt-3 text-base gap-2 pl-8 sm:px-8 md:px-0 sm:h-12">
              <Link
                href="https://github.com/matt765/spireflow"
                className="text-primaryText"
                target="_blank"
              >
                <OutlinedButton text="Front-end repository" />
              </Link>
              <Link
                href="https://github.com/matt765/spireflow-backend"
                className="text-primaryText"
                target="_blank"
              >
                <OutlinedButton text="Back-end repository" />
              </Link>
            </div>
            <p className="text-left w-full mt-4 text-xl text-primaryText px-8 md:px-0">
              Contact author
            </p>
            <p className="text-primaryText text-left mt-2 w-full px-8 md:px-0">
              You can reach out to me through the contact form on my personal
              website or via LinkedIn.
            </p>
            <div className="flex justify-start items-center gap-2 mt-4 h-12 mb-8 md:mb-0 pl-8 md:pl-0">
              <div className="flex justify-start md:px-0">
                <Link
                  href="https://matt765-portfolio.vercel.app/#contact"
                  className="text-primaryText mt-1"
                  target="_blank"
                >
                  <OutlinedButton text="Contact form" />
                </Link>
              </div>
              <div className="flex justify-start md:px-0">
                <Link
                  href="https://www.linkedin.com/in/mateusz-wyrebek/"
                  className="text-primaryText mt-1"
                  target="_blank"
                >
                  <OutlinedButton text="LinkedIn" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
