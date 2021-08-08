import tarefas from './tarefas'
import Item from './item'
import TodoForm from './todoForm'
import Lista from './lista'
import { useState } from 'react';
import './Todo.css'
export default function Todo() {
    const [listaTarefas, setListaTarefas] = useState(tarefas);
    const [inputsValues, setInputsValues] = useState([]);
    function onAddItem(novaTarefa) {
        /* Essa função foi feita para que o componente filho pudesse ter acesso aos estados que só são permitidos serem declarados no componente raíz/pai */

        let newTask = new Item(novaTarefa)
        setListaTarefas([...listaTarefas, newTask]);
    }
    function getValues(values) {
        /* Essa função foi feita para que o componente filho pudesse ter acesso aos estados que só são permitidos serem declarados no componente raíz/pai */
        setInputsValues(values);
    }

    function onItemDeleted(tarefa) {
        const verificador = (tarefa) => tarefa ? "Tarefa concluída." : "Tarefa incompleta."; //Expressão ternária
        const escolha = window.confirm("Você realmente deseja excluir essa tarefa? \n\nTítulo: " + tarefa.text.titulo + "\nEstado atual da tarefa: " + verificador(tarefa.done));
        if (escolha) {

            let tarefaFiltradas = listaTarefas.filter(task => task.id !== tarefa.id)

            setListaTarefas(tarefaFiltradas);
        }
    }

    function taskCompleted(tarefa) {
        let taskTitle = document.getElementById("title" + tarefa.id);
        let taskDesc = document.getElementById("desc" + tarefa.id);
        let li = document.getElementById("task" + tarefa.id);
        let estado = document.getElementById("task_estado" + tarefa.id);
        console.log(tarefa)
        let listaAtualizada = listaTarefas.map(task =>{
            if(task.id === tarefa.id){
                console.log(task.id,tarefa.id)
                if(task.done){
                    estado.innerHTML = "";
                    li.style.borderColor = "initial";
                    taskDesc.style.textDecoration = "none";
                    taskTitle.style.textDecoration = "none";
                    task.done = !task.done
                }else{
                    estado.append("OK");
                    li.style.borderColor = "green";
                    taskDesc.style.textDecoration = "line-through";
                    taskTitle.style.textDecoration = "line-through";
                    task.done = !task.done;
                }
            } 
            return task;
        })

        setListaTarefas(listaAtualizada);
       
    }
    return (
        <>
            <div className="warning">
                {WarningConteinerText(inputsValues)}
            </div>
            <div className="container">
                <h1 className="titulo">Lista De Tarefas</h1>
                <TodoForm onAddItem={onAddItem} getValues={getValues}></TodoForm>{/* Componente filho */}
                <Lista onItemDeleted={onItemDeleted} listaTarefas={listaTarefas} taskCompleted={taskCompleted}></Lista>{/* Componente filho */}
            </div>
        </>
    )
}




function WarningConteinerText(inputsValues) {
    /* Função com o intuito de checar se os valores passados estão preenchidos ou não */

    if (inputsValues.length === 0) {
        return (
            <h4>Array vazio</h4>
        )
    } else {
        if (inputsValues[0].title === "" && inputsValues[0].descricao === "") {
            return (
                <h4>Ambos os campos estão vazios.</h4>
            )
        } else {
            if (inputsValues[0].title === "") {
                return (
                    <h4>O Campo para a inserção do título está vazio.</h4>
                )
            } else if (inputsValues[0].descricao === "") {
                return <h4>O Campo para a inserção da descrição da tarefa está vazio.</h4>
            }
        }
    }

}



