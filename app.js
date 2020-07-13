var db = firebase.firestore()


//AGREGAR DOCUMENT
function guardar(){
    var capilla = document.getElementById('capi').value;
    var name = document.getElementById('nombre').value;
    var cedula = document.getElementById('ci').value;
    var date = document.getElementById('fecha').value;
    var etapas = document.getElementById('etapa').value;
    var bautismo = document.getElementById('baus').value;
    var comunion = document.getElementById('comu').value;
    var responsable = document.getElementById('resp').value;
    var celular = document.getElementById('cel').value;

    //variable en la DB
    db.collection("users").add({
        chapel: capilla,
        first: name,
        identification: cedula,
        born: date,
        stage: etapas,
        baptism: bautismo,
        communion: comunion,
        responsa: responsable,
        mobile: celular
    })
    .then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
        location.reload(true);
        document.getElementById('capi').value = '';
        document.getElementById('nombre').value = '';
        document.getElementById('ci').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('etapa').value = '';
        document.getElementById('baus').value = '';
        document.getElementById('comu').value = '';
        document.getElementById('resp').value = '';
        document.getElementById('cel').value = '';
        
    })
    .catch(function(error){
        console.error("Error adding document: ", error);
    });
}




//LEER DOCUMENTO
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) =>{
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) =>{
        console.log(`${doc.id} => ${doc.data().first}`);
        
        tabla.innerHTML += `
        <tr>
        <td>${doc.data().chapel}</td>
        <td>${doc.data().first}</td>
        <td>${doc.data().identification}</td>
        <td>${doc.data().born}</td>
        <td>${doc.data().stage}</td>
        <td>${doc.data().baptism}</td>
        <td>${doc.data().communion}</td>
        <td>${doc.data().responsa}</td>
        <td>${doc.data().mobile}</td>
        <td><button class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" 
            onclick="editar('${doc.id}',
            '${doc.data().chapel}',
            '${doc.data().first}',
            '${doc.data().identification}',
            '${doc.data().born}',
            '${doc.data().stage}',
            '${doc.data().baptism}',
            '${doc.data().communion}',
            '${doc.data().responsa}',
            '${doc.data().mobile}')">Editar</button>
        </td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        </tr>
        `
    });
});



//BORRAR DOC
function eliminar(id){
    db.collection("users").doc(id).delete().then(function(){
        console.log("Document successfully deleted");

    }).catch(function(error){
        console.log("Error removing document: ", error)
    })
}

//EDITAR DOCUMENTOS

function editar(id, capilla, name, identification, date, etapas, bautismo, comunion, responsable, celular){

    document.getElementById('capi').value = capilla;
    document.getElementById('nombre').value = name;
    document.getElementById('ci').value = identification;
    document.getElementById('fecha').value = date;
    document.getElementById('etapa').value = etapas
    document.getElementById('baus').value = bautismo
    document.getElementById('comu').value = comunion
    document.getElementById('resp').value = responsable
    document.getElementById('cel').value = celular
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function(){
        var washingtonRef = db.collection("users").doc(id);
        //ENVIAR EL ELEMENTO DE LA DB
        var capilla = document.getElementById('capi').value;
        var name = document.getElementById('nombre').value;
        var cedula = document.getElementById('ci').value;
        var date = document.getElementById('fecha').value;
        var etapas = document.getElementById('etapa').value;
        var bautismo = document.getElementById('baus').value;
        var comunion = document.getElementById('comu').value;
        var responsable = document.getElementById('resp').value;
        var celular = document.getElementById('cel').value;

        return washingtonRef.update({
            chapel: capilla,
            first: name,
            identification: cedula,
            born: date,
            stage: etapas,
            baptism: bautismo,
            communion: comunion,
            responsa: responsable,
            mobile: celular
        })
        .then(function(){
            console.log("Document successfully updated!");
            document.getElementById('capi').value = '';
            document.getElementById('nombre').value = '';
            document.getElementById('ci').value = '';
            document.getElementById('fecha').value = '';
            document.getElementById('etapa').value = '';
            document.getElementById('baus').value = '';
            document.getElementById('comu').value = '';
            document.getElementById('resp').value = '';
            document.getElementById('cel').value = '';
            boton.innerHTML = 'Guardar';
            
        })
        .catch(function(error){
            //envia cuando el doc no existe probablemente
            console.error("Error updating document: ", error);
        });
    }
}


function contar(){
    db.collection('users').get().then(snap => {
        size = snap.size // will return the collection size
        alert('La cantidad de inscriptos son: '+ size)
    });
}

