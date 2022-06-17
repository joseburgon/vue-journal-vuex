export const setEntries = (state, entries) => {
  state.entries = [...state.entries, ...entries]
  state.isLoading = false
}

export const updateEntry = (state, updatedEntry) => {
  const entryIndex = state.entries.findIndex(stateEntry => stateEntry.id === updatedEntry.id)

  state.entries[entryIndex] = updatedEntry
}

export const addEntry = (state, entry) => {
  state.entries.unshift(entry)
}