<script lang="ts">
	import '$scss/components/report.scss'
	import type { ReportDto } from '../types'
	import { ReportType } from '$enums'
	import { PUBLIC_FILES_URL } from '$env/static/public'

	// icon
	import { Icon } from 'svelte-icons-pack'
	import { FiPaperclip, FiChevronDown } from 'svelte-icons-pack/fi'

	export let report: ReportDto

	function onToggleReport(event: Event) {
		// @ts-ignore
		const reportElement = event.currentTarget.parentNode
		const bodyElement = reportElement.querySelector('.body')
		const iconElem = reportElement.querySelector('.head .icon')
		toggleReport(bodyElement, iconElem)
	}

	function toggleReport(bodyElement: HTMLDivElement, iconElem: SVGElement) {
		iconElem.classList.toggle('open')
		bodyElement.classList.toggle('open')
	}

	function placeComma(report: ReportDto, index: number) {
		return report.attachments.length >= 1 && index < report.attachments.length - 1 ? ',' : ''
	}

	function friendlyDateStringFromReport(report: ReportDto) {
		if (report.type != ReportType.ANNUAL) {
			return new Date(report.year, report.month as number).toLocaleDateString('pt-BR', {
				month: 'long',
				year: 'numeric'
			})
		} else {
			return new Date(report.year).toLocaleDateString('pt-BR', {
				year: 'numeric'
			})
		}
	}
</script>

<div class="report">
	<div class="head" on:click={onToggleReport} on:keypress={onToggleReport} role="button" tabindex="0">
		<h4>
			{report.title} | Postado em
			{new Date(report.createdAt).toLocaleDateString()}
		</h4>
		<Icon src={FiChevronDown} className="icon" />
	</div>
	<div class="body">
		<div class="text">{@html report.shortDescription}</div>
		<div class="info">
			{#if report.attachments?.length > 0}
				<div class="attachments pill">
					<Icon src={FiPaperclip} className="icon" title="anexo" />
					{#each report.attachments as attachment, index}
						<a href="{PUBLIC_FILES_URL}/{attachment}" target="_blank" rel="noreferrer"
							>{attachment}{placeComma(report, index)}</a
						>
					{/each}
				</div>
			{/if}
			<div class="date pill">
				{friendlyDateStringFromReport(report)}
			</div>
		</div>
	</div>
</div>
