export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: 'Quo neque error repudiandae fuga? Ipsa laudantium molestias eos \n' +
        'sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam\n' +
        'recusandae alias error harum maxime adipisci amet laborum.',
      picture: null
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: 'Perspiciatis \n' +
        'minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velit \n' +
        'quibusdam sed amet tempora.',
      picture: null
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: 'Sit laborum ab, eius fugit doloribus tenetur \n' +
        'fugiat, temporibus enim commodi iusto libero magni deleniti quod quam \n' +
        'consequuntur! Commodi minima excepturi repudiandae velit hic maxime\n' +
        'doloremque.',
      picture: null
    }
  ]
})