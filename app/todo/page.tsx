'use client';
import { UserProfile, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { FC } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import styles from '../../styles/Home.module.css';

type Todo = { title: string; done: boolean; id: string };
const useTodo = () => {
  const { data: todos, error } = useSWR<Todo[]>('/api/todo/read', (url) =>
    fetch(url).then((res) => res.json())
  );
  const { mutate } = useSWRConfig();
  if (!todos) {
    return { todos } as const;
  }
  const update = (id: string, newTodo: Todo) => {
    const index = todos.findIndex((x) => x.id === id);
    mutate(
      '/api/todo/read',
      (async () => [
        ...todos.slice(0, index),
        await (
          await fetch('/api/todo/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
          })
        ).json(),
        ...todos.slice(index + 1),
      ])(),
      {
        optimisticData: [
          ...todos.slice(0, index),
          newTodo,
          ...todos.slice(index + 1),
        ],
        rollbackOnError: true,
      }
    );
  };
  const createNewTodo = () => {
    mutate(
      '/api/todo/read',
      (async () => [(await fetch('/api/todo/create')).json(), ...todos])(),
      {
        optimisticData: [{ id: 'temp', title: '', done: false }, ...todos],
        rollbackOnError: true,
      }
    );
  };
  return { todos, error, update, createNewTodo } as const;
};

const TodoPage: FC<{ user: UserProfile }> = () => {
  const { todos, update, createNewTodo } = useTodo();
  return (
    <div className={styles.container}>
      <Link href="/api/auth/logout">Logout</Link>
      <main className={styles.main}>
        <h1 className={styles.title}>Todo sample</h1>

        <p className={styles.description}>
          todo list <button onClick={createNewTodo}>add</button>
        </p>
        <ul>
          {todos?.map(({ id, title, done }) => (
            <li key={id}>
              <input
                type="checkbox"
                checked={done}
                onChange={({ target }) =>
                  update(id, { id, title, done: target.checked })
                }
              />
              <input
                type="text"
                value={title}
                onChange={({ target }) =>
                  update(id, { id, title: target.value, done })
                }
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
export default withPageAuthRequired(TodoPage);
