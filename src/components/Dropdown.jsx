import { useEffect, useRef } from 'react';
import clsx from 'clsx';

const Dropdown = ({ trigger, items, open, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <div className="relative" ref={dropdownRef}>
      {trigger}
      
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
          <div className="py-1">
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    item.onClick();
                  }}
                  className={clsx(
                    'flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                    item.className || 'text-gray-700 dark:text-gray-300'
                  )}
                >
                  {Icon && <Icon className="w-4 h-4 mr-3" />}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;