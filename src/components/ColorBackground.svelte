<script lang="ts">
    export let rounded: boolean = false;
    let border_radius = rounded ? "5px" : "0";
</script>

<div class="color-background" style="--border_radius:{border_radius}">
    <slot></slot>
</div>

<style>
    @property --color-1 {
		syntax: '<color>';
		inherits: true;
		initial-value: cyan;
	}
	@property --color-2 {
		syntax: '<color>';
		inherits: true;
		initial-value: magenta;
	}
	@property --angle {
		syntax: '<angle>';
		inherits: true;
		initial-value: 0deg;
	}
	@keyframes move {
		50%{
			--angle: 360deg;
            --color-1: magenta;
            --color-2: cyan;
		}
	}

    .color-background {
        background: linear-gradient(var(--angle), var(--color-2), var(--color-1));
		width: calc(100% + 4px);
		height: fit-content;
		animation: move 15000ms infinite alternate;
        border-radius: var(--border_radius);
    }
</style>