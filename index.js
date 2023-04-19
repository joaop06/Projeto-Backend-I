const express = require("express");
const app = express();
const tasksList = require("./tasksList.json")
const fs = require('fs');

app.use(express.json());

// Inicialização do servidor local
app.listen(8080, () => {
    console.log("Servidor local ativo! Porta: 8080")
})



app.get('/', function (req, res) {
    res.status(200).json({
        massage: 'Sucesso!',
    })
})

// Busca todas as tarefas
app.get('/tasks', (req, res) => {
    res.status(200).json({
        msg: "Sucesso!",
        tarefas: tasksList
    })
})

// Busca tafera específica pelo id
app.get('/tasks/:id', (req, res) => {
    const tarefa = tasksList.find(item => item.id == req.params.id);

    if (tarefa){
        res.status(200).json({
            msg: "Sucesso!",
            tarefa: tarefa
        })
    } else {
        res.status(400).json({
            msg: "Tarefa não encontrada."
        })
    }
})

// Cria nova tarefa
app.post('/tasks', (req, res) => {
    const {title, description, completed} = req.body;


    tasksList.push({
        id: tasksList.length + 1,
        title: title,
        description: description,
        completed: completed
    })

    res.status(200).json({
        msg: "Tarefa criada com sucesso!",
        tarefas: {...tasksList}
    })
})

// Edição de tarefa
app.put('/tasks/:id', (req, res) => {
    const {id} = req.params;
    const {title, description, completed} = req.body;

    if(!id){
        return res.status(400).json({
            msg: "Tarefa não encontrada."
        })
    }


    const tarefa = tasksList.find(item => item.id == req.params.id);
    tarefa.title = title;
    tarefa.description = description;
    tarefa.completed = completed;

    res.status(200).json({
        msg: "Tarefa atualizada!",
        tarefa: tarefa
    })

})

// Deletar tarefa
app.delete('/tasks/:id', (req, res) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({
            msg: "Tarefa não encontrada."
        })
    }

    let tarefa = tasksList.findIndex(item => item.id == req.params.id);
    console.log(tarefa, id)

    if(tarefa == (id-1)){
        tasksList.splice(tarefa, 1);
        res.status(200).json({
            msg: "Tarefa apagada!",
            tarefas: tasksList
        })
    } else {
        res.status(400).json({
            msg: "Tarefa não encontrada."
        })
    }


})