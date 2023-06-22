<script lang="ts">
    import './style/output/main.css'
    import Copyrights from './components/copyrights/Copyrights.svelte'
    import Header from './components/header/Header.svelte'
    import Draft from './components/draft/Draft.svelte'

    import logo from '/logo.png'
    import Footer from './components/footer/Footer.svelte'
</script>

<svelte:head>
    <link rel="icon" href={logo} />
    <title>Draft League of Legends</title>
</svelte:head>

<Draft />
<Footer />
<Copyrights />
