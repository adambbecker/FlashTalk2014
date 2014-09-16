// **************************
// -- Example jQuery start --
// **************************
//
// (function ($, document) {
//
// // Site definition
// window.Site = $.extend({}, window.Site, {
//
//   // =======================================
// 	// Initialize Site (attach handlers, etc.)
// 	// =======================================
// 	init: function() {
//
//   }
//
// });
//
// // =======================================
// // Initialize
// // =======================================
// Site.init();
//
// })(jQuery, document);

// var i;
// var dots = document.getElementById('main-dots');
// var animDelayPrefixed = Modernizr.prefixed('animationDelay').replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
//
// for (i = 0; i < (32 * 24); i++) {
//   var dotCon = document.createElement('div');
//   var dot = document.createElement('div');
//   var randOffset = (Math.random() * (6 - 0) + 0).toFixed(4);
//
//   dotCon.className = 'dot-con';
//   dot.className = 'dot-con__dot';
//   dot.style['-webkit-animation-delay'] = randOffset + 's';
//
//   dotCon.appendChild( dot );
//   dots.appendChild( dotCon );
// }


// http://codepen.io/mkarya/pen/ArEws
var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

NUM_CONFETTI = 350;

COLORS = [[46, 172, 203], [165, 197, 82], [236, 160, 30]];

PI_2 = 2 * Math.PI;

canvas = document.getElementById("ui-trans-example-confetti");

context = canvas.getContext("2d");

window.w = 0;

window.h = 0;

resizeWindow = function() {
  window.w = canvas.width = window.innerWidth;
  return window.h = canvas.height = window.innerHeight;
};

window.addEventListener('resize', resizeWindow, false);

window.onload = function() {
  return setTimeout(resizeWindow, 0);
};

// window.w = canvas.width;
// window.h = canvas.height;

range = function(a, b) {
  return (b - a) * Math.random() + a;
};

drawCircle = function(x, y, r, style) {
  context.beginPath();
  context.arc(x, y, r, 0, PI_2, false);
  context.fillStyle = style;
  return context.fill();
};

xpos = 0.5;

// document.onmousemove = function(e) {
//   return xpos = e.pageX / w;
// };

window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    return window.setTimeout(callback, 1000 / 60);
  };
})();

Confetti = (function() {
  function Confetti() {
    this.style = COLORS[~~range(0, 3)];
    this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
    this.r = ~~range(2, 6);
    this.r2 = 2 * this.r;
    this.replace();
  }

  Confetti.prototype.replace = function() {
    this.opacity = 0;
    this.dop = 0.03 * range(1, 4);
    this.x = range(-this.r2, w - this.r2);
    this.y = range(-20, h - this.r2);
    this.xmax = w - this.r;
    this.ymax = h - this.r;
    this.vx = range(0, 2) + 8 * xpos - 5;
    return this.vy = 0.7 * this.r + range(-1, 1);
  };

  Confetti.prototype.draw = function() {
    var _ref;
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop *= -1;
    }
    if (this.opacity < 0 || this.y > this.ymax) {
      this.replace();
    }
    if (!((0 < (_ref = this.x) && _ref < this.xmax))) {
      this.x = (this.x + this.xmax) % this.xmax;
    }
    return drawCircle(~~this.x, ~~this.y, this.r, "" + this.rgb + "," + this.opacity + ")");
  };

  return Confetti;

})();

confetti = (function() {
  var _i, _results;
  _results = [];
  for (i = _i = 1; 1 <= NUM_CONFETTI ? _i <= NUM_CONFETTI : _i >= NUM_CONFETTI; i = 1 <= NUM_CONFETTI ? ++_i : --_i) {
    _results.push(new Confetti);
  }
  return _results;
})();

window.step = function() {
  var c, _i, _len, _results;
  requestAnimationFrame(step);
  context.clearRect(0, 0, w, h);
  _results = [];
  for (_i = 0, _len = confetti.length; _i < _len; _i++) {
    c = confetti[_i];
    _results.push(c.draw());
  }
  return _results;
};

step();





