import React from 'react'
import { Group, Button } from '@mantine/core';

type Props = {}

function Horario({ }: Props) {
    return (
        <>
            <Group position="apart">
                <Group position="apart">
                    <Button variant="outline">1</Button>

                </Group>

                <Button variant="outline">2</Button>
                
                <Button variant="outline">3</Button>
            </Group>

        </>
    )
}

export default Horario