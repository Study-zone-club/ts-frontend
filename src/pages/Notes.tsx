import { useState, useEffect } from 'react';
import {
    TextInput,
    rem,
    Title,
    Table,
    Text,
    Divider,
    Modal,
    Group,
    ActionIcon,
    Button,
} from '@mantine/core';
import { IconSearch, IconTrashX, IconEye, IconDownload } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

type Props = {}

function Notes({ }: Props) {
    const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

    const [opened, { open, close }] = useDisclosure(false);
    const elements = [
        { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
        { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
        { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
        { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
        { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    ];
    const rows = elements.map((element) => (
        <tr key={element.name}>
          <td>{element.position}</td>
          <td>{element.name}</td>
          <td>{element.symbol}</td>
          <td>{element.mass}</td>
        </tr>
      ));
    return (
        <>
            <Modal opened={opened} onClose={close} title="Authentication">
                {/* Modal content */}
            </Modal>
            <Title order={3}>Mis notas</Title>

            <Group position="apart">

                <TextInput
                    placeholder="Buscar...."
                    rightSection={icon}
                    mt="md"
                    w={510}
                />

            </Group>
            <Table mt={15} striped highlightOnHover withBorder withColumnBorders>
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
        </>
    )
}

export default Notes