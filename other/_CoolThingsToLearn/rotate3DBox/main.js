			if (parent === window) {
				document.addEventListener('DOMContentLoaded', function() {
					(function() {
				var btnsEl = document.querySelector('.buttons'), currentAngle = 0;
				btnsEl.addEventListener('click', function(e) {
					var b = e.target.innerHTML.toLowerCase(), 
						house = document.querySelector('.house'), 
						btns = {'front': 0, 'left': 90, 'back': 180, 'right': -90}, 
						dif = btns[b] - currentAngle%360;
					if(!e.target.classList.contains('btn') || dif === 0) return;
					currentAngle += (Math.abs(dif) > 180) ? 
									(Math.abs(dif) - 360)*Math.abs(dif)/dif : 
									dif;
					house.style['-webkit-transform'] = 'rotateY(' + currentAngle + 'deg)';
					house.style['transform'] = 'rotateY(' + currentAngle + 'deg)';
				}, false); 
			}());		
				});
			}