// ****************************
// -- Angular App Controller --
// ****************************
angular.module('flashTalk', ['ngSanitize'])
.directive('principleFinishRepeat', function($timeout) {
  return function(scope, element, attrs) {
    if (scope.$last) {
      $timeout(function () {
  	  	scope.$emit('plistComp');
  	  });
    }
  };
})
.controller('uiLifeCtrl', function($scope, $timeout, $window) {

  // ============================
  // Set Up / General
  // ============================
  $scope.seenIntro = false;
  $scope.animIntro = true;

  $scope.$watch('seenIntro', function() {
    if ($scope.seenIntro) {
      $timeout(function() {
        $scope.animIntro = false;
      }, 4200);
    } else {
      $scope.animIntro = true;
    }
  });


  // ============================
  // Dots Bg
  // ============================
  function genDots() {
    var tempDots = [];
    for (i = 0; i < (32 * 24); i++) {
      var dot = {
        animationDelay: (Math.random() * (6 - 0) + 0).toFixed(4),
      };
      tempDots.push(dot);
    }
    return tempDots;
  }

  $scope.animDelayPrefixed = Modernizr.prefixed('animationDelay').replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-');
  $scope.dots = genDots();


  // ============================
  // UI Categories
  // ============================
  $scope.uiCats = [
    {
      title: 'Navigation',
      slug: 'nav',
      desc: 'Moving the user through an app'
    },
    {
      title: 'Transactional',
      slug: 'trans',
      desc: 'Responding to user input that alters data'
    },
    // {
    //   title: 'Attention Getters',
    //   slug: 'atten',
    //   desc: 'Focusing user attention on important info'
    // }
  ];
  $scope.actUICat = null;
  $scope.actCatHover = '';
  $scope.actUISection = null;


  // ============================
  // Animation Principles
  // ============================
  $scope.currAnimPrinciples = null;
  $scope.safeAnimPrinciples = false;
  var animPrinciples = {
    nav: [
      { name: 'Anticipation' },
      { name: 'Follow Through' }
    ],
    trans: [
      { name: 'Exaggeration' },
      { name: 'Appeal' }
    ]
  };


  // ============================
  // UI Section Navigation
  // ============================
  $scope.showExampleButton = false;
  $scope.showReturnCatButton = false;
  $scope.safeAnimExample = false;

  $scope.setActUICat = function(uiCatSlug) {
    $scope.actUICat = uiCatSlug;
    $scope.currAnimPrinciples = animPrinciples[ uiCatSlug ];
    $scope.currExampleDesc = {
      title: examplesDesc[ uiCatSlug ].title,
      heading: examplesDesc[ uiCatSlug ].heading,
      principles: examplesDesc[ uiCatSlug ].principles,
      color: examplesDesc[ uiCatSlug ].color
    };
    $scope.actUISection = 'principles';
    if (uiCatSlug == 'trans') {
      $scope.exampleTrans.step = 1;
      $scope.exampleTrans.logged = false;
    }
    $timeout(function() {
      $scope.showExampleButton = true;
    }, 4800);
  };

  $scope.setActUISec = function() {
    if ($scope.actUISection == 'principles') {
      $scope.actUISection = 'example';
      $scope.showExampleButton = false;
      $scope.safeAnimPrinciples = false;
      $timeout(function() {
        $scope.currAnimPrinciples = null;
        $scope.safeAnimExample = true;
        $scope.showReturnCatButton = true;
      }, 800);
    } else {
      $scope.actUISection = null;
      $scope.actUICat = null;
      $scope.safeAnimExample = false;
      $scope.showExampleButton = false;
      $scope.showReturnCatButton = false;
    }
  };

  $scope.$on('plistComp', function(e) {
    if ($scope.actUISection == 'principles') {
      $scope.safeAnimPrinciples = true;
    }
  });

  $scope.actCatMouseEnter = function(slug) {
    $scope.actCatHover = slug;
  };
  $scope.actCatMouseLeave = function() {
    $scope.actCatHover = null;
  };


  // ============================
  // Examples
  // ============================
  $scope.currExampleDesc = {
    title: '',
    heading: '',
    principles: [],
    color: ''
  };
  var examplesDesc = {
    nav: {
      title: 'Navigation',
      heading: 'Mobile List <br>&amp; Detail Modal',
      principles: ['Anticipation', 'Follow Through'],
      color: '#2EACCB'
    },
    trans: {
      title: 'Transaction',
      heading: 'Confirmation <br>&amp; Reinforcement',
      principles: ['Exaggeration', 'Appeal'],
      color: '#A5C552'
    }
  };

  // Nav Category
  // ---------------------------
  $scope.exampleNav = {
    articles: [
      {
        id: 1,
        title: 'The Lion King',
        excerpt: 'Aenean lacinia bibendum nulla sed consectetur. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Cras justo odio, dapibus ac facilisis in.'
      },
      {
        id: 2,
        title: 'Aladdin',
        excerpt: 'Nullam quis risus eget urna mollis ornare vel eu leo. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula ut id elit.'
      },
      {
        id: 3,
        title: 'Finding Nemo',
        excerpt: 'Etiam porta sem malesuada magna mollis euismod. Aenean lacinia bibendum nulla sed consectetur. Donec ullamcorper nulla non metus auctor fringilla. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.'
      },
      {
        id: 4,
        title: 'Toy Story',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum.'
      },
      {
        id: 5,
        title: 'Sleeping Beauty',
        excerpt: 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Etiam porta sem malesuada magna mollis euismod. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.'
      }
    ],
    focusedArticle: {
      id: null,
      title: '',
      visible: false
    },
    focusArticle: function( article ) {
      $scope.exampleNav.focusedArticle.id = article.id;
      $scope.exampleNav.focusedArticle.title = article.title;
    },
    closePost: function() {
      $scope.exampleNav.focusedArticle.id = null;
    }
  };

  // Transaction Category
  // ---------------------------
  $scope.exampleTrans = {
    step: 1,
    logged: false,
    logIt: function() {
      $scope.exampleTrans.step = 2;
      $timeout(function() {
        $scope.exampleTrans.logged = true;
      }, 2400);
      $timeout(function() {
        $scope.exampleTrans.step = 3;
      }, 2800);
    }
  }

});
