const form = document.getElementById('image-form')
const image = document.getElementById('show-image')
const imageContainer = document.getElementById('image-container')
const submitButton = document.getElementById('submit-button')
const loadingButton = document.getElementById('loading-button')
if (!image.src) imageContainer.classList.add('hidden')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log('submitting form')
  const prompt = document.getElementById('prompt-input').value
  submitButton.classList.add('hidden')
  loadingButton.classList.remove('hidden')
  const res = await fetch('/api/create_image/', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const json = await res.json()
  const status = res.status
  if (status !== 200) return noResponse()
  updateImage(json.url)
})

const noResponse = () => {
  console.log('no response')
  const alert = document.getElementById('error-alert')
  alert.classList.remove('hidden')
  submitButton.classList.remove('hidden')
  loadingButton.classList.add('hidden')
  setTimeout(() => {
    alert.classList.add('hidden')
  }, 5000)
}

const updateImage = (url) => {
  console.log('updating image')
  image.src = url
  submitButton.classList.remove('hidden')
  loadingButton.classList.add('hidden')
  if (imageContainer.classList.contains('hidden')) {
    imageContainer.classList.remove('hidden')
  }
}
