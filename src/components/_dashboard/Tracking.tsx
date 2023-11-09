import { Button, ScrollArea, Card, Grid, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

type Props = {}

function Tracking({ }: Props) {
    return (
        <>
            <Card mt={-25} withBorder radius="lg" padding="lg"  shadow="xl">

                <Title order={3} fw={700} mb={10} italic>
                    Tracking de notas
                </Title>


                <ScrollArea h="48vh">
                    <Card
                        h={70}
                        withBorder
                        mb={10}
                        radius='md'
                        
                    >
                        <Grid mt={-15}>
                            <Grid.Col span={4}>
                                <img src='/nota-adhesiva.png' width={50} height={50} />
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <Grid mt={5}>
                                    <Grid.Col span={6}>
                                        <Title  mt={-7} ta="center" order={2} fw={700} mb={5}>
                                            Matematicas
                                        </Title>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Title  mt={-7} color='green' ta="end" order={2} fw={700} mb={5} >
                                            20
                                        </Title>
                                    </Grid.Col>
                                </Grid>
                            </Grid.Col>
                        </Grid>
                    </Card>

                    <Card
                        h={70}
                        withBorder
                        mb={10}
                        radius='md'
                        
                    >
                        <Grid mt={-15}>
                            <Grid.Col span={4}>
                                <img src='/nota-adhesiva.png' width={50} height={50} />
                            </Grid.Col>
                            <Grid.Col span={8}>
                                <Grid mt={5}>
                                    <Grid.Col span={6}>
                                        <Title ta="center" mt={-7} order={2} fw={700} mb={5}>
                                            Quimica
                                        </Title>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Title color='red'  mt={-7} ta="end" order={2} fw={700} mb={5} >
                                            10
                                        </Title>
                                    </Grid.Col>
                                </Grid>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </ScrollArea>
                <Link to="/material"
                style={{textDecoration:"none"}}>

                <Button radius="md" size="md" fullWidth color="teal">
                    Ver mas
                </Button>
                </Link>
            </Card>
        </>
    )
}

export default Tracking