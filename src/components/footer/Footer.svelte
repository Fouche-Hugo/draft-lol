<script lang="ts">
    import html2canvas from 'html2canvas'
    import { clearDraft, draft, editingMode } from '../../ts/stores'
    import { tick } from 'svelte'
    import { encodeDraftLink } from '../../ts/functions'

    let champions
    draft.subscribe((value) => {
        champions = value
    })

    function link() {
        const url = new URL(window.location.href)

        // let encodedValue = encode(Msgpack.encode($draft))
        let encodedValue = encodeDraftLink(champions)
        // let decodedValue = Msgpack.decode(decode(encodedValue))

        url.searchParams.set('draft', encodedValue)

        navigator.clipboard.writeText(url.toString())
    }

    async function screenshot() {
        editingMode.set(false)
        await tick()
        const screenshotTarget = document.querySelector('#draft') as HTMLElement

        if (!screenshotTarget) {
            return
        }

        html2canvas(screenshotTarget).then((canvas) => {
            canvas.toBlob((blob) => {
                const item = new ClipboardItem({ 'image/png': blob })
                navigator.clipboard.write([item])
            })
        })
    }

    function updateEditingMode() {
        editingMode.update((value) => !value)
    }

    function clearAll() {
        clearDraft()
    }
</script>

<footer>
    <div class="options-container">
        <div class="buttons-container">
            <button on:click={screenshot}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g id="copy-image-svgrepo-com 1">
                        <g id="&#240;&#159;&#148;&#141;-Product-Icons">
                            <g id="ic_fluent_copy_image_24_regular">
                                <path
                                    id="&#240;&#159;&#142;&#168;-Color"
                                    d="M18.3378 2.66666C19.8808 2.66666 21.1513 3.83329 21.3154 5.3326L23.6667 5.33332C25.2545 5.33332 26.5542 6.56687 26.6598 8.12792L26.6667 8.33332V10.3299C26.6667 10.8822 26.219 11.3299 25.6667 11.3299C25.1604 11.3299 24.742 10.9537 24.6758 10.4656L24.6667 10.3299V8.33332C24.6667 7.82706 24.2905 7.40867 23.8024 7.34245L23.6667 7.33332L20.8244 7.3331C20.2864 8.13212 19.3735 8.65773 18.3378 8.65773H13.6622C12.6265 8.65773 11.7136 8.13212 11.1756 7.3331L8.33334 7.33332C7.82708 7.33332 7.40869 7.70953 7.34247 8.19763L7.33334 8.33332V26.3394C7.33334 26.8457 7.70955 27.2641 8.19765 27.3303L8.33334 27.3394H10.3397C10.892 27.3394 11.3397 27.7872 11.3397 28.3394C11.3397 28.8457 10.9635 29.2641 10.4754 29.3303L10.3397 29.3394H8.33334C6.74552 29.3394 5.44582 28.1059 5.34026 26.5448L5.33334 26.3394V8.33332C5.33334 6.7455 6.56689 5.4458 8.12795 5.34024L8.33334 5.33332L10.6846 5.3326C10.8487 3.83329 12.1192 2.66666 13.6622 2.66666H18.3378ZM25 13.3333C27.3932 13.3333 29.3333 15.2734 29.3333 17.6667V25C29.3333 27.3932 27.3932 29.3333 25 29.3333H17.6667C15.2734 29.3333 13.3333 27.3932 13.3333 25V17.6667C13.3333 15.2734 15.2734 13.3333 17.6667 13.3333H25ZM25.7821 27.199L22.0405 23.4547C21.6854 23.0997 21.1298 23.0674 20.7383 23.3578L20.6262 23.4546L16.8832 27.1985C17.1281 27.2858 17.3918 27.3333 17.6667 27.3333H25C25.2744 27.3333 25.5376 27.286 25.7821 27.199ZM25 15.3333H17.6667C16.378 15.3333 15.3333 16.378 15.3333 17.6667V25C15.3333 25.2748 15.3809 25.5386 15.4681 25.7835L19.212 22.0403C20.3279 20.9247 22.1038 20.8716 23.2825 21.881L23.4547 22.0404L27.1986 25.7835C27.2858 25.5386 27.3333 25.2748 27.3333 25V17.6667C27.3333 16.378 26.2887 15.3333 25 15.3333ZM24 17.3364C24.7364 17.3364 25.3333 17.9333 25.3333 18.6697C25.3333 19.4061 24.7364 20.0031 24 20.0031C23.2636 20.0031 22.6667 19.4061 22.6667 18.6697C22.6667 17.9333 23.2636 17.3364 24 17.3364ZM18.3378 4.66666H13.6622C13.1124 4.66666 12.6667 5.11237 12.6667 5.66219C12.6667 6.21201 13.1124 6.65773 13.6622 6.65773H18.3378C18.8876 6.65773 19.3333 6.21201 19.3333 5.66219C19.3333 5.11237 18.8876 4.66666 18.3378 4.66666Z"
                                    fill="#D3E2E7"
                                />
                            </g>
                        </g>
                    </g>
                </svg>
                <span class="text-normal">Copy the draft as image</span>
            </button>

            <button on:click={link}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18.3378 8.65773H13.6622C12.6265 8.65773 11.7136 8.13212 11.1756 7.3331L8.33334 7.33332C7.82708 7.33332 7.40869 7.70953 7.34247 8.19763L7.33334 8.33332V26.3394C7.33334 26.8457 7.70955 27.2641 8.19765 27.3303L8.46904 27.3486C8.95714 27.4148 9.33334 27.8332 9.33334 28.3394C9.33334 28.8917 8.88563 29.3394 8.33334 29.3394C6.74552 29.3394 5.44582 28.1059 5.34026 26.5448L5.33334 26.3394V8.33332C5.33334 6.7455 6.56689 5.4458 8.12794 5.34024L8.33334 5.33332L10.6846 5.3326C10.8487 3.83329 12.1192 2.66666 13.6622 2.66666H18.3378C19.8808 2.66666 21.1513 3.83329 21.3154 5.3326L23.6667 5.33332C25.2545 5.33332 26.5542 6.56687 26.6598 8.12792L26.6667 8.33332V15.6723C26.6667 16.2246 26.219 16.6723 25.6667 16.6723C25.1604 16.6723 24.742 16.2961 24.6758 15.808L24.6667 15.6723V8.33332C24.6667 7.82706 24.2905 7.40867 23.8024 7.34245L23.6667 7.33332L20.8244 7.3331C20.2864 8.13212 19.3735 8.65773 18.3378 8.65773ZM22.6667 18.6634H24C26.9455 18.6634 29.3333 21.0512 29.3333 23.9967C29.3333 26.853 27.0881 29.1848 24.2718 29.3235L24.0061 29.33L22.6728 29.3362C21.9364 29.3395 21.3367 28.7453 21.3333 28.0089C21.3302 27.3252 21.8423 26.7592 22.5051 26.6792L22.6606 26.6695L24 26.6634C25.4728 26.6634 26.6667 25.4695 26.6667 23.9967C26.6667 22.5909 25.5788 21.4391 24.199 21.3373L24 21.33H22.6667C21.9303 21.33 21.3333 20.7331 21.3333 19.9967C21.3333 19.3129 21.8481 18.7493 22.5112 18.6723L22.6667 18.6634ZM16.6667 18.6695H18C18.7364 18.6695 19.3333 19.2664 19.3333 20.0028C19.3333 20.6866 18.8186 21.2502 18.1555 21.3272L18 21.3361H16.6667C15.1939 21.3361 14 22.5301 14 24.0028C14 25.4086 15.0878 26.5604 16.4677 26.6622L16.6667 26.6695H18C18.7364 26.6695 19.3333 27.2664 19.3333 28.0028C19.3333 28.6866 18.8186 29.2502 18.1555 29.3272L18 29.3361H16.6667C13.7212 29.3361 11.3333 26.9483 11.3333 24.0028C11.3333 21.1466 13.5786 18.8147 16.4005 18.676L16.6667 18.6695ZM16.6648 22.6664H24C24.7364 22.6664 25.3333 23.2634 25.3333 23.9998C25.3333 24.6835 24.8186 25.2471 24.1555 25.3241L24 25.3331H16.6648C15.9284 25.3331 15.3314 24.7361 15.3314 23.9998C15.3314 23.316 15.8461 22.7524 16.5093 22.6754L16.6648 22.6664ZM18.3378 4.66666H13.6622C13.1124 4.66666 12.6667 5.11237 12.6667 5.66219C12.6667 6.21201 13.1124 6.65773 13.6622 6.65773H18.3378C18.8876 6.65773 19.3333 6.21201 19.3333 5.66219C19.3333 5.11237 18.8876 4.66666 18.3378 4.66666Z"
                        fill="#D3E2E7"
                    />
                </svg>
                <span class="text-normal">Share a link of this draft</span>
            </button>
        </div>
        <div class="buttons-container">
            <button on:click={updateEditingMode}>
                <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M22.4827 5.98266L24.732 3.73199C25.2009 3.26309 25.8369 2.99966 26.5 2.99966C27.1631 2.99966 27.7991 3.26309 28.268 3.73199C28.7369 4.2009 29.0003 4.83687 29.0003 5.49999C29.0003 6.16312 28.7369 6.79909 28.268 7.26799L14.1093 21.4267C13.4044 22.1311 12.5352 22.649 11.58 22.9333L8 24L9.06667 20.42C9.35104 19.4648 9.86885 18.5956 10.5733 17.8907L22.4827 5.98266ZM22.4827 5.98266L26 9.49999M24 18.6667V25C24 25.7956 23.6839 26.5587 23.1213 27.1213C22.5587 27.6839 21.7956 28 21 28H7C6.20435 28 5.44129 27.6839 4.87868 27.1213C4.31607 26.5587 4 25.7956 4 25V11C4 10.2043 4.31607 9.44128 4.87868 8.87867C5.44129 8.31606 6.20435 7.99999 7 7.99999H13.3333"
                        stroke="#D3E2E7"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
                <span class="text-normal">Note editing mode</span>
            </button>
            <button on:click={clearAll}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                >
                    <path
                        stroke="#D3E2E7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                </svg>
                <span class="text-normal">Clear all</span>
            </button>
        </div>
    </div>

    <div class="tutorial-container">
        <h2 class="text-medium">How do I draft ?</h2>
        <p>Drag and drop champions into the wanted positions.</p>
        <p>Click on a champion to remove it.</p>
    </div>
</footer>

<style lang="postcss">
    footer {
        display: flex;
        flex-direction: column;
        gap: var(--gap-s);
        border-radius: var(--border-radius);
        background: var(--grey);
        padding: var(--gap-s);
        width: min(100%, 1000px);
        color: var(--white);

        @media screen and (max-width: 1300px) {
            width: 100%;
        }
    }

    .options-container {
        display: flex;
        justify-content: space-between;
        gap: var(--gap-l);

        @media screen and (max-width: 600px) {
            flex-direction: column;
            gap: var(--gap-s);
        }

        & .buttons-container {
            display: flex;
            flex-direction: column;
            gap: var(--gap-s);
        }
    }

    button {
        display: flex;
        align-items: center;
        gap: var(--gap-s);
        cursor: pointer;
        border: none;
        background: transparent;
        padding: 0;
        width: fit-content;

        & span {
            color: var(--white);
            text-decoration: underline;
        }
    }

    .tutorial-container {
        display: flex;
        flex-direction: column;
        gap: var(--gap-xs);

        & h2 {
            margin: 0;
            padding: 0;
        }

        & p {
            margin: 0;
            padding: 0;
        }
    }
</style>
