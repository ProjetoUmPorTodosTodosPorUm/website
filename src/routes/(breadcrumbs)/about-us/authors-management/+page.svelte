<script lang="ts">
	import '$scss/routes/fields/page.scss'

	import insertionHqChurch from '$assets/documents/authors-management/1-insertion-hq-church.pdf'
	import demarcationMissionaryField from '$assets/documents/authors-management/2-demarcation-missionary-field-01-Jd-bangu.pdf'
	import listVolunteers from '$assets/documents/authors-management/3-list-volunteers.pdf'
	import visionChurch from '$assets/documents/authors-management/4-vision-church.jpg'
	import ministerialDecisionHqChurch from '$assets/documents/authors-management/5-ministerial-decision-hq-church.pdf'
	import monetaryOfferSedeChurch from '$assets/documents/authors-management/6-monetary-offer-sede-church.jpg'
	import peopleVisitedSedeChurch from '$assets/documents/authors-management/7-people-visited-sede-church.pdf'
	import welcomedFamilies from '$assets/documents/authors-management/8-welcomed-families.pdf'
	import finalReport2018 from '$assets/documents/authors-management/9-final-report-2018.pdf'
	import mapa from '$assets/documents/authors-management/11-mapa.pdf'

	import jQuery from '$assets/fresco/js/jquery-3.7.1.min.js?url'
	import frescoJS from '$assets/fresco/js/fresco.min.js?url'
	import '$assets/fresco/css/fresco.css'

	import drAntonioAssistantAlex from '$assets/images/authors-management/collaborators/1-dr-antonio-assistant-alex.jpg'
	import polycrineManoelGuilherme from '$assets/images/authors-management/collaborators/2-polycrine-manoel-guilherme-da-silveira-filho-06-2012.jpg'
	import polycrineManoelGuilherme2 from '$assets/images/authors-management/collaborators/3-polycrine-manoel-guilherme-da-silveira-filho-06-2012.jpg'
	import reinaldoSilvaHortisFrutis from '$assets/images/authors-management/collaborators/4-reinaldo-silva-hortis-frutis-vitor.jpg'
	import hqChurch from '$assets/images/authors-management/headquarter-church/hq-church.jpg'
	import shekinah from '$assets/images/authors-management/headquarter-church/shekinah-01-2012.jpg'
	import communityOffer from '$assets/images/authors-management/others/1-community-offer-basket -april-2012.jpg'
	import tshirtHqChurch from '$assets/images/authors-management/others/2-tshirt-hq-church-2012.jpg'
	import projectReceipt from '$assets/images/authors-management/others/3-project-receipt.jpg'
	import mapAraquem from '$assets/images/authors-management/others/4-map-araquem-strt-1367-bangu.jpg'
	import shekinahMeetingMarch from '$assets/images/authors-management/others/5-shekinah-meeting-march-11-2012.jpg'
	import shekinahMeetingjan from '$assets/images/authors-management/others/6-shekinah-meeting-jan-2012.jpg'
	import shekinahMeetingjan2 from '$assets/images/authors-management/others/7-meeting-jan-2012.jpg'
	import ricardoSabrina from '$assets/images/authors-management/others/8-pr-ricardo-pr-sabrina-02-14-2018.jpg'
	import musicalRuasRio from '$assets/images/authors-management/others/9-musical-pelas-ruas-rio-05-sep-2015.jpg'
	import presentationMusicalRuasRio from '$assets/images/authors-management/others/10-1-presentation-musical-nov-2015.jpg'
	import sheilaIbeSonWilma from '$assets/images/authors-management/others/11-sheila-ibe-colleague-son-wilma-2012.jpg'
	import marcioOfferBasket from '$assets/images/authors-management/others/12-marcio-luiz-offer-basket-shekinah-april -2013.jpg'
	import aldoWilmaFoodBasket from '$assets/images/authors-management/others/13-pr-aldo-wilma-food-offering-basket.jpg'
	import torquatoReceivesTshirt from '$assets/images/authors-management/others/14-torquato-receives-project-tshirt-general-meeting-20-11-2017.jpg'
	import torquatoReceivesTshirt2 from '$assets/images/authors-management/others/15-torquato-receives-project-tshirt-general-meeting-20-11-2017.jpg'
	import torquatoReceivesTshirt3 from '$assets/images/authors-management/others/16-torquato-receives-project-tshirt-general-meeting-20-11-2017.jpg'
	import statutoryBoard from '$assets/images/authors-management/volunteers/1-statutory-board-oct-2011-january-2014.jpg'
	import wilmaMachado from '$assets/images/authors-management/volunteers/1-wilma-machado-author-general-coordinator.jpg'
	import churchShekinahPres from '$assets/images/authors-management/volunteers/2-church-shekinah-pres-pastor-aldo-da-silva-gomes-filho-pres-project-oct-2011-jan-2014.jpg'
	import churchShekinahVicePres from '$assets/images/authors-management/volunteers/3-church-shekinah-vice-pres-pastor-ronaldo-moreira-pres-project-oct-2011-jan-2014.jpg'
	import janainaSantos from '$assets/images/authors-management/volunteers/130-02-janaina-dos-santos-lustosa-collector-f1-Jul-2011-sep-2011.jpg'
	import renataFigueiredo from '$assets/images/authors-management/volunteers/130-03-renata-figueira-gama-licezer-f1-jun-2011-sep-2011.jpg'
	import anaPaula from '$assets/images/authors-management/volunteers/130-05-ana-paula-da-conceicao-alves-collector-f1-june-2011-Jul-2012.jpg'
	import mariaAlves from '$assets/images/authors-management/volunteers/130-06-maria-alves-riff-f1-Jul-2011-july-2012.jpg'
	import audiceiaHilario from '$assets/images/authors-management/volunteers/130-07-audiceia-hilario-f1-june-2011-july-2012.jpg'
	import patriciaBernado from '$assets/images/authors-management/volunteers/130-09-patricia-bernardo-moreira-f1-oct-2011-july-2012.jpg'
	import mariaCelia from '$assets/images/authors-management/volunteers/130-10-maria-celia-epifanio-f1-oct-2011-jul-2012.jpg'
	import joseEdne from '$assets/images/authors-management/volunteers/130-14-jose-edne-matias-dos-santos-jan-2012-jul-2014.jpg'
	import vagnerPereira from '$assets/images/authors-management/volunteers/130-15-vagner-pereira-lima-jan-2012-july-2014.jpg'
	import terezaRaquel from '$assets/images/authors-management/volunteers/130-16-tereza-raquel-da-silva-dealves-jan-2012-jan-2014.jpg'
	import DalvaFelix from '$assets/images/authors-management/volunteers/130-17-dalva-felix-amorim-Jan-2012-jan-2014.jpg'
	import rafaelMachado from '$assets/images/authors-management/volunteers/amebrrj-01-01-01-rafael-machado-dec-2011-mar-2018.png'
	import marcelleCoutinho from '$assets/images/authors-management/volunteers/amebrrj-01-01-02-marcelle-coutinho-de-oliveira-theodoro-jan-2012-mar-2018.jpg'
	import renanGalvao from '$assets/images/authors-management/volunteers/amebrrj-01-01-03-renan-galvao.jpg'
	import marcioLuiz from '$assets/images/authors-management/volunteers/amebrrj-01-01-04-marcio-luiz-tinoco-leite-jan-2014-mar-2018.jpg'
	import palomaMachado from '$assets/images/authors-management/volunteers/amebrrj-01-01-05-paloma-machado-jan-2014-mar-2018.jpg'
	import elisangelaBarbosa from '$assets/images/authors-management/volunteers/amebrrj-01-01-06-elisangela-costa-de-sa-barbosa-2011-mar-2018.jpg'
	import rosangelaMaria from '$assets/images/authors-management/volunteers/amebrrj-01-01-07-rosangela-maria-silva-de-almeida-f1.jpg'
	import authorMarcioPaloma from '$assets/images/authors-management/volunteers/author-assistant-marcio-luiz-paloma.jpg'
