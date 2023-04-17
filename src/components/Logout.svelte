<script lang="ts">
    import uvm from "../stores/User";

    const logout = () => {
        uvm().logout()
        .then(() =>  window.location.href = "/");
    }

</script>

<style>
    button {
        width: inherit;
        color: white;
        background-color: rgba(0,0,0,.5);
        border: none;
        cursor: pointer;
        padding: .25rem;
    }
</style>

<button on:click={logout}>
    Logout
</button>