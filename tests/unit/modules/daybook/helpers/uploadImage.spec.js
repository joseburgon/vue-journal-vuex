import axios from 'axios'
import cloudinary from 'cloudinary'

import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
  cloud_name: 'joseburgon',
  api_key: '691612728492268',
  api_secret: 'LVcMr2F8VwLEr84ve_pWqJBArH8'
})

describe('uploadImage helper tests', () => {
  test('should load a file and return the url', async () => {
    const { data } = await axios.get('https://res.cloudinary.com/joseburgon/image/upload/v1658848992/cld-sample-5.jpg', {
      responseType: 'arraybuffer'
    })

    const file = new File([data], 'random-picture.jpg')

    const url = await uploadImage(file)

    expect(typeof url).toBe('string')

    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')
    cloudinary.v2.api.delete_resources(imageId)
  })
})