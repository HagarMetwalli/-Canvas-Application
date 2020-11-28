        var mycanvas, mycontext, radius = 10, isdrawable = false, radvalue, inc, dec, allcolors, oldselected, savebtn,
            selectedcolor, creatediv, colorsbar, imgurl;
        window.addEventListener('load', function () {
            //canvas
            mycanvas = document.getElementById("mycanvas");
            //resize
            mycanvas.width = window.innerWidth;
            mycanvas.height = window.innerHeight;
            //get context
            mycontext = mycanvas.getContext('2d');
            //getcontext for using drowing methods
            mycanvas.addEventListener('mousemove', drawcircle);
            mycanvas.addEventListener('mousedown', enabledrowing);
            mycanvas.addEventListener('mouseup', disablerowing);
            //radius bar
            //radius value
            radvalue = document.getElementById("radiusvalue");
            //increment
            inc = document.getElementById("increment");
            inc.addEventListener('click', increaserad);

            //decrement
            dec = document.getElementById("decrement");
            dec.addEventListener('click', decreaserad);
            //colors part
            //allcolors = document.getElementsByClassName('colors');
            //allcolors = document.querySelectorAll('.colors');
            //for (var i = 0; i < allcolors.length; i++) {
            //    allcolors[i].addEventListener('click', changecolor);
            //    if (localStorage.getItem('latestcolor') == allcolors[i].style.backgroundColor) {
            //        allcolors[i].classList.add("active");
            //        mycontext.fillStyle = allcolors[i].style.backgroundColor;
            //    }
            //}
            //anther solution
            allcolors = ['red', 'yellow', 'green', 'blue', 'pink', 'brown', 'cyan'];
            colorsbar = document.getElementById('colorsbar');
            for (var i = 0; i < allcolors.length; i++) {
                creatediv = document.createElement("div");
                creatediv.classList.add('colors');
                creatediv.style.backgroundColor = allcolors[i];
                creatediv.addEventListener('click', changecolor);
                if (localStorage.getItem('latestcolor') == allcolors[i]) {
                    creatediv.classList.add('active');
                    mycontext.fillStyle = allcolors[i];
                }
                colorsbar.appendChild(creatediv);
            }
            //save context as local storage

            //save mycanvas as image
            savebtn = document.getElementById('savebtn');
            savebtn.addEventListener('click', savemycanvas);
            //clear canvas
            document.getElementById('clearbtn').addEventListener('click', function () {
                mycontext.clearRect(0, 0, mycanvas.width, mycanvas.height);
            }, false);
            
        });

        function drawcircle(e) {
            //for drow => use context
            //beginpath
            if (isdrawable) {
                mycontext.beginPath();
                mycontext.arc(e.clientX, e.clientY, radius, 0, Math.PI * 2);
                mycontext.fill();
                mycontext.closePath();
            }

        }
        function enabledrowing() {
            isdrawable = true;
        }
        function disablerowing() {
            isdrawable = false;
        }
        function increaserad() {
            radius++;
            checkradius(radius);

        }
        function decreaserad() {
            radius--;
            checkradius(radius);

        }
        function checkradius(newrad) {
            if (newrad > 15)
                newrad = 15;
            else if (newrad < 10)
                newrad = 10;
            radius = newrad;
            radvalue.innerText = radius;
        }
        function changecolor(e) {
            oldselected = document.getElementsByClassName('active')[0];
            if (oldselected != null)
                oldselected.classList.remove("active");
            //oldselected.className = 'colors';

            selectedcolor = e.target;
            //add active class on selected color
            selectedcolor.classList.add("active");
            //selectedcolor.className += ' active';
            mycontext.fillStyle = selectedcolor.style.backgroundColor;
            localStorage.setItem('latestcolor', selectedcolor.style.backgroundColor)

        }
        function savemycanvas() {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = mycanvas.toDataURL();
            a.download = "convas.png";
            a.click();
            document.body.removeChild(a);
        }
