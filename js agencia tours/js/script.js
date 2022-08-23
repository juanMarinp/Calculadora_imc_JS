class Tour{
    constructor(id, nombre, valorBase){
        this.id = id;
        this.nombre = nombre;
        this.valorBase = valorBase;
    };
//Getter
    get getId(){
        return this.id;
    };
    get getNombre(){
        return this.nombre;
    };
    get getValorBase(){
        return this.valorBase;
    };
};

class Persona {
    constructor(id, nombre, apellido, edad, email, pais) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.pais = pais;
    };
    // Setter
    set setId(id) {
        this.id = id;
    };
    set setNombre(nombre) {
        this.nombre = nombre;
    };
    set setApellido(apellido) {
        this.apellido = apellido;
    };
    set setEdad(edad) {
        this.edad = edad;
    };
    set setEmail(email) {
        this.email = email;
    };
    set setPais(pais) {
        this.pais = pais;
    };
    //Getter

    get getId() {
        return this.id;
    };
    get getNombre() {
        return this.nombre;
    };
    get getApellido() {
        return this.apellido;
    };
    get getEdad() {
        return this.edad;
    };
    get getEmail() {
        return this.email;
    };
    get getPais() {
        return this.pais;
    };
};

class Inscripcion {
    constructor(id) {
        this.id = id;
        this.cliente = 0;
        this.tour = 0;
        this.valorBase = 0;
        this.descuento = 0;
        this.seguro = 0;
        this.iva = 0;
        this.valorFinal = 0;
    };
    //Setter
    set setId(id) {
        this.id = id;
    };
    set setCliente(cliente) {
        this.cliente = cliente;
    };
    set setTour(tour) {
        this.tour = tour;
    };
    set setValorBase(valorBase) {
        this.valorBase = valorBase;
    };
    //Getter
    get getId() {
        return this.id;
    };
    get getCliente() {
        return this.cliente;
    };  
    get getTour() {
        return this.tour;
    };  
    get getValorBase() {
        return this.valorBase;
    };  
    get getDescuento() {
        return this.descuento;
    };  
    get getSeguro() {
        return this.seguro;
    };  
    get getIva() {
        return this.iva;
    };  
    get getValorFinal() {
        return this.valorFinal;
    };  

    calcularDescuento(){
        if (this.cliente.getEdad < 18) {
            var descuento = this.tour.getValorBase * 0.2; 
        } else if (this.cliente.getEdad > 60) {
            var descuento = this.tour.getValorBase * 0.3;
        } else {
            var descuento = 0;
        };

        this.descuento = descuento;
    };

    calcularIva() {
        this.iva = this.tour.getValorBase * 0.19;
    };

    calcularSeguro() {
        this.seguro = this.tour.getValorBase * 0.05;
    };

    calcularValorFinal() {
        this.valorFinal = (this.tour.getValorBase + this.seguro + this.iva - this.descuento);
    };
};

var tour = new Tour(1, "Valle de la Luna", 37.5)
var tour2 = new Tour(2, "Geysers del Tatio", 69)
var tour3 = new Tour(3, "Laguna Cejar, Ojos del Salado", 55)

var tours = [tour, tour2, tour3];

var clientes = [];

var inscripciones = [];

var vaciarAddCliente = function () {
    document.getElementById("idCliente").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pais").value = "";
};

var alertBoot = function (idName, mensaje, alertType) {
    removeElementsByClass("alert-danger")
    removeElementsByClass("alert-success")

    var div = document.createElement("div")

    div.className = alertType

    var text = document.createTextNode(mensaje)

    div.appendChild(text);

    var element = document.getElementById(idName);

    element.prepend(div);
};

var addCliente = function () {

    var id = document.getElementById("idCliente").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var edad = parseInt(document.getElementById("edad").value);
    var email = document.getElementById("email").value;
    var pais = document.getElementById("pais").value;

    if (id == "" || nombre == "" || apellido == "" || email == "" || pais == "" || document.getElementById("edad").value == ""){
        alertBoot("formAddCliente", "Ingrese todos los datos.", "alert alert-danger")
    } else if (clientes.find(cliente => cliente.getId == id) != undefined){
        alertBoot("formAddCliente", "Cliente ya se encuntra en la base de datos.", "alert alert-danger")
    } else {
        
            var cliente = new Persona(id, nombre, apellido, edad, email, pais);
        
            clientes.push(cliente);
        
            vaciarAddCliente();

            alertBoot("formAddCliente", "Cliente ingresado con exito!", "alert alert-success")
    };
};

var limpiarAddInscripcion = function () {
    document.getElementById("idInscripcion").value = "";
    document.getElementById("idPersonaInscripcion").value = "";
    document.getElementById("idTourInscripcion").value = "";
};

