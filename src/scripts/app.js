gsap.registerPlugin(ScrollTrigger);

$(function () {
  //------------- SCROLLING RIBBON ------------//

  $('[data-scrolling-ribbon]').each(function () {
    const $t = $(this);
    const $track = $t.find('.ribbon-content');
    const $word = $track.find('span').first();

    if (!$track.length) return;

    const text = $word.text();

    // Only fill until track is long enough, without repeatedly appending clones
    while ($track[0].scrollWidth < window.innerWidth * 2) {
      $('<span>', {
        text,
        class: $word.attr('class')
      }).appendTo($track);
    }

    // Only clone once, and mark it so we don't clone again
    if (!$track.data('cloned')) {
      $track.append($track.children().clone());
      $track.data('cloned', true);
    }
  });


  //------------- GAME SECTION SCROLL REVEAL ------------//

  $(window).on('scroll', function () {
    $('.game-console').each(function () {
      const $el = $(this);
      const top = $el.offset().top;
      const scroll = $(window).scrollTop();
      const winH = $(window).height();

      if (scroll + winH * 0.6 > top) {
        $el.addClass('is-active');
      }
    });
  });

  //------------- GAME CONSOLE STATES ------------//

  const states = [
    {
      image: '/images/spirit-ward-console.png',
      description: 'A 3D third person shooter, base defense, mystical action/strategy game where you play as an exorcist defending the village from waves of malevolent spirits.',
      roles: [
        'Physics System (Game Engine)',
        'Gameplay Programming',
        'Game and Level Design'
      ],
      linkA: '',
      linkB: 'https://youtu.be/j0O26mtvuSg?si=3FLmM8-1SzUlELth'
    },
    {
      image: '/images/oceania-cove-console.png',
      description: 'A 2D underwater farming simulation game where you play as a farmer who got cursed into a mermaid and the only way back is to restore the village.',
      roles: [
        'Physics System (Game Engine)',
        'Gameplay Programming',
        'Game and Level Design'
      ],
      linkA: 'https://youtu.be/IydYx104NZE',
      linkB: 'https://youtu.be/iLDsiJ5qqEc'
    },
    {
      image: '/images/ufo-console.png',
      description: 'A 2D pixelated, space-themed multiplayer arcade style game where you solve puzzles, race through obstacles, and shoot alien mobs!',
      roles: [
        'Physics System (Game Engine)',
        'Gameplay Programming',
        'Game and Level Design'
      ],
      linkA: 'https://youtu.be/NkHQmg0uh3A',
      linkB: 'https://youtu.be/KECUlB1n-dI'
    }
  ];

  let index = 0;

  const $console = $('[data-console]');
  const $img = $console.find('.console-base');
  const $description = $console.find('.screen-content .description');
  const $aBtn = $console.find('.a-btn');
  const $bBtn = $console.find('.b-btn');

  function renderState(i) {
    const state = states[i];

    $console.addClass('is-switching');

    setTimeout(() => {
      $img.attr('src', state.image);
      $description.text(state.description);

      // // Render bullet list
      // const $rolesList = $console.find('.roles-list');
      // $rolesList.empty(); // Clear previous content
      // $rolesList.append('<strong>Roles & Responsibilities:</strong>');
      // const $ul = $('<ul>');
      // state.roles.forEach(role => {
      //   $ul.append(`<li>${role}</li>`);
      // });
      // $rolesList.append($ul);

      if (!state.linkA) {
        $aBtn.addClass('disabled');
        $aBtn.attr('href', '#');
        $aBtn.off('click').on('click', e => e.preventDefault());
      } else {
        $aBtn.removeClass('disabled');
        $aBtn.attr('href', state.linkA);
        $aBtn.off('click');
      }

      $bBtn.attr('href', state.linkB);

      $console.removeClass('is-switching');
    }, 150);
  }

  // Initial render
  renderState(index);

  // Arrow button navigation
  $console.find('.btn-dpad').on('click', function () {
    const dir = $(this).data('dir');

    if (dir === 'right') {
      index = (index + 1) % states.length;
    } else {
      index = (index - 1 + states.length) % states.length;
    }

    renderState(index);
  });

  //------------- WEB ------------//
  const mm = gsap.matchMedia();
  mm.add("(min-width: 992px)", () => {
    gsap.utils.toArray('.project-card').forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 80
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 30%',
            end: 'top 40%',
            scrub: 0.6
          }
        }
      );
    });
  });
});
