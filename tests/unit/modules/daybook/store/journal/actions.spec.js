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

describe('Vuex - Journal Module: Actions', () => {
  test('actions: loadEntries', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] })

    await store.dispatch('journal/loadEntries')

    expect(store.state.journal.entries.length).toBeGreaterThanOrEqual(1)
  })

  test('actions: updateEntry', async () => {
    const store = createVuexStore(journalState)

    const updatedEntry = {
      id: '-N4ixkUctInC142u_VYw',
      date: 1655424085168,
      picture: 'https://res.cloudinary.com/joseburgon/image/upload/v1658849965/eageowhybrc6dtj3cvqp.jpg',
      text: 'Hello world from mock data',
      otherField: true,
      oneMore: { a: 1 }
    }

    await store.dispatch('journal/updateEntry', updatedEntry)

    expect(store.state.journal.entries.length).toBe(2)

    expect(
      store.state.journal.entries.find(e => e.id === updatedEntry.id)
    )
      .toEqual({
        id: '-N4ixkUctInC142u_VYw',
        date: 1655424085168,
        picture: 'https://res.cloudinary.com/joseburgon/image/upload/v1658849965/eageowhybrc6dtj3cvqp.jpg',
        text: 'Hello world from mock data'
      })
  })

  test('actions: createEntry deleteEntry', async () => {
    const store = createVuexStore(journalState)

    const newEntry = {
      date: 1662935252,
      text: 'New entry from tests'
    }

    const entryId = await store.dispatch('journal/createEntry', newEntry)

    expect(typeof entryId).toBe('string')

    expect(
      store.state.journal.entries.some(e => e.id === entryId)
    )
      .toBeTruthy()

    await store.dispatch('journal/deleteEntry', entryId)

    expect(
      store.state.journal.entries.some(e => e.id === entryId)
    )
      .toBeFalsy()
  })
})