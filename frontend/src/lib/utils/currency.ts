/**
 * Currency formatting utilities for ruble display
 */

// USD to RUB exchange rate (approximate)
const USD_TO_RUB_RATE = 80;

/**
 * Format a dollar amount as rubles
 * @param usdAmount Amount in USD
 * @returns Formatted ruble string
 */
export function formatRubles(usdAmount: number): string {
  const rubleAmount = usdAmount * USD_TO_RUB_RATE;
  return `${Math.round(rubleAmount).toLocaleString('ru-RU')}₽`;
}

/**
 * Format currency for usage display
 * @param amount Amount in USD
 * @returns Formatted ruble string
 */
export function formatCurrency(amount: number): string {
  return formatRubles(amount);
}

/**
 * Convert USD price to ruble display price
 * @param usdPrice USD price string (e.g., "$20")
 * @returns Ruble price string (e.g., "2000₽")
 */
export function convertPriceToRubles(usdPrice: string): string {
  const amount = parseFloat(usdPrice.replace('$', ''));
  return formatRubles(amount);
}
