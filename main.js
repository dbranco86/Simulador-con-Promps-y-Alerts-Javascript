//CONSTRUCTOR DE OBJETOS
class Producto {
    constructor(nombre, precio) {
        this.nombre  = nombre.toUpperCase();
        this.precio  = Number (precio);
    }
    mensaje(){
        alert("Seleccione un producto de la lista" + this.nombre +" " + this.precio);
    }
}

//CREO OBJETOS
const PRODUCTO_1 = new Producto ("EMPANADA", "10");
const PRODUCTO_2 = new Producto ("HAMBURGUESA", "15"); 
const PRODUCTO_3 = new Producto ("MILANESA", "20");
const PRODUCTO_4 = new Producto ("REFRESCO", "5");

//CREO ARRAY DE PRODUCTOS
const productos = [
    PRODUCTO_1,
    PRODUCTO_2,
    PRODUCTO_3,
    PRODUCTO_4
];

//CREO ARRAY DE CARRITO
let carrito = [];

const TIPO_MONEDA = "USD";
let pregunta;
let cantidad;
let todosLosProductos = productos.map((producto) => producto.nombre + " " + producto.precio + " " + TIPO_MONEDA);

//EVALUANDO DIFERENTES CONDICIONES
do {
    pregunta = prompt("Bienvenido a Fast Food, desea realizar una compra Si(S) No (N)");
}
while (!validarRespuesta(pregunta));

if (pregunta.toUpperCase() == "S"){    
    alert("Bienvenido a Fast Food \n" + "A continuación la lista de productos");
}else if(pregunta.toUpperCase() == "N"){
    alert("Gracias por visitarnos, nos vemos en la próxima!");
}

while (pregunta.toUpperCase() != "N"){
    let producto = prompt ("Seleccione un producto: \n" + "Lista de Insumos y Precios: \n\n" + todosLosProductos.join("\n")).toUpperCase();
    let precio = 0;
    let condicion = true;
    while(condicion){
        if (validarProducto(producto)){    
            let productoSeleccionado = productos.find((p) => p.nombre.toUpperCase() === producto.toUpperCase());
            precio = productoSeleccionado.precio;
            // PIDE LA CANTIDAD //
            do {
                cantidad = parseInt (prompt ("Ingrese la cantidad: "));
                //AGREGO PRODUCTO AL CARRITO
                if (cantidad > 0) {
                    // AGREGO PRODUCTO AL CARRITO
                    carrito.push({
                        producto, 
                        cantidad, 
                        precio
                    });
                    condicion = false;
                }            
            }
            while (validarCantidad(cantidad));
        }else {
                alert ("Ingrese un producto correcto");
                producto = prompt ("Seleccione un producto: \n" + "Lista de Insumos y Precios: \n\n" + todosLosProductos.join("\n")); 
        }
    }   
    //EVALUA CONDICION
    do{
        pregunta = prompt("Desea seguir comprando? (S / N)");
    }
    while (!validarRespuesta(pregunta));    
    
    //MUESTRA LO QUE HAY EN EL CARRITO 
    while (pregunta.toUpperCase() == "N"){
        alert("Gracias por su compra.");
        carrito.forEach((carritoFinal)=>{
        console.log (`Producto: ${carritoFinal.producto}, Cantidad: ${carritoFinal.cantidad}, Total a pagar por producto: ${carritoFinal.cantidad * carritoFinal.precio}`)        
        });
    break; 
    }
}
let suPedido = carrito.map((producto) => producto.producto + " " + producto.precio * producto.cantidad + " " + TIPO_MONEDA);
alert("A continuación su pedido: \n\n" + suPedido.join("\n"));

// FUNCIONES //
function validarProducto(producto) {
    const productosValidos = [productos[0].nombre, productos[1].nombre, productos[2].nombre, productos[3].nombre];
    return productosValidos.includes(producto.toUpperCase());
}

function validarRespuesta(seleccion) {
    return seleccion.toUpperCase() === "S" || seleccion.toUpperCase() === "N";
}

function validarCantidad(seleccion) {
    return seleccion === isNaN || seleccion <= 0;
}

function mensaje(producto){
    alert("Usted ha escogido" + " " + producto);
}

const totalCompra = carrito.reduce((a, b) => a + b.cantidad * b.precio, 0);
alert (`El total a pagar por su compra es: ${totalCompra} ${TIPO_MONEDA}`);
alert ("Gracias por su vista, lo esperamos pronto!");

