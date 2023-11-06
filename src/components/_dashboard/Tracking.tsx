import { Group,Button, ScrollArea, Card, Grid, Title } from '@mantine/core';
type Props = {}

function Tracking({ }: Props) {
    return (
        <>
            <Card withBorder radius="lg">

                <Title order={3} fw={700} mb={10} italic>
                    Tracking de notas
                </Title>


                <ScrollArea h={610}>
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
                                        <Title ta="center" order={5} fw={700} mb={5}>
                                            hola
                                        </Title>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Title ta="end" order={5} fw={700} mb={5} >
                                            s
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
                                        <Title ta="center" order={5} fw={700} mb={5}>
                                            hola
                                        </Title>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Title ta="end" order={5} fw={700} mb={5} >
                                            s
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
                                        <Title ta="center" order={5} fw={700} mb={5}>
                                            hola
                                        </Title>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Title ta="end" order={5} fw={700} mb={5} >
                                            s
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
                                        <Title ta="center" order={5} fw={700} mb={5}>
                                            hola
                                        </Title>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Title ta="end" order={5} fw={700} mb={5} >
                                            s
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
                                        <Title ta="center" order={5} fw={700} mb={5}>
                                            hola
                                        </Title>
                                    </Grid.Col>
                                    <Grid.Col span={6}>
                                        <Title ta="end" order={5} fw={700} mb={5} >
                                            s
                                        </Title>
                                    </Grid.Col>
                                </Grid>
                            </Grid.Col>
                        </Grid>
                </Card>
            
                    </ScrollArea>
                    <Button fullWidth color="teal">
      Ver mas
    </Button>

            </Card>
        </>
    )
}

export default Tracking