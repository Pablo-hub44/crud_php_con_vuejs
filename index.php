<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Telefonos</title>
        <!-- BOOTSTRAP CSS -->
        <link rel="stylesheet" href="bootstrap-4.5.3/css/bootstrap.min.css">
        <!--nuestro css-->
        <link rel="stylesheet" href="style.css">
        <!--datatables css basico-->
        <link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css">
        <!--datatables estilo bootstrap 4 css-->
        <link rel="stylesheet" href="DataTables/DataTables-1.10.23/css/dataTables.bootstrap4.min.css">
        <!--google icons-->
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">  
        <!--font awesome-->
        <script src="https://kit.fontawesome.com/69ea92256c.js" crossorigin="anonymous"></script>
        <!--sweetalert 2-->
        <link rel="stylesheet" href="plugins/sweetalert2/sweetalert2.min.css">

</head>
<body>
<!--front-end es la parte que se ve del proyecto--->
<!--back-end es la parte realizada con php, vue.js-->
    
    <header>
        <h2 class="text-center text-dark"><span class="badge badge-primary">Stock de telefonos</span></h2>
    </header>

    <div id="appMoviles">
        <div class="container">
            <div class="row">
                    <div class="col">
                        <button class="btn btn-success" title="Nuevo" @click="btnNuevo"><i class="fas fa-plus-circle"></i></button>
                    </div>
                    <div class="col text-right">
                    <h5>Stock total: <span class="badge badge-success">{{TotalStock}}</span></h5>
                    </div>
            </div>
            <div class="row mt-5">
                    <div class="col-lg-12">
                        <table class="table table-striped table-bordered table-condensed" style="width:100%">
                        <thead>
                            <tr class="bg-primary text-light"> <!--definir fila , hacia la derecha-->
                                <td>ID</td><!--definir campos por fila-->
                                <td>Marca</td>
                                <td>Modelo</td>
                                <td>Stock</td>
                                <td>Acciones</td>
                            </tr>
                        </thead>
                        <tbody>
                                <tr v-for="(movil,indice) of moviles">
                                    <td>{{movil.id}}</td>
                                    <td>{{movil.marca}}</td>
                                    <td>{{movil.modelo}}</td>
                                    <td>
                                        <div class="col-md-8">
                                        <input type="number" v-model.number="movil.stock" class="form-control text-right" disabled>
                                        </div>
                                    </td>
                                    <td>
                                    <div class="btn-group" role="group">
                                    <button class="btn btn-secondary" title="Editar" @click="btnEditar(movil.id, movil.marca, movil.modelo, movil.stock)"><i class="fas fa-pencil-alt"></i></button>
                                    <button class="btn btn-danger" title="Eliminar" @click="btnBorrar(movil.id)"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                    </td>
                                
                                </tr>

                        </tbody>
                        </table>
                    </div>
            </div>
        </div>
    </div>






    <!--Jquery, popper.js, bootstrap.js-->
    <script src="jquery/jquery-3.5.1.min.js"></script>
    <script src="popper/popper.min.js"></script>
    <script src="bootstrap-4.5.3/js/bootstrap.min.js"></script>

    <!--vue.js-->
   <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>-->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
    <!--<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>-->


    <!--Axios v0.21.1-->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

    <!--sweet alert 2-->
    <script src="plugins/sweetalert2/sweetalert2.all.min.js"></script>

    <!--codigo js propio-->
    <script src="script.js"></script>

</body>
</html>