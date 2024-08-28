<script lang="ts">
    import '$scss/components/faq/question.scss'

    //icons
	import { Icon } from 'svelte-icons-pack'
	import { FiChevronDown } from 'svelte-icons-pack/fi'

    export let title: string
    export let answerHTML: string

    function onQuestionToggle(event: Event) {
		// @ts-ignore
		const titleElem = event.currentTarget.parentNode
		const answerElem = titleElem.querySelector('.answer')
		const iconElem = titleElem.querySelector('.icon')
		toggleQuestion(answerElem, iconElem)
	}

	function toggleQuestion(answerElem: HTMLDivElement, iconElem: SVGElement) {
		iconElem.classList.toggle('open')
		if (answerElem.style.maxHeight) {
			// @ts-ignore
			answerElem.style.maxHeight = null
		} else {
			answerElem.style.maxHeight = `${answerElem.scrollHeight}px`
		}
	}
</script>

<div class="question-block">
    <div class="question" role="button" tabindex="0" on:click={onQuestionToggle} on:keypress={onQuestionToggle}>
        <h2>{title}</h2>
        <Icon src={FiChevronDown} className="icon" />
    </div>
    <div class="answer">
        {@html answerHTML}
    </div>
</div>