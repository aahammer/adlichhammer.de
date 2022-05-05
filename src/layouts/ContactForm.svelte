<script>

  // Handle Popup Dialog     
  import Modal from '../components/Modal.svelte'
  import ModalStore from '../stores/ModalStore.js'

     // Handle Form
  import { reporter, ValidationMessage } from '@felte/reporter-svelte'
  import { createForm } from 'felte'

   let sendMailUrl = 'http://localhost:64879/.netlify/functions/sendMail'
  //let sendMailUrl = 'http://localhost:58241/.netlify/functions/helloworld'
  //let sendMailUrl = '#'


   // only to reset after submit
  let email = ''
  // reset after submit and shorten to allowed characters
  let subject = ''
  let message = ''


const { form, errors } = createForm({

  validate: (values) => {
    const errors = {}
    if ( values.email && !/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(values.email)) {
      errors.email = 'Please enter a valid email adress';
    }
    if (!values.subject) errors.subject = ['Please enter a subject']
    if (!values.message ) {
      errors.message = ['Please enter a message']
    }
    if ( values.message && values.message.length > 500 ) {
      message = message.substring(0,500)
    }    
    if ( values.subject && values.subject.length > 100 ) {
      subject = subject.substring(0,100)
    }

    return errors
  },
  extend: reporter,
})

function handleSuccess(event) {

   const { response, ...context } = event.detail

   ModalStore.update( store => {
    store.display = true
    store.state = 'success'
    return store
  }) 

  email = ''
  subject = ''
  message = ''

}

function handleError(event) {

    const { error, ...context } = event.detail
    const response = error.response

   ModalStore.update( store => {
    store.display = true
    store.state = 'error'
    return store
  })



}

 let count = 0
    function add() {

        count =  count + 1
    }

</script>
      
<!--button class=" bg-fuchsia-600 rounded-sm m-2" on:click={() => add()}> Count: {count} </button-->
  

<Modal />

<h3 class="text-lg font-medium text-warm-gray-900">Send me a message</h3>
<form  use:form action={sendMailUrl} method="GET" 
    on:feltesuccess="{handleSuccess}"
    on:felteerror="{handleError}" 
      class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">

<div>
  <label for="email" class="block text-sm font-medium text-warm-gray-900">Email</label>
  <div class="mt-1">
    <input bind:value={email} id="email" name="email" type="email" autocomplete="email" 
          class="font-serif py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-blue-700 focus:border-blue-700 border-warm-gray-300 rounded-md">
  </div>
</div>
<div class="sm:col-span-2">
  <div class="flex justify-between">
      <label for="subject" class="block text-sm font-medium text-warm-gray-900">Subject *</label>
      <span id="message-max" class="font-serif text-md text-warm-gray-500">max. 100 characters</span>
  </div>
  <div class="mt-1">
    <input  bind:value={subject} type="text" name="subject" id="subject" 
      class="font-serif py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-blue-700 focus:border-blue-700 border-warm-gray-300 rounded-md">
  </div>
</div>
<div class="sm:col-span-2">
  <div class="flex justify-between">
    <label for="message" class="block text-sm font-medium text-warm-gray-900">Message *</label>
    <span id="message-max" class="font-serif text-md text-warm-gray-500">max. 500 characters</span>
  </div>
  <div class="mt-1">
    <textarea  bind:value={message} id="message" name="message" rows="4" 
      class="font-serif py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-blue-700 focus:border-blue-700 border border-warm-gray-300 rounded-md" aria-describedby="message-max"></textarea>
  </div>
</div>
<div class="sm:col-span-2 sm:flex sm:justify-end">
  <button  type="submit" class="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 sm:w-auto">
      Submit
  </button>
</div>

<div class="font-serif  text-red-600">

  <ValidationMessage  for="email"  let:messages={messages}  >
    <div>{messages || ''} </div>
    <div class="text-white" slot="placeholder">x</div>
  </ValidationMessage>
  <ValidationMessage  for="subject"  let:messages={messages}  >
      <div>{messages || ''} </div>
      <div class="text-white" slot="placeholder">x</div>
  </ValidationMessage>
  <ValidationMessage  for="message"  let:messages={messages}  >
      <div>{messages || ''} </div>
      <div class="text-white" slot="placeholder">x</div>
  </ValidationMessage>
</div>
</form>

