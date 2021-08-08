
export default function Formulario(props) {

    const handleChange = (e) => {
        e.preventDefault(); //Evita o comportamento padrão do formulário que é o envio dos dados para uma action ocasionando um recarregamento da página.
        const titulo = e.target[0];
        const descricao = e.target[1];
        let warning = document.getElementsByClassName('warning')[0];
        if (EmptyInputs(titulo, descricao)) {

            props.getValues([{
                title: titulo.value,
                descricao: descricao.value
            }]);
            /* setInputsValues([descricao.value]); */

            warning.classList.add("meuSlideInDown")

            return;
        }


        let tarefa = {
            titulo: titulo.value,
            descricao: descricao.value
        }
       
        props.onAddItem(tarefa);
        /*  console.log(inputsValues.length) */
        titulo.value = "";
        descricao.value = "";
        warning.classList.remove("meuSlideInDown")
    }

    return (
        <form onSubmit={handleChange}>
            <input type="text" name="titulo" placeholder="Titulo da tarefa" />
            <textarea type="text" name="desc" placeholder="Descreva a tarefa" />
            <button>Adicionar Tarefa</button>
        </form>
    )
}


function EmptyInputs(titulo, descricao) {
    if (titulo.value === "" || descricao.value === "") {
        return true;
    }

    return false;
}

