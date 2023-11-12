import {
    TextInput,
    rem,
    Title,
    Group,
    Accordion,
    Divider,
    Text,
    ActionIcon,
    Card,
    ScrollArea
} from '@mantine/core';
import { IconSearch, IconTrashX } from '@tabler/icons-react';
import NewMateria from '../components/NewMateria';
import Newmaterian from '../components/Newmaterian';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Props = {}
interface Subject {
    title: string;
    // Otras propiedades si las hay
}
function Material({ }: Props) {
    const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://studyzone.examplegym.online/subjects', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Assuming the response data is an array of subjects
                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchData();
    }, [token]);
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
                        <Newmaterian />
                    </Group>
                </Group>

            </Card>

            <Card mt={15} withBorder radius="lg" shadow="xl">

                <ScrollArea h="65vh">
                    <Accordion radius="lg" variant="contained" mt={15}>
                        {subjects.map((subject, index) => (
                            <Accordion.Item key={index} value={subject.title}>
                                <Accordion.Control>
                                    <Group position="apart">
                                        <Title mt={15} order={3}>
                                            {subject.title}
                                        </Title>
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>

                                    <>
                                        <Group position="apart">
                                            <Text fw={700}>Examen</Text>
                                            <Group>

                                                <Text color='orange' fw={700} >
                                                    15
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
                                        <Title order={3} >
                                            Promedio:{" "}
                                            <Title color='orange' >
                                                15
                                            </Title>
                                        </Title>
                                    </Group>
                                </Accordion.Panel>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </ScrollArea>
            </Card>
        </>
    )
}

export default Material