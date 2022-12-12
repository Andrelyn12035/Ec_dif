///[^\w,ñÑ-]/g.test(string)

function validar(){
  let p = document.getElementById("p").value
  let p2 = document.getElementById("p2").value
  let p3 = document.getElementById("p3").value

  const reg = new RegExp('[^\\d/-]');
  if (reg.test(p) || contar(p) || p == ""){
    error()
    document.getElementById("p2").style.borderColor = ""
    document.getElementById("p3").style.borderColor = ""
  }else if (reg.test(p2) || contar(p2) || p2 == ""){
    document.getElementById("p").style.borderColor = ""
    document.getElementById("p3").style.borderColor = ""
    error2()
  }else if (reg.test(p3) || contar(p3) || p3 == ""){
    error3()
    document.getElementById("p").style.borderColor = ""
    document.getElementById("p2").style.borderColor = ""
  }else if (p == "0" && p2 == "0" && p3 == "0" ){
    error()
    error2()
    error3()
  }else if (p == "0" && p2 == "0"){
    error()
    error2()
  }
  else{
    document.getElementById("p").style.borderColor = ""
    document.getElementById("p2").style.borderColor = ""
    document.getElementById("p3").style.borderColor = ""
    enviar(p,p2,p3)
  }
}

function enviar(a,b,c){
  const c1 = a.split("");
  const c2 = b.split("");
  const c3 = c.split("");

  let A = ""
  let B = ""
  let C = ""
  let epr = ""
  if (c1[0] == "0" && c1.length == 1){
    
  }else if (c1.includes("/")) {
    let bool = false
    let num = ""
    let den = ""
    for (let i = 0; i < c1.length; i++) {
      if (c1[i] == "/") {
        bool = true
        i += 1
      }
      if (!bool) {
        num += c1[i]
      }else{
        den += c1[i]
      }
    }
    if (c2[0] == "0" && c3[0] == "0" && c2.length == 1 && c3.length == 1) {
      A += "\\frac{"+num+"}{"+den+"}m^{2}"
    }else if(c2.includes("-")) {
      A += "\\frac{"+num+"}{"+den+"}m^{2}"
    }else{
      A += "\\frac{"+num+"}{"+den+"}m^{2}+"
    }
    
  }else{
    if (c2[0] == "0" && c3[0] == "0" && c2.length == 1 && c3.length == 1) {
      A = a+"m^{2}"
    }else if(c2.includes("-")) {
      A = a+"m^{2}"
    }else{
      A = a+"m^{2}+"
    }
  }
  epr += "$$"+A
  if (c2[0] == "0" && c2.length == 1){
    
  }else if (c2.includes("/")) {
    let bool = false
    let num = ""
    let den = ""
    for (let i = 0; i < c2.length; i++) {
      if (c2[i] == "/") {
        bool = true
        i += 1
      }
      if (!bool) {
        num += c2[i]
      }else{
        den += c2[i]
      }
    }
    if (c3[0] == "0" && c3.length == 1) {
      B += "\\frac{"+num+"}{"+den+"}m"
    }else{
      if (c3.includes("-")) {
        B += "\\frac{"+num+"}{"+den+"}m"
      }else{
        B += "\\frac{"+num+"}{"+den+"}m"+"+"
      }
    }
  }else{
    if (c3[0] == "0" &&c3.length == 1) {
      B = b+"m"
    }else if (c3.includes("-")) {
      B = b+"m"
    }else{
      B = b+"m"+"+"
    }
  }
    epr += B

  if (c3[0] == "0" && c3.length == 1){
    
  }else if (c3.includes("/")) {
    let bool = false
    let num = ""
    let den = ""
    for (let i = 0; i < c3.length; i++) {
      if (c3[i] == "/") {
        bool = true
        i+=1
      }
      if (!bool) {
        num += c3[i]
      }else{
        den += c3[i]
      }
    }
    C += "\\frac{"+num+"}{"+den+"}"
  }else{
    C = c
  }
  
  
    epr += C+" = 0$$"
  if (epr == "$$ = 0$$") {
    epr == "$$0 = 0$$"
  }
  console.log(epr)
  fetch(window.location.origin+"/test", {
    credentials: 'include',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    body: JSON.stringify({
        'c1':a,
        'c2':b,
        'c3':c
    })
  })
  .then(function(body){
    return body.json()
  }).then(function(data) {
    console.log(data);
    let text = document.createTextNode("Ecuacion caracteristica: "+epr);
    document.getElementById("com").textContent = ""
    document.getElementById("com").appendChild(text)
    let roots = document.createTextNode("");
    if(c1[0] == "0" && c1.length == 1){
      roots = document.createTextNode("Raíces: "+"$$m_{1}="+data.y1+"$$");
    }else if (data.i1 == "x"){
      roots = document.createTextNode("Raíces: "+"$$m_{1}="+data.y1+";m_{2}="+data.y2+"$$");
    }else{
      roots = document.createTextNode("Raíces: "+"$$m_{1}="+data.y2+"+"+data.i2+"i;m_{2}="+data.y1+data.i1+"i$$");
    }
    document.getElementById("root").textContent = ""
    document.getElementById("root").appendChild(roots)
    

    let sols = document.createTextNode("");
    if(c1[0] == "0" && c1.length == 1){
      sols = document.createTextNode("Soluciones li: $$y_{1}=c_{1}e^{"+data.y1+"x}$$");
    }else if (data.i1 != "x"){
      sols = document.createTextNode("Soluciones li: $$y_{1}=c_{1}e^{"+data.y2+"x}\\cos x"+data.i2+";y_{2}=c_{2}e^{"+data.y1+"x}\\sin x("+data.i1+")$$");
    }else if(data.i1 == "x" && data.y1 == data.y2){
      sols = document.createTextNode("Soluciones li: $$y_{1}=c_{1}e^{"+data.y2+"x};y_{2}=c_{2}xe^{"+data.y1+"x}$$");
    }else{
      sols = document.createTextNode("Soluciones li: $$y_{1}=c_{1}e^{"+data.y2+"x};y_{2}=c_{2}e^{"+data.y1+"x}$$");
    }
    document.getElementById("yi").textContent = ""
    document.getElementById("yi").appendChild(sols)


    let gen = document.createTextNode("");
    if(c1[0] == "0" && c1.length == 1){
      gen = document.createTextNode("Soluciones general: $$y_{c}=c_{1}e^{"+data.y1+"x}$$");
    }else if (data.i1 != "x"){
      gen = document.createTextNode("Soluciones general: $$y_{c}=c_{1}e^{"+data.y2+"x}\\cos x"+data.i2+"+c_{2}e^{"+data.y1+"x}\\sin x("+data.i1+")$$");
    }else if(data.i1 == "x" && data.y1 == data.y2){
      gen = document.createTextNode("Soluciones general: $$y_{c}=c_{1}e^{"+data.y2+"x}+c_{2}xe^{"+data.y1+"x}$$");
    }else{
      gen = document.createTextNode("Soluciones general: $$y_{c}=c_{1}e^{"+data.y2+"x}+c_{2}e^{"+data.y1+"x}$$");
    }
    document.getElementById("yc").textContent = ""
    document.getElementById("yc").appendChild(gen)
    MathJax.typeset();
  });
}

var parrafo = document.getElementById("latex");
function formato(){
    let p = document.getElementById("p").value
    
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
  document.getElementById("p").style.borderColor = "rgb(179, 45, 22)"
}
function error2(){
  document.getElementById("p2").style.borderColor = "rgb(179, 45, 22)"
}
function error3(){
  document.getElementById("p3").style.borderColor = "rgb(179, 45, 22)"
}

function contar(str){
  let con1 = 0, con2 = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "-") {
      con1 += 1
      if (str[0] != "-") {
        con1 += 2
      }
    }
    if (str[i] == "/") {
      con2 += 1
      if (i == 0 || i == str.length-1 || str[i-1] == "-") {
        con1 += 2
      }
    }
  }
  if (con1 > 1 || con2 > 1) {
    return true
  }else{
    return false
  }
}