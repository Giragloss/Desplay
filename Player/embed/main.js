let links = JSON.parse(atob(document.URL.split('?=')[1].split('#')[0]))
const options = {controlBar: {children: ['playToggle', 'progressControl', 'volumePanel', 'captionsButton', 'qualitySelector', 'fullscreenToggle']}}

init()
async function init() {
  await addResources(links)
  await optionsSet()
  await urlObserver()
  await setPlayer()
}

function addResources(links) {
  const sourceOrg = document.querySelector('#player #org')
  sourceOrg.setAttribute('src', links.orig)
  sourceOrg.setAttribute('type', 'video/mp4')
  sourceOrg.setAttribute('label', 'Original')

  const sourceDub = document.querySelector('#player #dub')
  sourceDub.setAttribute('src', links.dub)
  sourceDub.setAttribute('type', 'video/mp4')
  sourceDub.setAttribute('label', 'Dublado')

  const trackSub = document.querySelector('#player #sub')
  trackSub.setAttribute('src', links.vtt)
  trackSub.setAttribute('srclang', 'pt-br')
  trackSub.setAttribute('label', 'Portugues')
  if(links.vtt){
    trackSub.setAttribute('kind', 'captions')
  }
}

function optionsSet() {
  videojs('player', options);
  document.querySelector('.vjs-quality-selector').className='vjs-audio-button vjs-menu-button vjs-menu-button-popup vjs-control vjs-button'
}

function urlObserver(argument) {
  window.addEventListener('hashchange', function(){
    setPlayer(1)
  });
}

function setPlayer(id) {
  const player = document.querySelector('#player')
  const playerVideo = document.querySelector('#player_html5_api')
  const playerPoster = document.querySelector('.vjs-poster.vjs-hidden')
  const playerButton = document.querySelector('.vjs-big-play-button')

  const tamanho = document.URL.split('#')[1].split('x')
  player.setAttribute('style', `width: ${tamanho[0]}px; height: ${tamanho[1]}px;`)

  if(id){
    playerVideo.setAttribute('style', `width: 100%; height: 100%; z-index:1`)
  }else{
    playerPoster.setAttribute('style', `background-image: url("${links.thumb}")`)
    playerVideo.setAttribute('onplay', "document.querySelector('.vjs-tech').style='z-index:1'; document.querySelector('.vjs-poster.vjs-hidden').style='display:none'")
    playerButton.setAttribute('style', 'width: 107%;height: 109%;top: 0;left: 0;opacity:0.2')
  }
}
