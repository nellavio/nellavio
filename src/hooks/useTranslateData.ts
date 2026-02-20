import { useMemo } from "react";

type Translations = { [key: string]: string };

/**
 * Recursively translates English keys/values in backend data objects.
 * Used with useBackendTranslations to localize charts without backend i18n.
 *
 * @template T - Data object type
 * @param {T[]} data - Array of data objects to translate
 * @param {Translations} translations - Key-value map of English to translated text
 * @returns {T[]} Translated data array
 */
export const useTranslateData = <T extends object>(
  data: T[],
  translations: Translations,
): T[] => {
  const translate = (item: unknown): unknown => {
    if (Array.isArray(item)) {
      return item.map((innerItem) => translate(innerItem));
    } else if (item !== null && typeof item === "object") {
      const newItem: Record<string, unknown> = {};
      Object.keys(item).forEach((key) => {
        const newKey = translations[key] || key;
        newItem[newKey] = translate((item as Record<string, unknown>)[key]);
      });
      return newItem;
    } else if (typeof item === "string") {
      return Object.entries(translations).reduce((acc, [key, value]) => {
        return acc.replace(new RegExp(`\\b${key}\\b`, "g"), value);
      }, item);
    } else {
      return item;
    }
  };

  return useMemo(
    () => data.map(translate as (item: T) => T),
    [data, translations],
  );
};
