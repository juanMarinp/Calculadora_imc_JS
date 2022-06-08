var flecha = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-caret-left-square-fill" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm10.5 10V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4A.5.5 0 0 0 10.5 12z"/></svg>'

class Persona {
    constructor (rut, nombre, edad, peso, estatura) {
        this.rut = rut;
        this.nombre = nombre;
        this.edad = edad;
        this.peso = peso;
        this.estatura = estatura;
        this.imc = 0;
        this.estado = "";
        this.colorEstado = "";
        this.ident = "";
    };

    calcularImc() {

        var imc = this.peso / Math.pow(this.estatura, 2);

        this.imc = imc.toFixed(2);
    };

    obtenerEstado() {
    
        var r;
    
        var r2;
    
        if (this.imc < 18.5) {
            r = "Bajo peso"
    
            this.colorEstado = "alert alert-warning"
    
            this.ident = "bajoPeso"
    
            if (this.imc < 16) {
                r2 = "Delgadez severa"
    
                this.ident = "delgadezSevera"
            } else if (this.imc >= 16 && this.imc < 17) {
                r2 = "Delgadez moderada"
    
                this.ident = "delgadezModerada"
            } else {
                r2 = "Delgadez aceptable"
    
                this.ident = "delgadezAceptable"
            };
        } else if (this.imc >= 18.5 && this.imc < 25) {
            r = "Normal"
    
            this.ident = "normal"
    
            this.colorEstado = "alert alert-success"
    
            r2 = null
    
        } else if ( this.imc >= 25 && this.imc < 30 ) {
            r = "Sobrepeso"
    
            this.ident = "preObeso"
    
            this.colorEstado = "alert alert-dark"
    
            r2 = "Pre-obeso (Riesgo)"
    
        } else {
            r = "Obeso"
    
            this.ident = "obeso"
    
            this.colorEstado = "alert alert-danger"
        
            if ( this.imc >= 30 && this.imc < 35 ) {
                r2 = "Obeso tipo I (Riesgo moderado)"
    
                this.ident = "obeso1"
            } else if ( this.imc >= 35 && this.imc < 40 ) {
                r2 = "Obeso tipo II (Riesgo severo)"
    
                this.ident = "obeso2"
            } else {
                r2 = "Obeso tipo III (Riesgo muy severo)"
    
                this.ident = "obeso3"
            };
        
        } ;

        if (r2 != null){
            this.estado = `${r} , ${r2}`; 
        } else {
            this.estado = r;   
        };
        
    };

    desplegar() {

        document.getElementById("respuesta").innerHTML = `Estado : ${this.estado}`;
        
        document.getElementById("respuesta").className = this.colorEstado;
        
        document.getElementById("infoRut").innerHTML = `Rut : ${this.rut}`;
        document.getElementById("infoNombre").innerHTML = `Nombre : ${this.nombre}`;
        document.getElementById("infoEdad").innerHTML = `Edad : ${this.edad}`;
        document.getElementById("respuestaImc").innerHTML = `Imc : ${this.imc}`;
        
        limpiarFlechas();
        
        document.getElementById(this.ident).innerHTML = flecha;
    };

    get getRut() {
        return this.rut
    };

    get getNombre() {
        return this.nombre
    };

    get getEdad() {
        return this.edad
    };

    get getPeso() {
        return this.peso
    };

    get getEstatura() {
        return this.estatura
    };

    get getImc() {
        return this.imc
    };

    get getEstado() {
        return this.estado
    };

    // Setters

    set setNombre(nombre) {
        this.nombre = nombre;
    };

    set setEdad(edad) {
        this.edad = edad;
    };

    set setPeso(peso) {
        this.peso = peso;
    };

    set setEstatura(estatura) {
        this.estatura = estatura;
    };

    set setImc(imc) {
        this.imc = imc;
    };

    set setEstado(estado) {
        this.estado = estado;
    };

};

// Refresacar la lista cuando se añade, elimina o edita un usuario

var listRefresh = function () {

    removeElementsByClass("list-group-item personaLista");
        
    let nodes = personas.map(persona => {
        let li = document.createElement('li');
        li.textContent = `${persona.getNombre} | ${persona.getRut} | ${persona.getImc} | ${persona.getEstado}`;
        li.className = ("list-group-item personaLista");
        return li;
    });

    tabla.append(...nodes);  
};

var eliminar = function () {
  
    rutDel = document.getElementById("rutDel").value;

    var rutIndex =  personas.findIndex(persona => persona.getRut == rutDel);

    if (rutIndex != -1) {
            personas.splice(rutIndex, 1);
        
            listRefresh();

    } else {
        alert("Persona no encontrada")
    };
};

var editar = function () {
  
    var rutMod = document.getElementById("rutMod").value;
    var pesoMod = parseFloat(document.getElementById("pesoMod").value);
    var estaturaMod = parseFloat(document.getElementById("estaturaMod").value);

    var personaMod = personas.find(persona => persona.rut == rutMod);
    if (personaMod != undefined) {
        personaMod.setPeso = pesoMod;
        personaMod.setEstatura = estaturaMod;
        personaMod.calcularImc();
        personaMod.obtenerEstado();
    } else {
        alert("Persona no encontrada")
    };

    listRefresh();
};

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

var personas = []

var addPersona = function () {
        var p = new Persona (
            
                document.getElementById("rut").value,
            
                document.getElementById("nombre").value,
            
                parseInt(document.getElementById("edad").value), 
                
                parseFloat( document.getElementById("peso").value),
            
                parseFloat( document.getElementById("estatura").value)

        );

        p.calcularImc();

        p.obtenerEstado();

        personas.push(p);

        listRefresh();
}

var cleanInput = function () {
    document.getElementById("rut").value = ""
            
    document.getElementById("nombre").value = ""

    document.getElementById("edad").value = "" 
    
    document.getElementById("peso").value = ""

    document.getElementById("estatura").value = ""
}

var cleanBuscar = function () {
    
    document.getElementById("rutBuscar").value = ""

}

var encontrado;

var buscarPersona = function () {

    var rutBuscar = document.getElementById("rutBuscar").value

    encontrado = personas.find(element => element.getRut == rutBuscar)

    if (encontrado != undefined) {

        encontrado.desplegar();
    
    } else {
        alert("Persona no encontrada")
    }

}

const limpiarFlechas = function () {
    document.getElementById("bajoPeso").innerHTML = "";
    document.getElementById("delgadezSevera").innerHTML = "";
    document.getElementById("delgadezModerada").innerHTML = "";
    document.getElementById("delgadezAceptable").innerHTML = "";
    document.getElementById("normal").innerHTML = "";
    document.getElementById("sobrepeso").innerHTML = "";
    document.getElementById("preObeso").innerHTML = "";
    document.getElementById("obeso").innerHTML = "";
    document.getElementById("obeso1").innerHTML = "";
    document.getElementById("obeso2").innerHTML = "";
    document.getElementById("obeso3").innerHTML = "";
};

// .shift()
// .slice()
// .splice()
// .pop()
