import { useState } from 'react';
import { useNotes } from '../contexts/NotesContext';
import Button from './Button';
import Input from './Input';
import { X, Edit2, Trash2, Check } from 'lucide-react';

const LabelManager = () => {
  const { labels, createLabel, updateLabel, deleteLabel } = useNotes();
  const [newLabel, setNewLabel] = useState({ name: '', color: '#2196f3' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', color: '#2196f3' });
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createLabel(newLabel);
    setNewLabel({ name: '', color: '#2196f3' });
    setLoading(false);
  };

  const startEdit = (label) => {
    setEditingId(label._id);
    setEditData({ name: label.name, color: label.color });
  };

  const handleEdit = async (e, labelId) => {
    e.preventDefault();
    setLoading(true);
    await updateLabel(labelId, editData);
    setEditingId(null);
    setLoading(false);
  };

  const handleDelete = async (labelId) => {
    setLoading(true);
    await deleteLabel(labelId);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Manage Labels</h2>
      <form onSubmit={handleCreate} className="flex gap-2 mb-6">
        <Input
          value={newLabel.name}
          onChange={e => setNewLabel(l => ({ ...l, name: e.target.value }))}
          placeholder="Label name"
          required
        />
        <input
          type="color"
          value={newLabel.color}
          onChange={e => setNewLabel(l => ({ ...l, color: e.target.value }))}
          className="w-10 h-10 p-0 border-none bg-transparent cursor-pointer"
          title="Pick color"
        />
        <Button type="submit" variant="primary" disabled={loading || !newLabel.name.trim()}>
          Add
        </Button>
      </form>
      <div className="space-y-3">
        {labels.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No labels yet. Create one above.</p>
        ) : (
          labels.map(label => (
            <div key={label._id} className="flex items-center gap-3 p-3 rounded-md bg-gray-50 dark:bg-gray-800">
              <span
                className="inline-block w-5 h-5 rounded-full mr-2 border"
                style={{ backgroundColor: label.color, borderColor: label.color }}
                title={label.color}
              />
              {editingId === label._id ? (
                <form onSubmit={e => handleEdit(e, label._id)} className="flex items-center gap-2 flex-1">
                  <Input
                    value={editData.name}
                    onChange={e => setEditData(d => ({ ...d, name: e.target.value }))}
                    required
                    className="w-32"
                  />
                  <input
                    type="color"
                    value={editData.color}
                    onChange={e => setEditData(d => ({ ...d, color: e.target.value }))}
                    className="w-8 h-8 p-0 border-none bg-transparent cursor-pointer"
                    title="Pick color"
                  />
                  <Button type="submit" size="sm" variant="primary" disabled={loading}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                    <X className="w-4 h-4" />
                  </Button>
                </form>
              ) : (
                <>
                  <span className="flex-1 font-medium" style={{ color: label.color }}>{label.name}</span>
                  <Button type="button" size="sm" variant="ghost" onClick={() => startEdit(label)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button type="button" size="sm" variant="ghost" onClick={() => handleDelete(label._id)} disabled={loading}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LabelManager;