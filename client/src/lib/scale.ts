/**
 * Calculates the scaled width and height of an image based on the screen dimensions
 * and design dimensions.
 *
 * @param designWidth - The width of the design in the design tool (e.g., Figma).
 * @param designHeight - The height of the design in the design tool (e.g., Figma).
 * @param screenWidth - The current screen width (can be obtained via window.innerWidth).
 * @param screenHeight - The current screen height (can be obtained via window.innerHeight).
 * @param iconWidth - The width of the icon in the design.
 * @param iconHeight - The height of the icon in the design.
 * @returns An object containing the scaled width and height.
 */

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

export function getScaledSize(
  designWidth: number,
  designHeight: number,
  objectWidth: number,
  objectHeight: number
): { width: number; height: number } {
  const widthScale = screenWidth / designWidth;
  const heightScale = screenHeight / designHeight;

  const scaleFactor = Math.min(widthScale, heightScale);

  const newIconWidth = objectWidth * scaleFactor;
  const newIconHeight = objectHeight * scaleFactor;

  return { width: newIconWidth, height: newIconHeight };
}