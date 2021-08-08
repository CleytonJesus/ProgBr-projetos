const data = new Date();
const horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
export default function Lista(props) {
    /* console.log(props.listaTarefas[0].id) */
    return (
        <ul>
            {props.listaTarefas.map((tarefa) => {
                return (
                    <li id={"task" + tarefa.id} key={tarefa.id} title="Clique para confirmar a conclusão da tarefa.">
                        <div className="task_title" onClick={() => props.taskCompleted(tarefa)}>
                            <h3 id={"title" + tarefa.id} >{tarefa.text.titulo}</h3>
                            <span>{horario}</span>
                        </div>
                        <div className="container_desc">
                            <div id={"desc" + tarefa.id} className="task_desc" onClick={() => props.taskCompleted(tarefa)} >
                                <p>{tarefa.text.descricao}</p>
                            </div>
                            <div className="task_estado" id={"task_estado" + tarefa.id}></div>
                            <div onClick={() => { props.onItemDeleted(tarefa) /* Englobando a função dentro de outra permite a passagem de parâmetros à função desejada, impedindo a execução da mesma.*/ }} className="task_options" title="Excluir tarefa?"></div>

                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

