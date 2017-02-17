
(function() {


//- jquery-style selectors
window.$ = function (selector) {
  return document.querySelector(selector)
}


//- cache DOM
var home = $('.Home')
var target = $('.Work')
var work = $('.Work')
var nav = $('.Navigation')


function hasClass(el, className) {
    return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className);
}

function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else el.className = el.className.replace(new RegExp('\\b'+ className+'\\b', 'g'), '');
}

//- load function, jquery-style load() method
function load (fileName, domNode) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', '/'+fileName+'.html');
  xhr.onload = function() {
    if (xhr.status === 200) {
      domNode.innerHTML=xhr.responseText
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}



	window.onload = function() {

		Satnav({
			html5: true,
			matchAll: true
		})
    .navigate({
      path : '/?{filter}/?{page}',               
      directions : function(params) {
        // console.log('directions received')
        // console.log('params: ', params)
      }
    })
    .change(function(hash) {
      if (hash === '') {
        addClass(nav, 'is-home')

        if (hasClass(home, 'moveToLeft')) {
          removeClass(home, 'moveToLeft')
          addClass(home, 'moveFromLeft')
          
          addClass(work, 'moveFromLeft')
          removeClass(work, 'moveToLeft')
          
          setTimeout(function () {
            target.innerHTML = ''
          }, 500)

        }
        
      } else {
        removeClass(nav, 'is-home')
        // console.log('hash: ', hash);
        removeClass(home, 'moveFromLeft')
        addClass(home, 'moveToLeft')
        removeClass(work, 'moveFromLeft')
        addClass(work, 'moveToLeft')
        load(hash, target)
      }
		})
    .otherwise('/')
		.go();
	};

})();
