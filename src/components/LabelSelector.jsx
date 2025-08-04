import { Check, Plus } from 'lucide-react';
import clsx from 'clsx';

const LabelSelector = ({ selected = [], onChange, labels = [] }) => {
  const toggleLabel = (labelId) => {
    if (selected.includes(labelId)) {
      onChange(selected.filter(id => id !== labelId));
    } else {
      onChange([...selected, labelId]);
    }
  };

  return (
    <div className="space-y-2">
      {labels.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No labels available. Create labels to organize your notes.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => {
            const isSelected = selected.includes(label._id);
            return (
              <button
                key={label._id}
                type="button"
                onClick={() => toggleLabel(label._id)}
                className={clsx(
                  'inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  'border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                  isSelected
                    ? 'border-gray-700 dark:border-gray-300'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                )}
                style={{
                  backgroundColor: isSelected ? label.color + '30' : 'transparent',
                  color: isSelected ? label.color : undefined,
                }}
              >
                {isSelected ? (
                  <Check className="w-3 h-3 mr-1" />
                ) : (
                  <Plus className="w-3 h-3 mr-1" />
                )}
                {label.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LabelSelector;