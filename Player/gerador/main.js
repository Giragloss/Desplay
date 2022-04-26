const divGerar = document.querySelector('.inputGerar')

const linkDub = document.querySelector('.linkDub')
const linkLeg = document.querySelector('.linkLeg')
const linkSub = document.querySelector('.linkSub')
const linkThumb = document.querySelector('.linkThumb')

const player = document.querySelector('.player')
const playerIframe = document.querySelector('.player iframe')

const info = document.querySelector('.infos')
const infoInput = document.querySelector('.infos span input')

function btnGerar() {
	const json = `{"dub":"${linkDub.value}","orig":"${linkLeg.value}","vtt":"${linkSub.value}","thumb":"${linkThumb.value}"}`

	player.style.display="block"
	playerIframe.src=`https://giragloss.github.io/Desplay/Player/embed/?=${btoa(json)}#${document.querySelector('.player').clientWidth-40}x383`
	divGerar.style.display="none"

	info.style.display="flex"
	infoInput.value=playerIframe.src.split('#')[0]
}

function btnCopy() {
	infoInput.select();
    infoInput.setSelectionRange(0, 99999)
    document.execCommand("copy");
}