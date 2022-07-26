import { shallowMount } from '@vue/test-utils'
import Fab from '@/modules/daybook/components/Fab'

describe('Fab view tests', () => {
  test('Should show the default icon', () => {
    const wrapper = shallowMount(Fab)

    const iTag = wrapper.find('i')

    expect(iTag.classes('fa-plus')).toBeTruthy()
  })

  test('Should show the fa-circle icon', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle'
      }
    })

    const iElement = wrapper.find('i')

    expect(iElement.classes()).toContain('fa-circle')
  })

  test('Should emit the on:click event when clicked', () => {
    const wrapper = shallowMount(Fab)

    wrapper.find('button').trigger('click')

    expect(wrapper.emitted('on:click')).toHaveLength(1)
  })
})