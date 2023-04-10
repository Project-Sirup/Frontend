<script>
    import { error } from "../stores/Error";
</script>

<style>
    .error {
        position: fixed;
        top: 35%;
        left: 50%;
        transform: translate(-50%, 50%);
        color: rgba(255, 255, 255, .5);
        font-style: italic;
        text-align: center;
        font-size: 2rem;
    }
</style>

<div class="error">
    {$error?.code} <br>
    {$error?.message}
</div>