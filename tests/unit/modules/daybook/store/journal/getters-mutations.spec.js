import { createStore } from 'vuex'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../../mock-data/test-journal-state'

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState }
      }
    }
  })

describe('Vuex - Journal Module Tests', () => {
  test('should have this initial state', () => {
    const store = createVuexStore(journalState)
    const { isLoading, entries } = store.state.journal

    expect(isLoading).toBeFalsy()
    expect(entries).toEqual(journalState.entries)
  })

  // Getters
  test('getters: getEntriesByTerm getEntryById', () => {
    const initialState = {
      isLoading: false,
      entries: [
        {
          id: 'DEF-456',
          date: 1655424085168,
          picture: 'https://res.cloudinary.com/joseburgon/image/upload/v1658849965/eageowhybrc6dtj3cvqp.jpg',
          text: 'Hello world from mock data'
        },
        {
          id: 'GHI-789',
          date: 1655424085168,
          picture: 'https://res.cloudinary.com/joseburgon/image/upload/v1658849965/eageowhybrc6dtj3cvqp.jpg',
          text: 'This is the second entry'
        }
      ]
    }

    const store = createVuexStore(initialState)

    const [entry1, entry2] = initialState.entries

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
    expect(store.getters['journal/getEntriesByTerm']('second').length).toBe(1)
    expect(store.getters['journal/getEntriesByTerm']('second')).toEqual([entry2])

    expect(store.getters['journal/getEntryById']('DEF-456')).toEqual(entry1)
  })

  // Mutations
  test('mutation: setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] })

    store.commit('journal/setEntries', journalState.entries)

    expect(store.state.journal.entries.length).toBe(2)
    expect(store.state.journal.isLoading).toBeFalsy()
  })

  test('mutation: updateEntry', () => {
    const store = createVuexStore(journalState)

    const updatedEntry = {
      id: '-N4ixkUctInC142u_VYw',
      date: 1655424085168,
      text: 'Hello world from tests'
    }

    store.commit('journal/updateEntry', updatedEntry)

    const storeEntries = store.state.journal.entries

    expect(storeEntries.length).toBe(2)
    expect(
      storeEntries.find(e => e.id === updatedEntry.id)
    ).toEqual(updatedEntry)
  })

  test('mutation: addEntry deleteEntry', () => {
    const store = createVuexStore(journalState)

    store.commit('journal/addEntry', { id: 'ABC-123', text: 'Hello World' })

    const stateEntries = store.state.journal.entries

    expect(stateEntries.length).toBe(3)
    expect(
      stateEntries.some(e => e.id === 'ABC-123')
    ).toBeTruthy()

    store.commit('journal/deleteEntry', 'ABC-123')

    expect(store.state.journal.entries.length).toBe(2)
    expect(
      store.state.journal.entries.some(e => e.id === 'ABC-123')
    ).toBeFalsy()
  })
})