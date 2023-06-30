<script>
    import Header from '../header/Header.svelte'
    import ChampionPicked from './ChampionPicked.svelte'
    import DraftCenter from './DraftCenter.svelte'
    import { draft, editingMode } from '../../ts/stores'
    import Note from '../notes/Note.svelte'

    let champions
    draft.subscribe((value) => {
        champions = value
    })
</script>

<div id="draft">
    <div class="notes-container">
        <Note editing={$editingMode} name="Bans blue" />
        <Note editing={$editingMode} name="Blue 1" />
        <div class="notes-duo-container">
            <Note editing={$editingMode} name="Blue 2"  />
            <Note editing={$editingMode} name="Blue 3" />
        </div>
        <div class="notes-duo-container">
            <Note editing={$editingMode} name="Blue 4"  />
            <Note editing={$editingMode} name="Blue 5" />
        </div>
    </div>
    <main>
        <Header />

        <div class="draft-center">
            <div class="champions-picked">
                <ChampionPicked
                    championName={champions.b1}
                    team="b"
                    pickId={1}
                />
                <div class="container-duo-champions">
                    <ChampionPicked
                        championName={champions.b2}
                        team="b"
                        pickId={2}
                    />
                    <ChampionPicked
                        championName={champions.b3}
                        team="b"
                        pickId={3}
                    />
                </div>
                <div class="container-duo-champions">
                    <ChampionPicked
                        championName={champions.b4}
                        team="b"
                        pickId={4}
                    />
                    <ChampionPicked
                        championName={champions.b5}
                        team="b"
                        pickId={5}
                    />
                </div>
            </div>

            <DraftCenter />

            <div class="champions-picked">
                <div class="container-duo-champions">
                    <ChampionPicked
                        championName={champions.r1}
                        team="r"
                        pickId={1}
                    />
                    <ChampionPicked
                        championName={champions.r2}
                        team="r"
                        pickId={2}
                    />
                </div>
                <div class="container-duo-champions">
                    <ChampionPicked
                        championName={champions.r3}
                        team="r"
                        pickId={3}
                    />
                    <ChampionPicked
                        championName={champions.r4}
                        team="r"
                        pickId={4}
                    />
                </div>
                <ChampionPicked
                    championName={champions.r5}
                    team="r"
                    pickId={5}
                />
            </div>
        </div>
    </main>
    <div class="notes-container right">
        <Note editing={$editingMode} name="Bans red" />
        <div class="notes-duo-container">
            <Note editing={$editingMode} name="Red 1" />
            <Note editing={$editingMode} name="Red 2" />
        </div>
        <div class="notes-duo-container">
            <Note editing={$editingMode} name="Red 3" />
            <Note editing={$editingMode} name="Red 4" />
        </div>
        <Note editing={$editingMode} name="Red 5" />
    </div>
</div>

<style lang="postcss">
    #draft {
        display: grid;
        grid-template-columns: 1fr min(100%, 1000px) 1fr;
        grid-template-areas: '. main .';
        align-items: center;
        align-items: end;
        gap: var(--gap-l);
        background: var(--black);
        width: 100%;

        @media screen and (max-width: 1300px) {
            grid-template-columns: 1fr;
            grid-template-areas: 'main';
        }
    }

    main {
        display: flex;
        grid-area: main;
        flex-direction: column;
        gap: var(--gap-l);
    }

    .draft-center {
        display: flex;
        gap: var(--gap-l);
        width: 100%;
        height: calc(100px * 5 + var(--gap-l) * 2 + var(--gap-s) * 2);

        @media screen and (max-width: 830px) {
            height: calc(80px * 5 + var(--gap-l) * 2 + var(--gap-s) * 2);
        }
    }

    .champions-picked {
        display: flex;
        flex-direction: column;
        gap: var(--gap-l);

        & .container-duo-champions {
            display: flex;
            flex-direction: column;
            gap: var(--gap-s);
        }
    }

    .notes-container {
        display: grid;
        grid-template-rows: 60px 100px calc(100px * 2 + var(--gap-s)) calc(
                100px * 2 + var(--gap-s)
            );
        grid-template-columns: 1fr;
        gap: var(--gap-l);

        &.right {
            grid-template-rows:
                60px calc(100px * 2 + var(--gap-s)) calc(100px * 2 + var(--gap-s))
                100px;
        }

        & .notes-duo-container {
            display: grid;
            grid-template-rows: 100px 100px;
            grid-template-columns: 1fr;
            gap: var(--gap-s);
        }

        @media screen and (max-width: 1300px) {
            display: flex;
            flex-direction: column;
            gap: var(--gap-s);

            & .notes-duo-container {
                display: flex;
                flex-direction: column;
                gap: var(--gap-s);
            }
        }
    }
</style>
