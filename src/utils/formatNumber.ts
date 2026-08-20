/**
 * Number Formatting Utilities
 * Turns raw numeric values coming from the API into display strings
 */

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");

/**
 * Formats a number with thousand separators.
 *
 * @param {number} value - Raw numeric value
 * @returns {string} Grouped number (e.g. 2382 -> "2,382")
 */
export const formatNumber = (value: number): string =>
  NUMBER_FORMATTER.format(value);

/**
 * Formats a number as a US dollar amount.
 *
 * @param {number} value - Raw numeric value
 * @returns {string} Prefixed, grouped amount (e.g. 2499 -> "$2,499")
 */
export const formatCurrency = (value: number): string =>
  `$${NUMBER_FORMATTER.format(value)}`;
