import {
    TextInput,
    rem,
    Title,
    Group,
    Accordion,
    Divider,
    Text,
    ActionIcon,
    Card
} from '@mantine/core';
import { IconSearch, IconTrashX } from '@tabler/icons-react';
import NewMateria from '../components/NewMateria';
import Newmaterian from '../components/Newmaterian';

type Props = {}

function Material({ }: Props) {
    const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

    return (
        <>
            <Title mt={15} order={3}>Tracking de notas</Title>
            <Card mt={15} withBorder padding="lg" radius="lg" shadow="xl">
                <Group position="apart">
                    <TextInput
                        placeholder="Buscar...."
                        rightSection={icon}
                        mt={-5}
                        w={510}
                        radius="lg"
                        size="lg"

                    />
                    <Group>
                        <NewMateria />
                        <Newmaterian/>
                    </Group>
                </Group>

            </Card>
            <Accordion mt={15}>
              
            <Accordion.Item value="customization">
                        <Accordion.Control>
                            <Group position="apart">

                                <Title mt={15} order={3}>
                           si
                                </Title>


                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                           
                                <>
                                    <Group  position="apart">
                                        <Text fw={700}>si</Text>
                                        <Group>

                                            <Text fw={700} >
                                              45
                                            </Text>
                                            <ActionIcon
                                                mt={5}
                                                color="red"
                                                variant="filled"
                                            >
                                                <IconTrashX size="1.125rem" />
                                            </ActionIcon>
                                        </Group>
                                    </Group>
                                    <Divider size="md" variant="dashed" my="sm" />
                                </>
                        
                            <Group position="center">
                                <Title order={3} c="black">
                                    Promedio:{" "}
                                    <Title >
                                        si
                                    </Title>
                                </Title>
                            </Group>
                        </Accordion.Panel>
                    </Accordion.Item>
                
            </Accordion>

        </>
    )
}

export default Material