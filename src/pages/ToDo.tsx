import React from 'react'
import { useState, useEffect } from 'react';
import {
    Card,
    Title,
    Group,
    Input,
    ActionIcon,
    Button,
    ScrollArea
} from '@mantine/core';
import { IconPencil, IconPinFilled, IconCheckupList, IconEdit, IconTrash, IconChecks } from '@tabler/icons-react';

type Props = {}

function ToDo({ }: Props) {

    const [currentDate, setCurrentDate] = useState(new Date());
    return (
        <>
            <Card
                shadow="xl"
                radius="xl"
                ml="30%"
                mt={55}
                w="45vw"
                padding="lg"
                withBorder>
                <Group position='center'>
                    <Title fz="1.9vw" order={2} italic>To do list</Title>
                </Group>

                <Group position='center'>
                    <Title fz="21w" c="grey" order={2}>Que debería hacer?</Title>
                </Group>

                <Group position='center'>
                    <Title fz="1vw" order={2}>Hoy {currentDate.toLocaleDateString()}</Title>
                </Group>

                <Group mt={15}>
                    <Input
                        icon={<IconPencil />}
                        w="100%"
                        radius="xl"
                        placeholder="Añade tu tarea"
                    />

                </Group>
            </Card>

            <ScrollArea h={610}>
            <Card ml="30%" w="45vw" mt={15}  shadow="xl" padding="sm" radius="lg" withBorder>
                <Group position='apart'>
                    <ActionIcon ml={2} >

                        <IconPinFilled />

                    </ActionIcon>

                    <Title fz="1.4vw" order={2}  >
                        s
                    </Title>
                    <Group>
                        <ActionIcon >
                            <IconCheckupList size="1.6rem" />
                        </ActionIcon>
                        <ActionIcon >
                            <IconEdit size="1.6rem" />
                        </ActionIcon>
                        <ActionIcon >
                            <IconTrash size="1.6rem" />
                        </ActionIcon>
                    </Group>
                </Group>
            </Card>

            <Card ml="30%" w="45vw" mt={15}  shadow="xl" padding="sm" radius="lg" withBorder>
                <Group position='apart'>
                    <ActionIcon ml={2} >

                        <IconPinFilled />

                    </ActionIcon>

                    <Title fz="1.4vw" order={2}  >
                        s
                    </Title>
                    <Group>
                        <ActionIcon >
                            <IconCheckupList size="1.6rem" />
                        </ActionIcon>
                        <ActionIcon >
                            <IconEdit size="1.6rem" />
                        </ActionIcon>
                        <ActionIcon >
                            <IconTrash size="1.6rem" />
                        </ActionIcon>
                    </Group>
                </Group>
            </Card>
            </ScrollArea>


        </>
    )
}

export default ToDo