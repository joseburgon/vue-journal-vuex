import { shallowMount } from '@vue/test-utils'
import About from '@/views/AboutView'

describe('About view tests', () => {
  test('Should render the component correctly', () => {
    const wrapper = shallowMount(About)

    expect(wrapper.html()).toMatchSnapshot()
  })
})