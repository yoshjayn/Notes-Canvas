import { Check } from 'lucide-react';
import clsx from 'clsx';

const ColorPicker = ({ value, onChange }) => {
  const colors = [
    '#ffffff', // White
    '#fbbf24', // Amber
    '#fde047', // Yellow
    '#a3e635', // Lime
    '#4ade80', // Green
    '#2dd4bf', // Teal
    '#22d3ee', // Cyan
    '#60a5fa', // Blue
    '#818cf8', // Indigo
    '#a78bfa', // Purple
    '#e879f9', // Fuchsia
    '#f472b6', // Pink
    '#fb7185', // Rose
    '#f87171', // Red
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={clsx(
            'w-10 h-10 rounded-lg border-2 transition-all',
            'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
            value === color 
              ? 'border-gray-900 dark:border-white' 
              : 'border-gray-300 dark:border-gray-600'
          )}
          style={{ backgroundColor: color }}
        >
          {value === color && (
            <Check className="w-full h-full p-1 text-gray-700" />
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;