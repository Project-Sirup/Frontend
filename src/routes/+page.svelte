<script lang="ts">
	import LoginForm from "../components/LoginForm.svelte";


</script>

<style>
    .circle {
        background: linear-gradient(90deg, cyan, magenta);
        height: 100px;
        aspect-ratio: 1/1;
        border-radius: 50px;
    }
</style>


<div class="circle"></div>
<a href="/user">User</a>
<LoginForm></LoginForm>