var addInscripcion = function () {
    var id = document.getElementById("idInscripcion").value;
    var idCliente = document.getElementById("idPersonaInscripcion").value;
    var idTour = document.getElementById("idTourInscripcion").value;

    if (id == "" || idCliente == "" || idTour == "") {
        alertBoot("formAddInscripcion", "Ingrese todos los datos.", "alert alert-danger")
    } else if (inscripciones.find(inscripcion => inscripcion.getId == id) != undefined){
        alertBoot("formAddInscripcion", "Id repetido", "alert alert-danger")
    } else if (idTour < 1 || idTour > 3) {
        alertBoot("formAddInscripcion", "Seleccione un id de tour valido.", "alert alert-danger")
    } else if (clientes.find(cliente => cliente.getId == idCliente) == undefined){
        alertBoot("formAddInscripcion", "Cliente no existe.", "alert alert-danger")
    }else{
        var clienteIndex = clientes.findIndex(cliente => cliente.getId == idCliente);
    
        var tourIndex = tours.findIndex(tour => tour.getId == idTour);
    
        var inscripcion = new Inscripcion(id);
    
        inscripcion.setCliente = clientes[clienteIndex];
    
        inscripcion.setTour = tours[tourIndex];
    
        inscripcion.calcularDescuento();
    
        inscripcion.calcularIva();
    
        inscripcion.calcularSeguro();
    
        inscripcion.calcularValorFinal();
    
        inscripcion.setValorBase = inscripcion.getTour.getValorBase;
    
        inscripciones.push(inscripcion);
    
        tablaInscripciones();

        alertBoot("formAddInscripcion", "Inscripción Ingresada con exito!", "alert alert-success")

        limpiarAddInscripcion();
    };
};

var buscar = function () {
    var id = document.getElementById("idInscripcionBuscar").value;

    var encontrado = inscripciones.find(inscripcion => inscripcion.getId == id);

    if (id == ""){
        alertBoot("formBuscarInscripcion", "Ingrese id.", "alert alert-danger");
    } else if (encontrado == undefined){
        alertBoot("formBuscarInscripcion", "Id no encontrado.", "alert alert-danger");
    } else {

    document.getElementById("idBusqueda").innerHTML = encontrado.getId;
    document.getElementById("idClienteBusqueda").innerHTML = encontrado.getCliente.getId;
    document.getElementById("nombreClienteBusqueda").innerHTML = `${encontrado.getCliente.getNombre} ${encontrado.getCliente.getApellido}`;
    document.getElementById("tourBusqueda").innerHTML = encontrado.getTour.getNombre;
    document.getElementById("vBaseBusqueda").innerHTML = toClp(encontrado.getValorBase);
    document.getElementById("descuentoBusqueda").innerHTML = toClp(encontrado.getDescuento);
    document.getElementById("seguroBusqueda").innerHTML = toClp(encontrado.getSeguro);
    document.getElementById("ivaBusqueda").innerHTML = toClp(encontrado.getIva);
    document.getElementById("vFinalBusqueda").innerHTML = toClp(encontrado.getValorFinal);

    document.getElementById("idInscripcionBuscar").value = "";
    };
};

var tablaInscripciones = function () {
    var nodes = inscripciones.map(inscripcion => {
      removeElementsByClass("trInscripcion");
  
      var tr = document.createElement("tr");

      if (inscripcion.getTour.getId == 1){
        tr.className = "trInscripcion alert alert-secondary";
      } else if (inscripcion.getTour.getId == 2){
        tr.className = "trInscripcion alert alert-warning";
      } else {
        tr.className = "trInscripcion alert alert-primary";
      };
  
      
  
      var th = document.createElement("th");
      var td = document.createElement("td");
      var td2 = document.createElement("td");
      var td3 = document.createElement("td");
      var td4 = document.createElement("td");
      var td5 = document.createElement("td");
      var td6 = document.createElement("td");

      th.textContent = inscripcion.getId;
      td.textContent = inscripcion.getCliente.getId;
      td2.textContent = `${inscripcion.getCliente.getNombre} ${inscripcion.getCliente.getApellido}`;
      td3.textContent = inscripcion.getCliente.getEdad;
      td4.textContent = inscripcion.getTour.getNombre;
      td5.textContent = toClp(inscripcion.getValorBase);
      td6.textContent = toClp(inscripcion.getValorFinal);
  
      tr.appendChild(th);
      tr.appendChild(td);
      tr.appendChild(td2);
      tr.appendChild(td3);
      tr.appendChild(td4);
      tr.appendChild(td5);
      tr.appendChild(td6);
  
      return tr;
      });
    
      tInscripciones.append(...nodes);
  };

// Funcion para remover elementos de html segun la clase
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
};

var toClp = function (usd) {
    return `${usd * 850} CLP`
};