</script>

<svelte:head>
	<script type="text/javascript" src={jQuery} defer></script>
	<script type="text/javascript" src={frescoJS} defer></script>
</svelte:head>

<h1>Gestão da Autora</h1>
<h3>Documentos</h3>
<ul class="pages">
	<li><a href={insertionHqChurch} target="_blank">1- Inserção Igreja SEDE</a></li>
	<li><a href={demarcationMissionaryField} target="_blank">2- Demarcação do Campo Missionário 01 (Jardim Bangu)</a></li>
	<li><a href={listVolunteers} target="_blank">3- Relação de Voluntários</a></li>
	<li><a href={visionChurch} target="_blank">4- Visão da Igreja</a></li>
	<li><a href={ministerialDecisionHqChurch} target="_blank">5- Decisão Mininisterial da Igreja SEDE</a></li>
	<li><a href={monetaryOfferSedeChurch} target="_blank">6- Oferta monetária da Igreja SEDE</a></li>
	<li><a href={peopleVisitedSedeChurch} target="_blank">7- Pessoas visitaram Igreja SEDE</a></li>
	<li><a href={welcomedFamilies} target="_blank">8- Família Acolhidas</a></li>
	<li><a href={finalReport2018} target="_blank">9- Relatório final (2018)</a></li>
	<li><a href="#video-report-todo" target="_blank">10- Relatório em Vídeo</a></li>
	<li><a href={mapa} target="_blank">11- Mapa</a></li>
