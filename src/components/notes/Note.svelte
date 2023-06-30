<script>
    import { draft } from '../../ts/stores'

    export let name = 'note'
    export let editing = false
</script>

{#if !editing}
    <p class="text-normal" style:--name={"'" + name + "'"}>
        {$draft[name]}
    </p>
{:else}
    <div>
        <p class="text-normal textarea-title">{name}</p>
        <textarea class="text-normal" {name} bind:value={$draft[name]} />
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
        padding: 0;
        border: none;
        border-radius: var(--border-radius);
        background: var(--grey);
        width: 100%;
        height: 100%;
        resize: none;
        color: var(--white);
        caret-color: var(--white);

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
