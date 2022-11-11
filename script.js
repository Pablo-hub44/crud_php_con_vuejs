var url = "bd/crud.php";

var appMoviles = new Vue({
    el: "#appMoviles",
    /*el referencia elemento */
    data: {
        moviles: [], //donde guardaremos los array de los moviles
        marca: "",
        modelo: "",
        stock: "",
        total: 0
    },
    methods: {
        //botones
        btnNuevo: async function() {
            const { value: formValues } = await Swal.fire({
                title: 'Nuevo',
                html: '<div class="row"><label class="col-sm-3 col-form-label">Marca</label><div class="col-sm-7"><input id="marca" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Modelo</label><div class="col-sm-7"><input id="modelo" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Stock</label><div class="col-sm-7"><input id="stock" type="number" min="0" class="form-control"></div></div>',
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                confirmButtonColor: '#1cc88a',
                cancelButtonColor: '#3085d6',
                preConfirm: () => {
                    return [
                        // traemos los id del index.php
                        this.marca = document.getElementById('marca').value,
                        this.modelo = document.getElementById('modelo').value,
                        this.stock = document.getElementById('stock').value
                    ]
                }
            })

            if (this.marca == "" || this.modelo == "" || this.stock == 0) {
                Swal.fire({
                    type: 'info',
                    title: 'Datos incompletos',
                })
            } else {
                this.nuevoMovil(); // llamamos a la funcion para dar nuevo movil 
                //lo de abajo mensaje para mostrar que fue agregado exitosamente un producto
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                });
                Toast.fire({
                    type: 'success',
                    title: '!Producto agregado!'
                })
            }
        },
        btnEditar: async function(id, marca, modelo, stock) {
            //console.log("id: "+id+"  -Marca: "+marca+" - modelo:"+modelo+" - stock:"+stock");
            await Swal.fire({
                title: 'Editar',
                html: '<div class=""form-group><div class="row"><label class="col-sm-3 col-form-label">Marca</label><div class="col-sm-7"><input id="marca" value="' + marca + '" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Modelo</label><div class="col-sm-7"><input id="modelo" value="' + modelo + '" type="text" class="form-control"></div></div><div class="row"><label class="col-sm-3 col-form-label">Stock</label><div class="col-sm-7"><input id="stock" value="' + stock + '" typy="number" min="0" class="form-control"></div></div></div>',
                focusConfirm: false,
                showCancelButton: true,
            }).then((result) => {
                if (result.value) {
                    //captura los nuevos datos si es que se modifican
                    marca = document.getElementById('marca').value,
                        modelo = document.getElementById('modelo').value,
                        stock = document.getElementById('stock').value,

                        this.editarMovil(id, marca, modelo, stock);
                    Swal.fire(
                        '!Actualizado!',
                        "El registro ha sido actualizado",
                        'success'
                    )
                }
            });

        },
        btnBorrar: function(id) {
            Swal.fire({ //con este codigo llamamos a sweetalert2
                title: '¿Esta seguro de borrar el registro:' + id + " ?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Borrar'
            }).then((result) => { //si el result se confirma va a borrarMovil
                if (result.value) {
                    this.borrarMovil(id);
                    //le mostramos un mensaje sobre la eliminacion
                    Swal.fire(
                        'Eliminado',
                        'El registro ha sido borrado.',
                        'success'
                    )
                }

            })
        },
        //PROCEDIMIENTOS
        //Procedimiento listar
        listarMoviles: function() {
            axios.post(url, { opcion: 4 }).then(response => {
                this.moviles = response.data; //la response se la asignamos al arreglo moviles
                // console.log(this.moviles);
            });
        },
        //procedimiento Crear
        nuevoMovil: function() {
            axios.post(url, { opcion: 1, marca: this.marca, modelo: this.modelo, stock: this.stock }).then(response => {
                this.listarMoviles();
            });
            this.marca = "";
            this.modelo = "";
            this.stock = 0;
        },
        //procedmiento editar
        editarMovil: function(id, marca, modelo, stock) {
            axios.post(url, { opcion: 2, id: id, marca: marca, modelo: modelo, stock: stock }).then(response => {
                this.listarMoviles();
            });
        },
        //procedimiento borrar
        borrarMovil: function(id) {
            axios.post(url, { opcion: 3, id: id }).then(response => {
                this.listarMoviles();
            });
        }
    },
    created: function() {
        this.listarMoviles();
    },
    computed: { //computed sirve para hacer calculos entre otras cosas
        TotalStock() {
            this.total = 0;
            for (movil of this.moviles) {
                this.total = this.total + parseInt(movil.stock);
            }
            return this.total;
        }
    }
});