import { useTranslations } from "next-intl";

interface BreadcrumbsProps {
  pageName?: string;
}

export const Breadcrumbs = ({ pageName }: BreadcrumbsProps) => {
  const t = useTranslations("breadcrumbs");

  return (
    <div className="text-secondaryText text-sm 1xl:text-base font-semibold flex items-center gap-1.5">
      <span>{t("firstPart")}</span>
      <span className="opacity-50">&gt;</span>
      <span>{t(pageName?.toLowerCase() as string)}</span>
    </div>
  );
};
