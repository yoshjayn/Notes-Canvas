import { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { Pin, Archive, Trash2, MoreVertical, Tag } from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';
import Dropdown from './Dropdown';

const NoteCard = ({ note, onEdit }) => {
  const { togglePin, toggleArchive, deleteNote } = useNotes();
  const [showMenu, setShowMenu] = useState(false);

  const handlePin = async (e) => {
    e.stopPropagation();
    await togglePin(note._id);
  };

  const handleArchive = async () => {
    await toggleArchive(note._id);
    setShowMenu(false);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(note._id);
    }
    setShowMenu(false);
  };

  const menuItems = [
    {
      label: note.isArchived ? 'Unarchive' : 'Archive',
      onClick: handleArchive,
      icon: Archive,
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      icon: Trash2,
      className: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div
      className={clsx(
        'relative group cursor-pointer rounded-lg p-4 transition-all hover:shadow-lg',
        'border border-gray-200 dark:border-gray-700',
        'hover:border-gray-300 dark:hover:border-gray-600'
      )}
      style={{ backgroundColor: note.color || '#ffffff' }}
      onClick={() => onEdit(note)}
    >
      {/* Pin button */}
      <button
        onClick={handlePin}
        className={clsx(
          'absolute top-2 right-2 p-1.5 rounded-full transition-all',
          'hover:bg-black/10 dark:hover:bg-white/10',
          note.isPinned
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100'
        )}
      >
        <Pin className={clsx('w-4 h-4', note.isPinned && 'fill-current')} />
      </button>

      {/* Menu button */}
      <div className="absolute top-2 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Dropdown
          trigger={
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-400"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          }
          items={menuItems}
          open={showMenu}
          onClose={() => setShowMenu(false)}
        />
      </div>

      {/* Content */}
      <div className="pr-16">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {note.title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
          {note.description}
        </p>
      </div>

      {/* Labels */}
      {note.labels && note.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.labels.map(label => (
            <span
              key={label._id}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: label.color + '30',
                color: label.color,
              }}
            >
              <Tag className="w-3 h-3 mr-1" />
              {label.name}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="text-xs text-gray-500 dark:text-gray-100">
        {format(new Date(note.updatedAt), 'MMM d, yyyy')}
      </div>
    </div>
  );
};

export default NoteCard;