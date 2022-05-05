import { writable } from "svelte/store"

const ModalStore = writable(
    {
        state: '',
        display: false
    }

)

export default ModalStore

