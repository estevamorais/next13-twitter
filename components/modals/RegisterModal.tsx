import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { signIn } from 'next-auth/react'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'

import Modal from '../Modal'
import Input from '../Input'

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) {
      return
    }

    registerModal.onClose()
    loginModal.onOpen()
  }, [isLoading, registerModal, loginModal])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.post('/api/register', {
        email,
        password,
        username,
        name,
      })

      toast.success('Account created.')

      signIn('credentials', {
        email,
        password,
      })

      registerModal.onClose()
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }, [registerModal, email, password, username, name])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        value={email}
        placeholder="Email"
        disabled={isLoading}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        value={name}
        placeholder="Name"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        value={username}
        placeholder="Username"
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        value={password}
        type="password"
        placeholder="Password"
        disabled={isLoading}
        onChange={(e) => setpassword(e.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>
        Already have an account?{' '}
        <span
          onClick={onToggle}
          className="
            text-white
            cursor-pointer
            hover:underline
          "
        >
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default RegisterModal
