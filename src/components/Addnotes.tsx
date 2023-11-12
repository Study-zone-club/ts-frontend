import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import {
    IconPlus,
    IconClockHour9,
    IconList,
    IconNews,
    IconDeviceFloppy,
} from '@tabler/icons-react';
import axios from 'axios';
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

interface Subject {
    title: string;
}

interface NoteData {
    id: number;
    title: string;
    content: string;
    note_type: string;
    updated_at: string;
    created_at: string;
    subject: {
        id: number;
        title: string;
        area: string;
        professor: string;
        lapse: number;
        power: any[];
    };
    user: {
        id: number;
        name: string;
        lastname: string;
        email: string;
    };
}

interface NoteFormData {
    Nombre: string;
    Clase: string;
    Tipo: string;
    content: string;
}

const Addnotes = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [creationDate, setCreationDate] = useState("");
    const [subjects, setSubjects] = useState<Subject[]>([]);
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

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://studyzone.examplegym.online/subjects', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchData();
    }, [token]);

    const handleSubmit = async (values: NoteFormData) => {
        const noteData: NoteData = {
            title: values.Nombre,
            content: values.content,
            note_type: values.Tipo,
            subject_id: 1
        };

        try {
            const response = await axios.post('https://studyzone.examplegym.online/notes', { notes: noteData }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Respuesta del servidor:', response.data);
            close();
        } catch (error) {
            console.error('Error al enviar la nota:', error);
        }
    };

    return (
        <>
            <>
                <Modal radius="lg" size="70%" centered opened={opened} onClose={close} withCloseButton={false}>

                <form onSubmit={() => handleSubmit(form.values)}>


                        <TextInput
                            placeholder="Nombre de la nota"
                            w="100%"
                            mb={10}
                            {...form.getInputProps('Nombre')}
                        />

                        <Group position='apart'>
                            <Group>
                                <ActionIcon color="teal" size="xl" radius="xl" variant="light">
                                    <IconClockHour9 size="2.125rem" />
                                </ActionIcon>
                                <Text> Creada el : {creationDate}</Text>
                            </Group>
                            <Group >
                                <ActionIcon color="teal" size="xl" radius="xl" variant="light">
                                    <IconList size="2.125rem" />
                                </ActionIcon>
                                <Group ml={-12} mt={10}>
                                    <Text> Clase: </Text>
                                    <Select
                                        w={230}
                                        placeholder="Selecciona una materia"
                                        maxDropdownHeight={150}
                                        data={subjects.map(subject => ({ value: subject.title, label: subject.title }))}
                                        {...form.getInputProps('Clase')}
                                    />
                                </Group>
                            </Group>

                            <Group>

                                <ActionIcon color="teal" size="xl" radius="xl" variant="light">
                                    <IconNews size="2.125rem" />
                                </ActionIcon>

                                <Group mt={10}>

                                    <Text> Tipo: </Text>

                                    <Select
                                        w={210}
                                        placeholder="Selecciona Tipo de nota"

                                        maxDropdownHeight={150}
                                        data={[
                                            { value: 'Lectura', label: 'Lectura' },
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
                            <Button fullWidth radius="md" size="md" color="teal" type="submit" rightIcon={<IconDeviceFloppy />} >Guardar</Button>
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