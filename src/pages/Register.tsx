import { Card, Title, TextInput, PasswordInput, Button, Group, Text } from '@mantine/core'
import { useForm } from '@mantine/form';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register() {
  const [error, setError] = useState<string | null>(null)
  
  const history = useHistory()

  const form = useForm({
    initialValues: {
      name: '',
      lastname: '',
      email: '',
      password: '',
      password_confirmation: ''
    },

    validate: {
      name: (value) => (value.length >= 3 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value) ? null : 'Nombre inválido'),
      lastname: (value) => (value.length >= 3 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value) ? null : 'Apellido inválido'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
      password: (value) => (value.length >= 8 ? null : 'Contraseña inválida'),
      password_confirmation: (value, values) => (value == values.password ? null : 'Las contraseñas no coinciden')
    },
  });

  const createUser = () => {
    axios.post("https://studyzone.examplegym.com/users", form.values)
      .then(() => {
        history.push('/login')
      })
      .catch(error => {
        setError(error.errors[0])
      })
  }

  return (
    <Group position='center'>
      <Card
        mt="10%"
        radius="lg"
        shadow="xl"
        withBorder
        padding='xl'
        style={{
          minWidth: 500,
          maxWidth: 800
        }}
      >
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, color: '#038f6c', fontWeight: 7800, fontSize: '45px' })}
        >
          STUDY-ZONE 
        </Title>
        <Text mt={10} ta="center" color="red">
          {error}
        </Text>

        <form onSubmit={form.onSubmit(() => createUser())} >
          <Group >
            <TextInput
              w='47%'
              label="Nombre"
              placeholder="Nombre"
              withAsterisk
              mt="md"
              radius="lg"
              size="lg"
              {...form.getInputProps('name')}
            />
            <TextInput
              w='48%'
              label="Apellido"
              placeholder="Apellido"
              withAsterisk
              mt="md"
              radius="lg"
              size="lg"
              {...form.getInputProps('lastname')}
            />
          </Group>
          <TextInput
            label="Email"
            placeholder="estudiante@studyzone.com"
            withAsterisk
            mt="md"
            radius="lg"
            size="lg"
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="********"
            withAsterisk
            mt="md"
            radius="lg"
            size="lg"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirmar contraseña"
            placeholder="********"
            withAsterisk
            mt="md"
            radius="lg"
            size="lg"
            {...form.getInputProps('password_confirmation')}
          />
          <Button type='submit' fullWidth mt="xl" radius="xl" style={{ backgroundColor: '#0db893' }}>
            Regístrate
          </Button>
        </form>
      </Card>
    </Group>
  )
}

export default Register