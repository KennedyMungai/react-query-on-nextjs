'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Todo } from '../page'

type Props = {}

const TodosPage = (props: Props) => {
	const { isError, isPending, isSuccess, error, mutate }: any = useMutation({
		mutationKey: ['createTodo'],
		mutationFn: (newTodo: Todo) => {
			return axios.post('https://localhost:3001/todos', newTodo)
		},
		onMutate: (variables) => {
			console.log('A mutation is about to happen')
		},
		onError: (error, variables, context) => {
			console.log('Something went wrong', error.message)
		},
		onSuccess: (data, variable, context) => {
			console.log('Success', data)
		}
	})

	const {
		data: todosData,
		isLoading: isTodosLoading,
		isError: isTodosError
	} = useQuery({
		queryKey: ['readTodos'],
		queryFn: () =>
			axios.get('https://localhost:3001/todos').then((res) => res.data)
	})

	console.log(todosData)

	return (
		<div>
			{isPending ? (
				'Adding Todo'
			) : (
				<>
					{isError ? (
						<div>An error occurred: {error.message}</div>
					) : null}
					{isSuccess ? <div>Todo Added</div> : null}

					<button
						onClick={() => mutate({ id: 556, title: 'Do Laundry' })}
					>
						Create Todo
					</button>
				</>
			)}
			<div>
				{todosData?.map((todo: Todo) => (
					<p key={todo.id}>{todo.title}</p>
				))}
			</div>
		</div>
	)
}

export default TodosPage
