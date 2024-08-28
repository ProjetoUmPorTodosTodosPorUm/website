<script lang="ts">
    import '$scss/components/faq/index.scss'
    import questions from './questions.json'
    import Question from './question.svelte'
    

</script>

<section id="faq">
	<div class="wrap">
		<h1>Perguntas Frequentes</h1>

        <div class="questions">
            {#each questions as question}
                <Question {...question} />
            {/each}
        </div>
    </div> 
</section>