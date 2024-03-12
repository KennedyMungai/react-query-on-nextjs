'use client'

import { useQuery } from '@tanstack/react-query'

interface Todo {
	id: number
	title: string
	// completed: boolean
}

interface User {
	id: number
	name: string
	username: string
	email: string
	address: Address
	phone: string
	website: string
	company: Company
}

interface Company {
	name: string
	catchPhrase: string
	bs: string
}

interface Address {
	street: string
	suite: string
	city: string
	zipcode: string
	geo: Geo
}

interface Geo {
	lat: string
	lng: string
}

export default function Home() {
	const { data, isLoading, isError, isSuccess } = useQuery<Todo[]>({
		queryKey: ['todos'],
		queryFn: () =>
			fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
				res.json()
			),
		select: (todos) =>
			todos.map((todo) => ({ id: todo.id, title: todo.title }))
	})

	const {
		data: usersData,
		isLoading: isUsersLoading,
		isError: isUsersError,
		isSuccess: isUsersSuccess
	} = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () =>
			fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
				res.json()
			)
	})

	if (isLoading) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-orange-200'>
				<p className='text-red-500 font-bold text-6xl animate-pulse'>
					Loading...
				</p>
			</div>
		)
	}

	return (
		<main className='min-h-screen bg-orange-200 flex flex-col items-center'>
			<h1 className='text-xl'>Todos</h1>
			<div className=''>
				{data?.slice(0, 5)?.map((todo: Todo) => (
					<p key={todo.id} className='text-neutral-700'>
						{todo.title}
					</p>
				))}
			</div>

			<h1 className='text-xl mt-9'>Users</h1>
			<div className=''>
				{usersData?.map((user: User) => (
					<p key={user.id} className='text-neutral-700'>
						{user.name}
					</p>
				))}
			</div>
		</main>
	)
}
