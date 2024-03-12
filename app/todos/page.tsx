'use client'

import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { Todo } from '../page'

type Props = {}

const TodosPage = (props: Props) => {
	const { isError, isPending, isSuccess, error, mutate }: any = useMutation({
		mutationFn: (newTodo: Todo) => {
			return axios.post('https://localhost:3001/todos', newTodo)
		}
	})

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
						onClick={() =>
							mutate({ id: new Date(), title: 'Do Laundry' })
						}
					>
						Create Todo
					</button>
				</>
			)}
		</div>
	)
}

export default TodosPage
