import daybookRouter from '@/modules/daybook/router'

describe('Daybook router module tests', () => {
  test('router should have this configuration', async () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any(Function)
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function)
        }
      ]
    })

    // expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected')
    // expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView')

    const promiseRoutes = []
    daybookRouter.children.forEach(child => promiseRoutes.push(child.component()))

    const routes = (await Promise.all(promiseRoutes)).map(route => route.default.name)

    expect(routes).toContain('NoEntrySelected')
    expect(routes).toContain('EntryView')
  })

  test('should return the route id', () => {
    const route = {
      params: {
        id: 'ABC-123'
      }
    }

    // expect(daybookRouter.children[1].props(route)).toEqual({ id: 'ABC-123' })

    const entryRoute = daybookRouter.children.find(route => route.name === 'entry')
    expect(entryRoute.props(route)).toEqual({ id: 'ABC-123' })
  })

})