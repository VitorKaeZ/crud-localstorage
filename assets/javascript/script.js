var dados = []

function PopulaTabela() {
    if (Array.isArray(dados)) {

        $("#tblDados tbody").html("")

        dados.forEach(function(item) {
            $("#tblDados tbody").append(`<tr>
                <td>${item.Id}</td>
                <td>${item.Nome}</td>
                <td>${item.Nascimento}</td>
                <td>${item.Documento}</td>
            </tr>`)
        })
    }

}

$(function() {

    dados = JSON.parse(localStorage.getItem("__dados__"))

    if (dados) {
        PopulaTabela()
    }

})