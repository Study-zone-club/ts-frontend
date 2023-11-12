import { useEffect, useState } from 'react';
import {
    Button,
    Modal,
    TextInput,
    Select
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import axios from 'axios';

type Props = {}
interface Subject {
    id: number;
    title: string;
}

function Newmaterian({ }: Props) {
    const form = useForm({
        initialValues: {
            Actividad: '',
            nota: '', // Deja el campo de nota como una cadena de texto inicialmente
            Materia: '',
        },
        validate: {
            Actividad: (value) => {
                if (!value) {
                    return 'El nombre de la actividad es requerido';
                }
            },
            nota: (value) => {
                const notaAsNumber = parseInt(value, 10); // Convierte el valor a número
                if (!value) {
                    return 'Campo nota no puede estar vacío';
                } else if (isNaN(notaAsNumber)) {
                    return 'La nota debe ser un número';
                } else if (notaAsNumber < 1 || notaAsNumber > 20) {
                    return 'La nota debe estar entre 1 y 20';
                }
            },
            Materia: (value) => {
                if (!value) {
                    return 'Selecciona una Materia';
                } else {
                    return null;
                }
            },
        },
    });
    const [opened, { open, close }] = useDisclosure(false);
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

                setSubjects(response.data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchData();
    }, [token]);
    const selectOptions = subjects.map((subject) => ({
        value: String(subject.id),
        label: subject.title,
    }));
    return (
        <>
            <Modal radius="lg" size="35%" opened={opened} onClose={close} withCloseButton={false} centered>

                <form onSubmit={form.onSubmit((values) => console.log(values))}>

                    <Select
                        placeholder="Selecciona una materia"
                        maxDropdownHeight={150}
                        label="Materia"
                        data={selectOptions}
                        radius="md"
                        size="lg"
                        {...form.getInputProps('Clase')}
                    />

                    <TextInput
                        mt={15}
                        placeholder="Nombre de la Actividad"
                        radius="md"
                        size="lg"
                        label="Nombre de la Actividad"
                        {...form.getInputProps('Actividad')}
                    />

                    <TextInput
                        mt={15}
                        placeholder="Nota"
                        radius="md"
                        size="lg"

                        type='number'
                        label="Nota"
                        {...form.getInputProps('nota')}
                    />
                    <Button mt={15} color="teal" radius="md" size="md" fullWidth type="submit">
                        Agregar
                    </Button>

                </form>

            </Modal>

            <Button color="teal" radius="md" size="md" rightIcon={<IconPlus />} onClick={open}  >
                Crear nueva nota
            </Button>
        </>
    )
}

export default Newmaterian