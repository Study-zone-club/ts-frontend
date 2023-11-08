import { Card, Title, TextInput, PasswordInput, Button, Group } from '@mantine/core'

type Props = {}

function Login({ }: Props) {
    return (
        <>
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

                    <TextInput
                        label='Correo'
                        mt={45}
                        placeholder='micorreo@gmail.com'
                        required
                        withAsterisk={false}
                        radius="lg"
                        size="lg"

                    />
                    <PasswordInput
                        mt={15}
                        label='Contraseña'
                        placeholder='********'
                        required
                        withAsterisk={false}
                        radius="lg"
                        size="lg"

                    />
                    <Button
                        color="teal"
                        radius="md"
                        size="md"
                        mt={20}
                        fullWidth

                    >
                        Entrar
                    </Button>

                </Card>


            </Group>
        </>
    )
}

export default Login