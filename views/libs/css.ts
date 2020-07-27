/**
 * Utility functions for working with various
 * CSS classes easier
 */

interface CreateFn {
  (second: string, third?: string): string;
}

interface ColorClassFn {
  (color: string, element?: string): string;
}

function create(first: string): CreateFn {
  return (second: string, third?: string) => {
    if (third) {
      return `${first}-${second}-${third}`;
    }
    return `${first}-${second}`;
  };
}

const text = create('text');
const bg = create('bg');
const border = create('border');

export const colorClass: ColorClassFn = (color, element) => color ? text(color, element) : undefined;
export const bgClass: ColorClassFn = (color, element) => color ? bg(color, element) : undefined;
export const borderColorClass: ColorClassFn = (color, element) => color ? border(color, element) : undefined;
export const spacingClasses = (spacing: string): string => spacing ? spacing : undefined;
export const sizeClass = (size: string, serif: boolean): string => {
  if (!size) {
    return;
  }
  if (!serif) {
    return text('sans', size);
  }
  return text('serif', size);
};
export const fullscreenClasses = (fullscreen: boolean): string => fullscreen ? 'min-h-screen h-screen' : undefined;
