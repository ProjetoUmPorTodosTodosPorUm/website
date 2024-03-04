<script lang="ts">
	import '$scss/routes/fields/page.scss'

    import termCommitment from '$assets/documents/administrative-documents/1-term-commitment.pdf'
    import internalRegiment from '$assets/documents/administrative-documents/2-internal-regiment.pdf'
    import hierarchicalBlockAttributionsHq from '$assets/documents/administrative-documents/3-hierarchical-block-attributions-hq.pdf'
    import hierarchicalBlockAttributionSubHq from '$assets/documents/administrative-documents/4-hierarchical-block-attributions-sub-hq.pdf'
    import hierarchicalBlockAttributionDistrictal from '$assets/documents/administrative-documents/5-hierarchical-block-attributions-districtal.pdf'
</script>

<h1>Documentos Administrativos</h1>

<ul class="pages">
    <li><a href={termCommitment} target="_blank">1- Termo de compromisso - Igreja</a></li>
    <li><a href={internalRegiment} target="_blank">2- Regimento Interno Projeto</a></li>
    <li><a href={hierarchicalBlockAttributionsHq} target="_blank">3- Bloco Hierárquico e Atribuições - SEDE</a></li>
    <li><a href={hierarchicalBlockAttributionSubHq} target="_blank">4- Bloco Hierárquico e Atribuições - subSEDE</a></li>
    <li><a href={hierarchicalBlockAttributionDistrictal} target="_blank">5- Bloco Hierárquico e Atribuições - DISTRITAL</a></li>
</ul>