</ul>

<h3>Galeria</h3>
<ul class="pages">
	<li>
		<a
			href={hqChurch}
			class="fresco"
			data-fresco-group="headquarter-church"
			data-fresco-caption="Igreja SEDE Projeto Assembleia de Deus Ministério Shekinah - Pr.Pres. Aldo da Silva Gomes Filho - Jd. Bangu"
			data-fresco-group-options="loop: true"
		>
			Igreja SEDE
		</a>
	</li>
	<li>
		<a
			href={statutoryBoard}
			class="fresco"
			data-fresco-group="volunteers"
			data-fresco-caption="Diretoria Estatutária (Outubro de 2011 a Janeiro de 2014)"
			data-fresco-group-options="loop: true">Voluntários</a
		>
	</li>
	<li>
		<a
			href={drAntonioAssistantAlex}
			class="fresco"
			data-fresco-group="collaborators"
			data-fresco-caption="Dr Antônio e Assistente Alex"
			data-fresco-group-options="loop: true">Colaboradores</a
		>
	</li>
	<li>
		<a
			href={communityOffer}
			class="fresco"
			data-fresco-group="others"
			data-fresco-caption="Cesto de Oferta Comunitária - Abril 2012"
			data-fresco-group-options="loop: true"
		>
			Curiosidades
		</a>
	</li>
</ul>
<!-- SEDE Church -->
<a
	href={shekinah}
	class="fresco hidden"
	data-fresco-group="headquarter-church"
	data-fresco-caption="Família Shekinah Jan 2012"
>
	Image
</a>

<!-- Volunteers -->
<a
	href={wilmaMachado}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Ir. Wilma Machado (Autora e Coord. Geral)"
>
	Image
</a>
<a
	href={churchShekinahPres}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Igreja Ass. de Deus Min. Shekinah - Pres. Pastor Aldo da Silva Gomes Filho e Pres. Projeto (Outubro de 2011 a Janeiro de 2014)"
>
	Image
</a>
<a
	href={churchShekinahVicePres}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Igreja ass. de Deus Min. Shekinah - Vice-Pres. Pr. Ronaldo Moreira Pres. Projeto (Outubro de 2011 a Janeiro de 2014)"
>
	Image
</a>
<a
	href={janainaSantos}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Janaina dos Santos Lustosa (Coletor F-1 Resp. coleta da Rua Willians, Julho de 2011 a Setembro 2011)"
>
	Image
</a>
<a
	href={renataFigueiredo}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Renata Figueira Gama Licezer (Coletor F-1 Resp. coleta da Rua Montreal, Junho de 2011 a Setembro 2011)"
>
	Image
</a>
<a
	href={anaPaula}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="AnaPaula da Conceição Alves  (Coletor F-1 Resp. coleta da Rua Jordan, Junho de 2011 a Julho de 2012)"
>
	Image
</a>
<a
	href={mariaAlves}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Maria Alves Riff (Coletor F-1 Resp. coleta da Rua Marliéria, Julho de 2011 a Julho de 2012)"
>
	Image
</a>
<a
	href={audiceiaHilario}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Audicéa Hilário (Coletor F-1 Resp. coleta da Rua Benetton, Junho de 2011 a Julho de 2012)"
>
	Image
</a>
<a
	href={patriciaBernado}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Patrícia Bernardo Moreira (Coletora F-1 Resp. coleta da Rua Willians, Outubro de 2011 a Julho de 2012)"
>
	Image
</a>
<a
	href={mariaCelia}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Maria Célia Epifânio (Coletor F-1 Resp. coleta da Rua Montreal, Outubro de 2011 a Julho de 2012)"
>
	Image
</a>
<a
	href={joseEdne}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Evang. José Edne Matias dos Santos (Tesoureiro 2, Janeiro de 2012 a Julho de 2014)"
>
	Image
</a>
<a
	href={vagnerPereira}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Vagner Pereira Lima (Tesoureiro 1, Janeiro de 2012 a Julho de 2014)"
>
	Image
</a>
<a
	href={terezaRaquel}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Dc. Tereza Raquel da Silva Dealves (Coord. Campo externo, Janeiro de 2012 a Janeiro de 2014)"
>
	Image
</a>
<a
	href={DalvaFelix}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Dc. Dalva Félix Amorim (Coord. Campo interno, Janeiro de 2012 a Janeiro de 2014)"
>
	Image
</a>
<a
	href={rafaelMachado}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Rafael Machado (Designer Gráfico, Dezembro de 2011 a Março de 2018)"
>
	Image
</a>
<a
	href={marcelleCoutinho}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Marcelle Coutinho de Oliveira Theodoro (Designer Gráfica, Janeiro de 2012 a Março de 2018)"
