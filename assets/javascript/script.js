var dados = []

//Apaga o Registro
function ApagaRegistro(id){
    let _confirm = confirm("Deseja realmente excluir este registro?")
    if (_confirm) {
        for(let i = 0; i < dados.length; i++) {
            if (dados[i].Id == id){
                dados.splice(i, 1)
            }
        }
        AddTabela()
    }
}

//Edita o Registro
function EditaRegistro(id){
    $("#modalRegistro").modal("show")

    dados.forEach(function(item){
        if (item.Id == id){
            $("#hdID").val(item.Id)
            $("#txtNome").val(item.Nome)
            $("#txtNascimento").val(item.Nascimento.substr(6, 4) + "-" + item.Nascimento.substr(3, 2) + "-" + item.Nascimento.substr(0, 2))
            $("#txtDocumento").val(item.Documento)
        }
    })
}

function AddTabela() {
    if (Array.isArray(dados)) {

        localStorage.setItem("__dados__",JSON.stringify(dados))

        $("#tblDados tbody").html("")

        dados.forEach(function(item) {
            $("#tblDados tbody").append(`<tr>
                <td>${item.Id}</td>
                <td>${item.Nome}</td>
                <td>${item.Nascimento}</td>
                <td>${item.Documento}</td>
                <td><button type="button" class="btn btn-primary" onclick="javascript:EditaRegistro(${item.Id});"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button type="button" class="btn btn-danger" onclick="javascript:ApagaRegistro(${item.Id});"><i class="fa-solid fa-trash-can"></i></button></td>
            </tr>`)
        })
    }

}

$(function() {
//Executa ao carregar a pagina
    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        AddTabela()
    }

    $("#btnSalvar").click(function(){

        let _id = $("#hdID").val()
        let nome = $("#txtNome").val()
        let nascimento = new Date($("#txtNascimento").val()).toLocaleDateString("pt-br", { timeZone: "UTC"})
        let documento = $("#txtDocumento").val()
        

        //Cria ou atualiza um registro
        if (!_id || _id == "0") {
            let registro = {}
            registro.Nome = nome
            registro.Nascimento = nascimento
            registro.Documento = documento

            registro.Id = dados.length + 1
            dados.push(registro)
        }else{
            dados.forEach(function(item){
                if (item.Id == _id) {
                    item.Nome = nome
                    item.Nascimento = nascimento
                    item.Documento = documento
                }
            })
        }


        $("#modalRegistro").modal("hide")
        alert("Registro salvo com sucesso!!")

        
        //LIMPAR CAMPOS
        $("#hdID").val("0")
        $("#txtNome").val("")
        $("#txtNascimento").val("")
        $("#txtDocumento").val("")

        AddTabela()
    })
})