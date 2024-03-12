'use client'

import { useQuery } from '@tanstack/react-query'

export default function Home() {
	const { data, isLoading, isError, isSuccess } = useQuery<any>({
		queryKey: ['todos'],
		queryFn: () =>
			fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
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

	return <main className='min-h-screen bg-orange-200'></main>
}
