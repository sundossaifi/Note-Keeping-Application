const API_URL = '/notes';

export async function fetchNotes(page, limit) {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data.results.notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

export async function addNote(note) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding note:', error);
    throw error;
  }
};

export async function updateNote(id, updatedNote) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};


export async function deleteNote(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

export async function searchNotes(query) {
  try {
    const response = await fetch(`${API_URL}/search?query=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching notes:', error);
    throw error;
  }
};
