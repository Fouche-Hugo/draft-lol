<script>
    import Header from '../header/Header.svelte'
    import ChampionPicked from './ChampionPicked.svelte'
    import DraftCenter from './DraftCenter.svelte'
    import { draft } from '../../ts/stores'
    
    let champions
    draft.subscribe((value) => {
		champions = value;
	});
</script>

<div id="draft">
    <Header />
    <main>
        <div class="champions-picked">
            <ChampionPicked championName={champions.b1} team="b" pickId={1} />
            <div class="container-duo-champions">
                <ChampionPicked championName={champions.b2} team="b" pickId={2} />
                <ChampionPicked championName={champions.b3} team="b" pickId={3} />
            </div>
            <div class="container-duo-champions">
                <ChampionPicked championName={champions.b4} team="b" pickId={4} />
                <ChampionPicked championName={champions.b5} team="b" pickId={5} />
            </div>
        </div>

        <DraftCenter />

        <div class="champions-picked">
            <div class="container-duo-champions">
                <ChampionPicked championName={champions.r1} team="r" pickId={1} />
                <ChampionPicked championName={champions.r2} team="r" pickId={2} />
            </div>
            <div class="container-duo-champions">
                <ChampionPicked championName={champions.r3} team="r" pickId={3} />
                <ChampionPicked championName={champions.r4} team="r" pickId={4} />
            </div>
            <ChampionPicked championName={champions.r5} team="r" pickId={5} />
        </div>
    </main>
</div>

<style lang="postcss">
    #draft {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--gap-l);
        width: min(100%, 1000px);
        background: var(--black);
    }

    main {
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
</style>
