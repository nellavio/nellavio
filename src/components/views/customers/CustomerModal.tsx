import React, { useState } from "react";
import { useTranslations } from "next-intl";

import { Modal } from "../../common/Modal";
import { OutlinedButton } from "../../common/OutlinedButton";
import { ContainedButton } from "../../common/ContainedButton";
import { PhoneIcon } from "../../../assets/icons/PhoneIcon";
import { SpinnerIcon } from "../../../assets/icons/SpinnerIcon";
import { CustomerModalProps } from "./types";

export const CustomerModal = ({
  closeModal,
  customerData,
}: CustomerModalProps) => {
  const t = useTranslations("customers.customerModal");
  const [imageLoaded, setImageLoaded] = useState(false);

  const customerDetails = [
    // Some values here are mocked for visual/demo purposes
    { label: t("moneySpent"), value: "$" + customerData.col6 },
    { label: t("totalOrders"), value: Math.floor(Math.random() * 10 + 10) },
    { label: t("phone"), value: customerData.col5 },
    { label: t("email"), value: "customer@mail.com" },
    { label: t("returns"), value: Math.floor(Math.random() * 5 + 1) },
    { label: t("loyaltyPoints"), value: Math.floor(Math.random() * 300 + 150) },
  ];

  return (
    <div className="hidden md:flex">
      <Modal onClose={closeModal}>
        <div className="flex items-center justify-center w-full flex-col gap-2 min-w-[20rem] max-w-[32rem]">
          <div className="flex w-full gap-6">
            <div className="flex min-h-[6rem] min-w-[6rem]">
              {!imageLoaded && <SpinnerIcon className="contentSpinner" />}
              <img
                src={customerData.col0}
                alt="User Profile"
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? "block" : "none" }}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-start text-left">
                <h1 className="text-primaryText text-4xl w-full text-left mt-3 mb-2">
                  {customerData.col1} {customerData.col2}
                </h1>
              </div>
              <div className="flex">
                <h4 className="text-secondaryText text-md w-full text-left mt-1 mb-2">
                  {customerData.col3}, {customerData.col4}
                </h4>
              </div>
            </div>
          </div>
          <div className="text-primaryText text-base w-full text-left mt-5 flex flex-wrap justify-between">
            {customerDetails.map((customer) => (
              <div
                key={customer?.label}
                className="border-b border-mainBorder w-[47%] my-[0.6rem] pb-2 flex min-w-0"
              >
                <div className="text-secondaryText mr-1 flex-shrink-0">
                  {customer?.label}:
                </div>
                <div className="truncate">{customer?.value}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center mt-12 gap-4 h-[2.7rem]">
          <OutlinedButton text={t("orderHistory")} />
          <a
            href={`tel:5555-5555-5555`}
            style={{ textDecoration: "none", width: "100%" }}
          >
            <ContainedButton text={t("callButton")} icon={<PhoneIcon />} />
          </a>
        </div>
      </Modal>
    </div>
  );
};
