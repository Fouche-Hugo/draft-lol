<script>
    export let commentary = ''
    export let name = 'note'
    export let editing = false
</script>

{#if !editing}
    <p class="text-normal" style:--name={"'" + name + "'"}>
        {commentary}
    </p>
{:else}
    <div>
        <p class="text-normal textarea-title">{name}</p>
        <textarea {name} bind:value={commentary} />
    </div>
{/if}

<style lang="postcss">
    p {
        margin: 0;
        padding: 0;
        overflow: hidden;
        color: var(--white);

        @media screen and (max-width: 1300px) {
            &::before {
                content: var(--name) ' : ';
            }
        }
    }

    textarea {
        border: none;
        border-radius: var(--border-radius);
        background: var(--grey);
        resize: none;
        color: var(--white);
        caret-color: var(--white);
        height: 100%;
        width: 100%;

        &:focus {
            outline: none;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        gap: var(--gap-s);
        width: 100%;
    }

    .textarea-title {
        display: none;

        @media screen and (max-width: 1300px) {
            display: block;
        }
    }
</style>
