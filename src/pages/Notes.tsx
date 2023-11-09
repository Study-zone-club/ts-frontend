import { useState, useEffect } from 'react';
import {
    TextInput,
    rem,
    Title,
    Table,
    Text,
    Divider,
    Modal,
    Card,
    Group,
    ActionIcon,
    Button,
    ScrollArea
} from '@mantine/core';
import { IconSearch, IconTrashX, IconEye,  } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Addnotes from '../components/Addnotes';
type Props = {}

function Notes({ }: Props) {
    const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

    const [opened, { open, close }] = useDisclosure(false);
    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    ];
    const rows = elements.map((element) => (
        <tr key={element.name}>
            <td>{element.position}</td>
            <td>{element.name}</td>
            <td>{element.symbol}</td>
            <td>{element.mass}</td>
            <td>

                <Group position="center">

                    <ActionIcon mt={5} color="green" variant="filled">
                        <IconEye

                            size="1.125rem"
                        />
                    </ActionIcon>


                    <ActionIcon
                        mt={5}
                        color="red"
                        variant="filled"
                    >
                        <IconTrashX size="1.125rem" />

                    </ActionIcon>

                </Group>

            </td>
        </tr>
    ));
    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication">
                {/* Modal content */}
            </Modal>
            <Title order={3}>Mis notas</Title>
            <Card mt={15} withBorder padding="lg" radius="lg" shadow="xl">

                <Group position="apart">

                    <TextInput
                        placeholder="Buscar...."
                        rightSection={icon}
                        mt="md"
                        w={510}
                        radius="lg"
                        size="lg"

                    />
                    <Addnotes />
                </Group>
            </Card>

            <Card mt={15} withBorder radius="lg" shadow="xl">
                <ScrollArea h="65vh">

                    <Table  fontSize="lg" mt={15} striped highlightOnHover withBorder withColumnBorders>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Clase</th>
                                <th>Tipo</th>
                                <th>Creada</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>

                    </Table>
                </ScrollArea>
            </Card>

        </>
    )
}

export default Notes