<script>

    let count = 0
    function add() {

        count =  count + 1
    }

</script>

<button class="bg-sky-600 rounded-sm m-2" on:click={() => add()}> Count: {count} </button>