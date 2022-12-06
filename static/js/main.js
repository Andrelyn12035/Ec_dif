var parrafo = document.getElementById("latex");
function formato(){
    var p = document.getElementById("p").value
    
      fetch(window.location.origin+"/formato-1", {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({
            'f':p
        })
      })
      .then(function(body){
        return body.text(); // <--- THIS PART WAS MISSING
      }).then(function(data) {
        console.log(data);
        var text = document.createTextNode("$$"+data+"$$");
        parrafo.textContent = "";
        parrafo.appendChild(text);
        MathJax.typeset();
      });
     // $$\int \sqrt{\frac{1}{x}}\, dx $$
}

function raiz(){
    var p = document.getElementById("p").value
    var n = document.getElementById("N").value 
    var x = document.getElementById("X").value

    var res = document.getElementById("res");
    if(p == "" || n == "" || x == ""){
        alert("Favor de llenar los campos")
    }else{
        fetch(window.location.origin+"/raiz", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({
                'f':p,
                'n':n,
                'x':x
            })
          })
          .then(function(body){
            return body.text(); // <--- THIS PART WAS MISSING
          }).then(function(data) {
            var txt = document.createTextNode("La raiz aproximada es: " + data);
            res.textContent = "";
            res.appendChild(txt);
          });
    }
    
    
}

var parrafo2 = document.getElementById("latex2");
function formato2(){
    var p2 = document.getElementById("p2").value
    
      fetch(window.location.origin+"/formato-1", {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body: JSON.stringify({
            'f':p2
        })
      })
      .then(function(body){
        return body.text(); // <--- THIS PART WAS MISSING
      }).then(function(data) {
        console.log(data);
        var text2 = document.createTextNode("$$"+data+"$$");
        parrafo2.textContent = "";
        parrafo2.appendChild(text2);
        MathJax.typeset();
      });
     // $$\int \sqrt{\frac{1}{x}}\, dx $$
}

function area(){
    var aprox = document.getElementById("aprox")
    var area = document.getElementById("are")
    var error = document.getElementById("error")
    var fun = document.getElementById("p2").value
    var a = document.getElementById("A").value
    var b = document.getElementById("B").value
    var ene = document.getElementById("ene").value
    var met = document.getElementById("sel").value

    if(fun == "" || a == "" || b == "" || ene == ""){
        alert("Favor de llenar los campos")
    }else if(ene % 2 != 0 && met == "3") {
        alert("El metodo de Simpson requiere un número par")
    }
    else{
        fetch(window.location.origin+"/area", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                'f':fun,
                'a':a,
                'b':b,
                'ene':ene,
                'met':met
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            var ar = document.createTextNode("El área es: " + data.area);
            var ap = document.createTextNode("El área aproximada es: " + data.aprox)
            var er = document.createTextNode("El error aproximado es: " + (data.aprox - data.area).toFixed(10))
            document.getElementById("plot").src = ""
            document.getElementById("plot").src = "data:image/jpg;base64,"+data.img
            area.textContent = "";
            aprox.textContent = "";
            error.textContent = "";
            area.appendChild(ar);
            aprox.appendChild(ap)
            error.appendChild(er)
          }). catch((error) => console.log(error))
    }
}

function error(){
    var ers = document.getElementById("ers")
    var fun = document.getElementById("p2").value
    var a = document.getElementById("A").value
    var b = document.getElementById("B").value
    var met = document.getElementById("sel").value
    var er1 = document.getElementById("er").value

    if(fun == "" || a == "" || b == "" || er == ""){
        alert("Favor de llenar los campos")
    }else{
        fetch(window.location.origin+"/error", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                'f':fun,
                'a':a,
                'b':b,
                'er':er1,
                'met':met
            })
          })
          .then(response => response.text())
          .then(data => {
            console.log(data)
            var error = document.createTextNode("El valor n aproximado es: " + data)
            ers.textContent = "";
            ers.appendChild(error)
          }). catch((error) => console.log(error))
    }
}
