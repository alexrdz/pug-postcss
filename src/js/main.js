// 'use strict'

// //- test that DOM is loaded
// document.addEventListener("DOMContentLoaded", start);
// function start () {
//   console.log('loaded')
// }



// (function () {

// //- jquery-style selectors
// window.$ = function (selector) {
//   return document.querySelector(selector)
// }


// //- cache DOM
// var home = $('.Home')
// var target = $('.Work')
// var work = $('.test')
// var left = $('.Left-pane__content')



// //- load function, jquery-style load() method
// function load (fileName, domNode) {
//   var xhr = new XMLHttpRequest()
//   xhr.open('GET', '/'+fileName+'.html');
//   xhr.onload = function() {
//     if (xhr.status === 200) {
//       domNode.innerHTML=xhr.responseText
//     }
//     else {
//         alert('Request failed.  Returned status of ' + xhr.status);
//     }
//   };
//   xhr.send();
// }





// work.addEventListener('click', function (e) {
//   e.preventDefault()
//   var url = this.getAttribute('href').replace(/\.[^/.]+$/, "")
//   var title = this.innerHTML
  
//   history.pushState({
//     url: url,
//     title: title
//   }, title, url)
  
//   document.title = title
//   home.classList.add('moveToLeft')

//   load(url, target)
// })


// window.addEventListener('popstate', function (e) {
//   var state = e.state
//   var work1 = $('.Work-1')
//   console.log('going back', state)
//   home.classList.remove('moveToLeft')
//   work1.classList.remove('moveToLeft')
//   work1.classList.add('moveToRight')
//   setTimeout(function () {
//     target.innerHTML = ''
//   }, 500)
  
//   if (state !== null) {
//     document.title = state.title
//     // load(state.url, target)
//   } else {
//     document.title = 'Alex Rodriguez'
//     target.innerHTML = ''
//   }
// })

// })()


(function() {


//- jquery-style selectors
window.$ = function (selector) {
  return document.querySelector(selector)
}


//- cache DOM
var home = $('.Home')
var target = $('.Work')
var work = $('.Work')
var left = $('.Left-pane__content')


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
      directions : function(params) {            // Function called when path is resolved
        console.log('directions received');    
        // console.log('params: ', params);

        // if (params.hash === '') {
        //   home.classList.add('moveToRight')  
        // }
      }
    })
    .change(function(hash) {
      if (hash === '') {
        // console.log('is empty')
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
