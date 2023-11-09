import { Card, Title, TextInput, PasswordInput, Button, Group } from '@mantine/core'
import { useForm } from '@mantine/form';

type Props = {}

function Regis({}: Props) {
    const form = useForm({
        initialValues: {
          name: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
    
        validate: {
          name: (value) => (value.length >= 3 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value) ? null : 'Nombre inválido'),
          lastname: (value) => (value.length >= 3  && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(value) ? null : 'Apellido inválido'),
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
          password: (value) => (value.length >= 8 ? null: 'Contraseña inválida'),
          confirmPassword: (value, values) => (value == values.password ? null: 'Las contraseñas no coinciden')
        },
      });
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

        <form onSubmit={form.onSubmit((values) => console.log(values))} >
            <Group >
              <TextInput 
                w='47%'
                label="Nombre"  
                placeholder="Nombre" 
                {...form.getInputProps('name')}
                withAsterisk
                mt="md"
                radius="lg"
                size="lg"
              />
              <TextInput 
                w='48%'
                label="Apellido"
                placeholder="Apellido" 
                {...form.getInputProps('lastname')}
                withAsterisk
                mt="md"
                radius="lg"
                size="lg"
              />
            </Group>
            <TextInput 
              label="Email" 
              placeholder="holamequieromorir@urbe.com" 
              {...form.getInputProps('email')}
              withAsterisk
              mt="md"
              radius="lg"
              size="lg"
            />
            <PasswordInput
              label="Contraseña" 
              placeholder="********" 
              {...form.getInputProps('password')}
              withAsterisk
              mt="md"
              radius="lg"
              size="lg"
            />
            <PasswordInput 
              label="Confirmar contraseña" 
              placeholder="********" 
              {...form.getInputProps('confirmPassword')}
              withAsterisk
              mt="md"
              radius="lg"
              size="lg"
            />
            <Button type='submit' fullWidth mt="xl" radius="xl" style={{ backgroundColor: '#0db893' }}>
              Regístrate
            </Button>
          </form>

    </Card>


</Group>
  )
}

export default Regis