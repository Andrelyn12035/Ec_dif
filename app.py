from flask import Flask, render_template, jsonify
from numpy import *
from sympy import *

import base64
import io

from flask import Flask, request
from sympy.plotting import plot


app = Flask(__name__,)

x, y = symbols('x y')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/formato-1', methods=['POST', 'GET'])
def formato_1():
    print("hola")
    if request.method=='POST':
        str = request.get_json()
        exp = parse_expr(str["f"])
        if len(exp.free_symbols) == 0:
            rec = x/(exp.args[1])
            pot = rec.subs(x, 1)
            fun = x**pot-exp.args[0]
        else:
            fun = exp
        a = exp.args
        print(a);
        pprint(exp)
    return latex(fun)

@app.route('/raiz', methods=['POST', 'GET'])
def raiz_1():
    if request.method=='POST':
        val = request.get_json()
        eq = parse_expr(val["f"])

        if len(eq.free_symbols) == 0:
            rec = x/(eq.args[1])
            pot = rec.subs(x, 1)
            eq = x**pot-eq.args[0]
        n = int(val["n"])
        var = int(val["x"])
        print(eq,n,var)
        new = x-((eq)/diff(eq))
        for i in range(n):
            print(new)
            v = new.subs(x, var).evalf()
            var = float(v)
        print(float(var))
        print("{:.8f}".format(float(var)))
        r = "{:.8f}".format(float(var))
        r = str(r)
        r = round(float(r), 12)
        print(r)
        return str("{:.8f}".format(float(var)))

@app.route('/area', methods=['POST', 'GET'])
def area_1():
    if request.method=='POST':
        json = request.get_json()
        equ = parse_expr(json["f"])
        a = int(json["a"])
        b = int(json["b"])
        ene = int(json["ene"])
        met = json["met"]

        a1 = N(((integrate(equ, (x, a, b))).as_real_imag())[0])
        pprint(a1)
        #a12 = float(a1.real)
        a2 = "{:.8f}".format(float(a1))
        a3 = str(a2)
        ar = round(float(a3), 12)
        su = 0
        if met == "1":
            delta = (b-a)/ene
            for i in range(ene):
                su += equ.subs(x, (.5)*((a+((i+1)*delta))+(a+(i*delta))))
            area = delta*su
        elif met=="2":
            delta = (b-a)/ene
            for i in range(1,ene):
                #print(i)
                su += 2*equ.subs(x, a+(i*delta))
            area = (delta/2)*(equ.subs(x, a)+equ.subs(x, b)+su)
        else:
            delta = (b-a)/ene
            abr = 4
            for i in range(1,ene):
                if(abr == 2):
                    su += abr*equ.subs(x, a+(i*delta))
                    abr = 4
                else:
                    su += abr*equ.subs(x, a+(i*delta))
                    abr = 2
            area = (delta/3)*(equ.subs(x, a)+equ.subs(x, b)+su)
        
        r = "{:.8f}".format(float(area))
        r = str(r)
        r = round(float(r), 12)
        c = jsonify(aprox=r,area=ar)
        h = c.get_json()

        x_array = linspace(a, b, 1000)
        f_array = lambdify(x, equ)(x_array)

        p1 = plot(equ, (x,-10,10), ylim =(-10,10),  axis_center='auto', aspect_ratio=(1,1), show=False, fill={'x': x_array,'y1':f_array,'color':'green'})
        my_stringIObytes = io.BytesIO()
        backend = p1.backend(p1)
        backend.process_series()
        backend.fig.savefig(my_stringIObytes, format='jpg')
        my_stringIObytes.seek(0)
        my_base64_jpgData = base64.b64encode(my_stringIObytes.read())
        img = my_base64_jpgData.decode('utf-8')

        return jsonify(aprox=r,area=ar,img=img)

@app.route('/error', methods=['POST', 'GET'])
def error_1():
    if request.method=='POST':
        json = request.get_json()
        equ = parse_expr(json["f"])
        a = int(json["a"])
        b = int(json["b"])
        er = float(json["er"])
        met = json["met"]
        print(equ,a,b, er, met)
        
        if met == "1":
            pri = diff(equ)
            sec = diff(pri)
            x1 = (a+b)/2
            k = sec.subs(x, x1)
            ene = (k*((b-a)**3)/(24*er))**(1/2)
        elif met == "2":
            pri = diff(equ)
            sec = diff(pri)
            x1 = (a+b)/2
            k = sec.subs(x, x1)
            ene = (k*((b-a)**3)/(12*er))**(1/2)
        else:
            pri = diff(equ)
            sec = diff(pri)
            ter = diff(sec)
            cua = diff(ter)
            x1 = (a+b)/2
            k = cua.subs(x, x1)
            ene = (k*((b-a)**5)/(180*er))**(1/4)
        print(float(ene))
        r = "{:.8f}".format(float(ene))
        r = str(r)
        r = round(float(r), 12)
        print(r)
        return str(ene)

if __name__ == '__main__':
    app.run()
