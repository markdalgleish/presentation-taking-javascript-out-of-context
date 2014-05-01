var deck = bespoke.from('article', {
  keys: true,
  touch: true,
  bullets: 'li, .bullet',
  scale: true,
  hash: true,
  dir: true
});

(function bespokeBackgrounds(deck) {
  var backgrounds = [];

  deck.slides.forEach(function(slide) {
    var background = document.createElement('div');
    background.className = 'bespoke-background bespoke-background-inactive';

    var className = slide.getAttribute('data-bespoke-background');
    if (className) {
      background.className += ' ' + className;
    }

    backgrounds.push(background);
  });

  var activateBackgroundByIndex = function(index) {
      backgrounds.forEach(deactivateBackground.bind(null, index));
      activateBackground(backgrounds[index]);
    },

    activateBackground = function(background) {
      background.classList.remove('bespoke-background-inactive');
      background.classList.remove('bespoke-background-before');
      background.classList.remove('bespoke-background-after');
      background.classList.add('bespoke-background-active');
    };

    deactivateBackground = function(activeIndex, background, backgroundIndex) {
      background.classList.add('bespoke-background-' + (backgroundIndex < activeIndex ? 'before' : 'after'));
      background.classList.add('bespoke-background-inactive');
      background.classList.remove('bespoke-background-active');
    };

  deck.on('activate', function(e) {
    activateBackgroundByIndex(e.index);
  });

  backgrounds.forEach(deck.parent.appendChild.bind(deck.parent));
}(deck));
