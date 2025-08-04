import { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import { X, Tag } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import Input from './Input';
import Textarea from './Textarea';
import ColorPicker from './ColorPicker';
import LabelSelector from './LabelSelector';

const CreateNoteModal = ({ isOpen, onClose }) => {
  const { createNote, labels } = useNotes();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: '#ffffff',
    labels: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await createNote(formData);
    
    if (result.success) {
      onClose();
      setFormData({
        title: '',
        description: '',
        color: '#ffffff',
        labels: [],
      });
    }
    
    setLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Note">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter note title"
          required
          autoFocus
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Write your note content..."
          rows={6}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Color
          </label>
          <ColorPicker
            value={formData.color}
            onChange={(color) => handleChange('color', color)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Labels
          </label>
          <LabelSelector
            selected={formData.labels}
            onChange={(labels) => handleChange('labels', labels)}
            labels={labels}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Note'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateNoteModal;