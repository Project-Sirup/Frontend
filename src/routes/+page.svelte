<script lang="ts">
	import { onMount } from "svelte";
	import uvm from "../stores/User";
	import ColorBackground from "../components/ColorBackground.svelte";

    onMount(() => {
        uvm().init()
        .then(isLoggedIn => {
        if (isLoggedIn) {
          window.location.href = "/tool";
        }
        });
    });

</script>

<style global>
    .content {
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .header-title {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
    .user-access {
        display: flex;
        justify-content: center;
        gap: 5rem;
    }
    .inner-circle {
        height: 50px;
        aspect-ratio: 1/1;
        border-radius: 50px;
    }
    a {
        color: dodgerblue;
        background-color: rgba(0,0,0,.5);
        padding: 0 2rem;
        font-size: 1rem;
        font-weight: bold;
        text-decoration: none;
    }
    .user-access > a {
        transition: transform 250ms;
    }
    .user-access > a:hover {
        transform: translateY(-.25rem);
    }
</style>

<div class="content">
    <div class="header">
        <div class="header-title">
            <h1>Project-Sirup</h1>
            <div class="circle"> 
                <ColorBackground border_radius={"50%"}>
                    <div class="inner-circle"></div>
                </ColorBackground>
            </div>
        </div>
        <div class="header-subtitle">
            <h2>Microservice Development Tool</h2>
        </div>
    </div>
    <div class="user-access">
        <a href="/login"><h3>Log in</h3></a>
        <a href="/signup"><h3>Sign up</h3></a>
    </div>
</div>
