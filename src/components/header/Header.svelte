<script>
    import ChampionBanned from './ChampionBanned.svelte'
    import { draft } from '../../ts/stores'
    
    let champions
    draft.subscribe((value) => {
		champions = value;
	});
</script>

<header>
    <section class="container-team">
        <div class="team-color blue" />
        <div class="container-champions blue">
            <div class="container-trio-champions">
                <ChampionBanned championName={champions.ban0} banId={0} />
                <ChampionBanned championName={champions.ban1} banId={1} />
                <ChampionBanned championName={champions.ban2} banId={2} />
            </div>
            <div class="container-duo-champions">
                <ChampionBanned championName={champions.ban3} banId={3} />
                <ChampionBanned championName={champions.ban4} banId={4} />
            </div>
        </div>
    </section>

    <section class="container-team red">
        <div class="team-color red" />
        <div class="container-champions red">
            <div class="container-duo-champions">
                <ChampionBanned championName={champions.ban5} banId={5} />
                <ChampionBanned championName={champions.ban6} banId={6} />
            </div>
            <div class="container-trio-champions">
                <ChampionBanned championName={champions.ban7} banId={7} />
                <ChampionBanned championName={champions.ban8} banId={8} />
                <ChampionBanned championName={champions.ban9} banId={9} />
            </div>
        </div>
    </section>
</header>

<style lang="postcss">
    header {
        display: flex;
        justify-content: space-between;
        gap: var(--gap-l);
        width: 100%;
    }

    .container-team {
        display: flex;
        flex-direction: column;
        gap: var(--gap-s);

        & .team-color {
            border-radius: var(--border-radius);
            width: 100%;
            height: 30px;

            &.blue {
                background: var(--blue);
            }

            &.red {
                background: var(--red);
            }
        }
    }

    .container-champions {
        display: flex;
        gap: var(--gap-l);

        & .container-trio-champions,
        & .container-duo-champions {
            display: flex;
            gap: var(--gap-s);
        }

        @media screen and (max-width: 630px) {
            &.blue {
                flex-direction: column;
            }
            
            &.red {
                flex-direction: column-reverse;
                align-items: flex-end;
            }
        }
    }
</style>
