import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    IconPlus,
    IconClockHour9,
    IconList,
    IconNews,
    IconDeviceFloppy,
    IconDownload
} from '@tabler/icons-react';


import {
    TextInput,
    Text,
    Textarea,
    Select,
    Divider,
    Group,
    ActionIcon,
    Button,
    Modal
} from '@mantine/core';
import { useForm } from '@mantine/form';

type Props = {}

function Addnotes({ }: Props) {
    const [opened, { open, close }] = useDisclosure(false);
    const [creationDate, setCreationDate] = useState("");
    const form = useForm({
        initialValues: {
            Nombre: '',
            Clase: '',
            Tipo: '',
            content: '',
        },
        validate: {
            Nombre: (value) => {
                if (!value) {
                    return 'Este campo no puede estar vacío';
                } else {
                    return null;
                }
            },
            Clase: (value) => {
                if (!value) {
                    return 'Selecciona una materia';
                } else {
                    return null;
                }
            },
            Tipo: (value) => {
                if (!value) {
                    return 'Selecciona un Tipo';
                } else {
                    return null;
                }
            },
            content: (value) => {
                if (!value) {
                    return 'Este campo no puede estar vacío';
                } else {
                    return null;
                }
            },
        },
    });

    const getCurrentDateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} ${formattedTime}`;
    };

    const handleOpenModal = () => {
        setCreationDate(getCurrentDateTime());
        open();
    };


    return (
        <>
            <>
                <Modal radius="lg" size="45%" centered opened={opened} onClose={close} withCloseButton={false}>

                    <form onSubmit={form.onSubmit((values) => console.log(values))}>


                            <TextInput
                                placeholder="Nombre de la nota"
                                w="100%"
                                mb={10}
                                {...form.getInputProps('Nombre')}
                            />

                        <Group position='apart'>
                            <Group>
                                <ActionIcon color="yellow" size="xl" radius="xl" variant="light">
                                    <IconClockHour9 size="2.125rem" />
                                </ActionIcon>
                                <Text> Creada el : {creationDate}</Text>
                            </Group>
                            <Group >
                                <ActionIcon color="yellow" size="xl" radius="xl" variant="light">
                                    <IconList size="2.125rem" />
                                </ActionIcon>
                                <Group mt={10}>
                                    <Text> Clase: </Text>
                                    <Select
                                        w={210}
                                        placeholder="Selecciona una materia"
                                        data={[
                                            { value: 'Comunicacion de datos 1', label: 'Comunicacion de datos 1' },
                                            { value: 'Comunicacion de datos 2', label: 'Comunicacion de datos 2' },
                                            { value: 'Calculo 1', label: 'Calculo 1' },
                                            { value: 'Calculo 2', label: 'Calculo 2' },
                                            { value: 'Calculo 3', label: 'Calculo 3' },
                                        ]}
                                        {...form.getInputProps('Clase')}
                                    />
                                </Group>
                            </Group>

                            <Group>

                                <ActionIcon color="yellow" size="xl" radius="xl" variant="light">
                                    <IconNews size="2.125rem" />
                                </ActionIcon>

                                <Group mt={10}>

                                    <Text> Tipo: </Text>

                                    <Select
                                        w={210}
                                        placeholder="Selecciona Tipo de nota"
                                        data={[
                                            { value: 'Lectura', label: 'Lectura' },
                                            { value: 'nose', label: 'nose' },
                                        ]}
                                        {...form.getInputProps('Tipo')}
                                    />

                                </Group>

                            </Group>
                        </Group>
                        <Divider size="md" variant="dashed" my="sm" />

                        <Textarea
                            size='xl'
                            radius="md"
                            withAsterisk
                            autosize
                            minRows={2}
                            {...form.getInputProps('content')}
                        />
                        <Group mt={15} position="center">
                            <Button radius="md" size="md" color='green' type="submit" rightIcon={<IconDeviceFloppy />} >Guardar</Button>
                            <Button radius="md" size="md" color='orange' rightIcon={<IconDownload />} >Importa nota</Button>
                        </Group>
                    </form>
                </Modal>
                <Button color="teal" radius="md" size="md" rightIcon={<IconPlus />} onClick={handleOpenModal}>
                    Crear nueva nota
                </Button>
            </>
        </>
    )
}

export default Addnotes