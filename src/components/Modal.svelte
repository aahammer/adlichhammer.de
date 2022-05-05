<script>

    import LoadingSpinnner from '../components/LoadingSpinnner.svelte'
    import ModalStore from '../stores/ModalStore.js'

    let state = ''
    let display = false

    ModalStore.subscribe( store => {

      state = store.state
      display = store.display

    })


    function closeModal() {

      ModalStore.update(store => {
          store.display = false
          store.state = ''
          return store
        })

    }



    // Sending message is not yet supported
    let popupTexts = { sending: "Sending message", success: "Message transmitted", error: "Something went wrong" }

</script>


{#if display}

<div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
  
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
  
      <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
    
            {#if state === 'success' }
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                    <svg class="h-6 w-6 text-green-600 bg-green-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            {/if}
          
            {#if state === 'sending' }
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white">
                    <LoadingSpinnner/>
                </div>
            {/if}
    
            {#if state === 'error' }
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                    <svg class="h-6 w-6 text-red-600 bg-red-100" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
            {/if}

         <div>
   

          <div class="py-4 mt-3 text-center sm:mt-5">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">{popupTexts[state]}</h3>
          </div>
          {#if state === 'error'}
          <div class='pt-8'> You can also contact me via email: <br/> 
            support@adlichhammer.de <br/>  or via phone: <br/> +49 178 105 8337 </div>
          {/if}
        </div>
        <div class="mt-5 sm:mt-6 w-full flex justify-center">

         {#if state !== 'sending'}
          <button on:click={closeModal} type="button" class="justify-center w-2/3 inline-flex  rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 md:w-1/2 sm:text-sm">
            <nobr>Back to page </nobr>
          </button>
         {/if}

        </div>
      </div>
    </div>
  </div>

{/if}