>
	Image
</a>
<a
	href={renanGalvao}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Renan Galvão (Web Master)"
>
	Image
</a>
<a
	href={marcioLuiz}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Marcio Luiz Tinoco Leite (Ass. Direto Autora, Janeiro de 2014 a Março de 2018)"
>
	Image
</a>
<a
	href={palomaMachado}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Paloma Machado (Ass. Direto da Autora, Janeiro de 2014 a Março de 2018)"
>
	Image
</a>
<a
	href={elisangelaBarbosa}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Elisangela Costa de Sá Barbosa (Apoio Geral, 2011 a Março de 2018)"
>
	Image
</a>
<a
	href={rosangelaMaria}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Rosângela Maria Silva de Almeida (Coletora F-1)"
>
	Image
</a>
<a
	href={authorMarcioPaloma}
	class="fresco hidden"
	data-fresco-group="volunteers"
	data-fresco-caption="Autora, Ass. Marcio Luiz e Paloma"
>
	Image
</a>

<!-- Collaborators -->
<a
	href={polycrineManoelGuilherme}
	class="fresco hidden"
	data-fresco-group="collaborators"
	data-fresco-caption="Policrínica Manoel Guilherme da Silveira Filho (CED) Chef da odonto cirurgiâ Dentista Lucineide L. C de Oliveira 06-2012"
	>Image</a
>
<a
	href={polycrineManoelGuilherme2}
	class="fresco hidden"
	data-fresco-group="collaborators"
	data-fresco-caption="Policrínica Manoel Guilherme da Silveira Filho (CED) Chef da odonto cirurgiâ Dentista Lucineide L. C de Oliveira 06-2012"
	>Image</a
>
<a
	href={reinaldoSilvaHortisFrutis}
	class="fresco hidden"
	data-fresco-group="collaborators"
	data-fresco-caption="Sr. Reinaldo Silva - Hortis Frutis Vitor">Image</a
>

<!-- Others-->
<a
	href={tshirtHqChurch}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Blusa Projeto Igreja SEDE - 2012"
>
	Image
</a>
<a
	href="#video-others-todo"
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Posto de Coleta - Ir. Rosângela Almeida - Rua Roque Barbosa, 674 22/Nov/2018"
	data-fresco-type="youtube"
>
	Image
</a>
<a href={projectReceipt} class="fresco hidden" data-fresco-group="others" data-fresco-caption="Recibo Projeto">
	Image
</a>
<a
	href={mapAraquem}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Mapa rua Araquém nº 1.367 - Bangu"
>
	Image
</a>
<a
	href={shekinahMeetingMarch}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Reunião Shekinah 11/Mar/2012 (A 1ª Reunião 02/Out/2011 - na Ceia foi a divulgação)"
>
	Image
</a>
<a
	href={shekinahMeetingjan}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="1- Reunião na Shekinah Jan/2012"
>
	Image
</a>
<a
	href={shekinahMeetingjan2}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="2- Reunião na Shekinah Jan/2012"
>
	Image
</a>
<a
	href={ricardoSabrina}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Pr. Ricardo e Pr. Sabrina 14/Fev/2018"
>
	Image
</a>
<a
	href={musicalRuasRio}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Musical Pelas ruas do Rio - Wilma, Marcio, Diac. Claudia, Ir. Fernanda, Ir Maiara e Paloma 05/Set/2015"
>
	Image
</a>
<a
	href={presentationMusicalRuasRio}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Renato, Wilma, Suzana, Gabriel e artista plástico Junior - 1º apres musical Nov/2015"
>
	Image
</a>
<a
	href={sheilaIbeSonWilma}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Ir. Sheila colega do IBE com seu filho e Wilma Machado ao lado do Cesto de Ofertas 2012"
>
	Image
</a>
<a
	href={marcioOfferBasket}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Marcio Luiz - Cesto de Coleta da Shekinah Abril/2013"
>
	Image
</a>
<a
	href={aldoWilmaFoodBasket}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="Pr. Aldo e Wilma diante do Cesto de Oferta alimentícia"
>
	Image
</a>
<a
	href={torquatoReceivesTshirt}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="1- Torquato recebe blusa do Projeto - Reunião Geral 20/Nov/2017"
>
	Image
</a>
<a
	href={torquatoReceivesTshirt2}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="2- Torquato recebe blusa do Projeto - Reunião Geral 20/Nov/2017"
>
	Image
</a>
<a
	href={torquatoReceivesTshirt3}
	class="fresco hidden"
	data-fresco-group="others"
	data-fresco-caption="3- Torquato recebe blusa do Projeto - Reunião Geral 20/Nov/2017"
>
	Image
</a>

<style>
	.hidden {
		display: none;
	}
</style>
