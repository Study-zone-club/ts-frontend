import { Card, Image, Text, Badge, Button, Group, Avatar } from '@mantine/core';
import { Link } from 'react-router-dom';

type Props = {}

function Navbar({ }: Props) {
    return (
        <>
            <Card mb={-85} w="100%" withBorder>

                <Group position='apart'>


                    <Avatar
                        mt={-8}
                        color='light'
                        size={45}
                        radius='md'

                        src='/logo.png'
                    >

                    </Avatar>

                    <Group ml={252}>
                        
                    <Link to="/landing">
                        <Button size="md" variant="subtle" color="teal" radius="xs" uppercase>
                            Inicio
                        </Button>
                        </Link>
                        <Button size="md" variant="subtle" color="teal" radius="xs" uppercase>
                            Contáctanos
                        </Button>
                        <Button size="md" variant="subtle" color="teal" radius="xs" uppercase>
                            Nosotros
                        </Button>
                    </Group>

                    <Group >

                        <Link to="/Regis">
                            <Button size="md" variant="outline" color="teal" radius="xl">
                                Registrarse
                            </Button>
                        </Link>
                        
                        <Link to="/Login">
                        <Button size="md" color="teal" radius="xl">
                            Iniciar sesion
                        </Button>
                        </Link>

                    </Group>

                </Group>
            </Card>
        </>
    )
}

export default Navbar