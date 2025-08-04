import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNotes } from '../contexts/NotesContext';
import { Plus, Archive, Tag } from 'lucide-react';
import Button from '../components/Button';
import NoteCard from '../components/NoteCard';
import CreateNoteModal from '../components/CreateNoteModal';
import EditNoteModal from '../components/EditNoteModal';
import LabelManager from '../components/LabelManager';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const { notes, labels, loading, filters, updateFilters } = useNotes();
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [showLabels, setShowLabels] = useState(false);

  const isArchiveView = searchParams.get('archived') === 'true';
  const isLabelView = searchParams.get('labels') === 'true';

  useEffect(() => {
    if (isArchiveView) {
      updateFilters({ isArchived: true });
    } else {
      updateFilters({ isArchived: false });
    }
  }, [isArchiveView]);

  useEffect(() => {
    setShowLabels(isLabelView);
  }, [isLabelView]);

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const pinnedNotes = notes.filter(note => note.isPinned && !note.isArchived);
  const unpinnedNotes = notes.filter(note => !note.isPinned && !note.isArchived);
  const archivedNotes = notes.filter(note => note.isArchived);

  const displayNotes = isArchiveView ? archivedNotes : [...pinnedNotes, ...unpinnedNotes];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isArchiveView ? 'Archived Notes' : isLabelView ? 'Labels' : 'My Notes'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isArchiveView 
                ? `${archivedNotes.length} archived notes`
                : isLabelView 
                ? `${labels.length} labels`
                : `${displayNotes.length} notes`
              }
            </p>
          </div>
          {!isLabelView && (
            <Button
              variant="primary"
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Note
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner size="large" />
        </div>
      ) : isLabelView ? (
        <LabelManager />
      ) : displayNotes.length === 0 ? (
        <EmptyState
          icon={isArchiveView ? Archive : Tag}
          title={isArchiveView ? "No archived notes" : "No notes yet"}
          description={
            isArchiveView 
              ? "Notes you archive will appear here"
              : "Create your first note to get started"
          }
          action={
            !isArchiveView && (
              <Button
                variant="primary"
                onClick={() => setCreateModalOpen(true)}
                className="mt-4"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Note
              </Button>
            )
          }
        />
      ) : (
        <div className="space-y-6">
          {/* Pinned Notes */}
          {!isArchiveView && pinnedNotes.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                Pinned
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {pinnedNotes.map(note => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={() => handleEditNote(note)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Other Notes */}
          {(!isArchiveView && unpinnedNotes.length > 0) && (
            <div>
              {pinnedNotes.length > 0 && (
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                  Others
                </h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {unpinnedNotes.map(note => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={() => handleEditNote(note)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Archived Notes */}
          {isArchiveView && archivedNotes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {archivedNotes.map(note => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={() => handleEditNote(note)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      {createModalOpen && (
        <CreateNoteModal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
        />
      )}

      {editingNote && (
        <EditNoteModal
          isOpen={!!editingNote}
          note={editingNote}
          onClose={() => setEditingNote(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;