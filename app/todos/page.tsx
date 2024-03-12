'use client'

import { useMutation } from '@tanstack/react-query'
import { Todo } from '../page'
import axios from 'axios'

type Props = {}

const TodosPage = (props: Props) => {
	const { error, isPending, isSuccess } = useMutation({
		mutationFn: (newTodo: Todo) => {
			return axios.post('https://localhost:3001/todos', newTodo)
		}
	})

	return <div>TodosPage</div>
}

export default TodosPage
