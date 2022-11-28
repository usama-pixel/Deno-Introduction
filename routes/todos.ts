import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router()

interface Todo {
  id: string;
  text: string
}
let todos: Todo[] = []

router.get('/todos', ctx => {
  ctx.response.body = {todos}
})
router.post('/todos', async ctx => {
  const result = ctx.request.body()
  const data = await result.value
  const newTodo: Todo = {
    id: new Date().getTime().toString(),
    text: data.text
  }
  todos.push(newTodo)
  ctx.response.body = {message: 'Todo created', todo: newTodo}
})
router.put('/todos/:todoId', async ctx => {
  const tid = ctx.params.todoId
  const result = ctx.request.body()
  const data = await result.value

  const todoIndex = todos.findIndex(todo => todo.id === tid)
  todos[todoIndex] = {id: tid, text: data.text}
  ctx.response.body = {message: 'Todo updated'}
})
router.delete('/todos/:todoId', ctx => {
  const tid = ctx.params.todoId
  todos = todos.filter(todo => todo.id !== tid)
  ctx.response.body = {message: 'Todo deleted'}
})

export default router