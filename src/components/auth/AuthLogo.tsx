import { LogoIcon } from "../../assets/icons/LogoIcon";

export const AuthLogo = () => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -top-[3rem] 1xl:-top-[3.5625rem] z-30 w-[6rem] h-[6rem] 1xl:w-[7.125rem] 1xl:h-[7.125rem]">
      {/* Circle with logo */}
      <div className="relative w-full h-full rounded-full bg-loginModalBg border border-mainBorder flex items-center justify-center text-logoBg">
        <div className="w-[4.375rem] h-[4.375rem] 1xl:w-[5.375rem] 1xl:h-[5.375rem] [&>svg]:w-full [&>svg]:h-full">
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};
