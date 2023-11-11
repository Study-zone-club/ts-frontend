import { useState } from 'react';
import { Group, Button, Divider, ScrollArea, Title, Card, Image, Text, Badge } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Newhorario from '../components/Newhorario';
type Props = {}

function Horario({ }: Props) {
    const [value, setValue] = useState<Date | null>(null);

    return (
        <>
            <Title weight={500}>Horario</Title>

            <Group mt={45} position="apart">

                    <Group position="center">
                        <DatePicker value={value} onChange={setValue} />
                    </Group>
                <Card w={350} shadow="sm" padding="lg" radius="md" withBorder>
                    <Group position="center">
                        <Title order={2}>Sabado</Title>
                    </Group>
                    <Divider my="sm" variant="dashed" />
                    <ScrollArea h="300px" type="scroll" w="100%"></ScrollArea>
                    <Newhorario />
                </Card>
            </Group>

        </>
    )
}

export default Horario