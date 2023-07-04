import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { Greeting } from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
  users: UserType[]
  addUserCallback: (name: string) => void
}

export const pureAddUser = (
  name: string,
  setError: (e: string) => void,
  setName: (name: string) => void,
  addUserCallback: (name: string) => void
) => {
  // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
  if (name.trim()) {
    addUserCallback(name)
    setName('')
    setError('')
  } else {
    setError('Ошибка! Введите имя!')
  }
}

export const pureOnBlur = (name: string, setError: (e: string) => void) => {
  name.trim() ? setError('') : setError('Ошибка! Введите имя!')
}

export const pureOnEnter = (
  e: KeyboardEvent<HTMLInputElement>,
  addUser: () => void
) => {
  if (e.key === 'Enter') {
    addUser()
  }
}

const GreetingContainer: FC<GreetingContainerPropsType> = ({
  users,
  addUserCallback,
}) => {
  const [name, setName] = useState<string>('') // need to fix any
  const [error, setError] = useState<string>('') // need to fix any

  const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.trim()
    setName(e.currentTarget.value)

    if (value) error && setError('')
  }
  const addUser = () => {
    pureAddUser(name, setError, setName, addUserCallback)
  }

  const onBlur = () => {
    pureOnBlur(name, setError)
  }

  const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    pureOnEnter(e, addUser)
  }

  const totalUsers = users.length
  const lastUserName = users.length ? users[totalUsers - 1].name : ''

  return (
    <Greeting
      name={name}
      setNameCallback={setNameCallback}
      addUser={addUser}
      onBlur={onBlur}
      onEnter={onEnter}
      error={error}
      totalUsers={totalUsers}
      lastUserName={lastUserName}
    />
  )
}

export default GreetingContainer
