import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const NotesContext = createContext({});

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    labels: [],
    isPinned: undefined,
    isArchived: false,
  });

  // Fetch notes based on filters
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (filters.search) params.search = filters.search;
      if (filters.labels.length > 0) params.labels = filters.labels.join(',');
      if (filters.isPinned !== undefined) params.isPinned = filters.isPinned;
      if (filters.isArchived !== undefined) params.isArchived = filters.isArchived;
      
      const response = await axios.get('/notes', { params });
      setNotes(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch notes');
      console.error('Fetch notes error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch labels
  const fetchLabels = async () => {
    try {
      const response = await axios.get('/labels');
      setLabels(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch labels');
      console.error('Fetch labels error:', error);
    }
  };

  // Create note
  const createNote = async (noteData) => {
    try {
      const response = await axios.post('/notes', noteData);
      const newNote = response.data.data;
      
      // Add to notes list if not archived
      if (!newNote.isArchived) {
        setNotes(prev => [newNote, ...prev]);
      }
      
      toast.success('Note created successfully');
      return { success: true, data: newNote };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create note';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update note
  const updateNote = async (noteId, updates) => {
    try {
      const response = await axios.put(`/notes/${noteId}`, updates);
      const updatedNote = response.data.data;
      
      setNotes(prev => prev.map(note => 
        note._id === noteId ? updatedNote : note
      ));
      
      toast.success('Note updated successfully');
      return { success: true, data: updatedNote };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update note';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete note
  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`/notes/${noteId}`);
      setNotes(prev => prev.filter(note => note._id !== noteId));
      toast.success('Note deleted successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete note';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Toggle pin
  const togglePin = async (noteId) => {
    try {
      const response = await axios.put(`/notes/${noteId}/pin`);
      const updatedNote = response.data.data;
      
      setNotes(prev => prev.map(note => 
        note._id === noteId ? updatedNote : note
      ));
      
      toast.success(updatedNote.isPinned ? 'Note pinned' : 'Note unpinned');
      return { success: true, data: updatedNote };
    } catch (error) {
      toast.error('Failed to update pin status');
      return { success: false };
    }
  };

  // Toggle archive
  const toggleArchive = async (noteId) => {
    try {
      const response = await axios.put(`/notes/${noteId}/archive`);
      const updatedNote = response.data.data;
      
      // Remove from current view if archiving/unarchiving
      if (filters.isArchived !== updatedNote.isArchived) {
        setNotes(prev => prev.filter(note => note._id !== noteId));
      } else {
        setNotes(prev => prev.map(note => 
          note._id === noteId ? updatedNote : note
        ));
      }
      
      toast.success(updatedNote.isArchived ? 'Note archived' : 'Note unarchived');
      return { success: true, data: updatedNote };
    } catch (error) {
      toast.error('Failed to update archive status');
      return { success: false };
    }
  };

  // Reorder notes
  const reorderNotes = async (noteId, newOrder) => {
    try {
      await axios.put('/notes/reorder', { noteId, newOrder });
      // Refetch to get updated order
      await fetchNotes();
      return { success: true };
    } catch (error) {
      toast.error('Failed to reorder notes');
      return { success: false };
    }
  };

  // Create label
  const createLabel = async (labelData) => {
    try {
      const response = await axios.post('/labels', labelData);
      const newLabel = response.data.data;
      setLabels(prev => [...prev, newLabel]);
      toast.success('Label created successfully');
      return { success: true, data: newLabel };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to create label';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update label
  const updateLabel = async (labelId, updates) => {
    try {
      const response = await axios.put(`/labels/${labelId}`, updates);
      const updatedLabel = response.data.data;
      
      setLabels(prev => prev.map(label => 
        label._id === labelId ? updatedLabel : label
      ));
      
      // Update notes that have this label
      setNotes(prev => prev.map(note => ({
        ...note,
        labels: note.labels.map(label => 
          label._id === labelId ? updatedLabel : label
        )
      })));
      
      toast.success('Label updated successfully');
      return { success: true, data: updatedLabel };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to update label';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Delete label
  const deleteLabel = async (labelId) => {
    try {
      await axios.delete(`/labels/${labelId}`);
      setLabels(prev => prev.filter(label => label._id !== labelId));
      
      // Remove label from notes
      setNotes(prev => prev.map(note => ({
        ...note,
        labels: note.labels.filter(label => label._id !== labelId)
      })));
      
      toast.success('Label deleted successfully');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.error || 'Failed to delete label';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Initial fetch
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchLabels();
    }
  }, []);

  // Fetch notes when filters change
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchNotes();
    }
  }, [filters]);

  const value = {
    notes,
    labels,
    loading,
    filters,
    fetchNotes,
    fetchLabels,
    createNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    reorderNotes,
    createLabel,
    updateLabel,
    deleteLabel,
    updateFilters,
  };

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
};