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
            nota: '',
            Materia: '',
        },
        validate: {
            Actividad: (value) => {
                if (!value) {
                    return 'El nombre de la actividad es requerido';
                }
            },
            nota: (value) => {
                const notaAsNumber = parseFloat(value); // Utilizamos parseFloat para permitir decimales
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

    const handleSubmit = async (values: Record<string, string | number>) => {
        try {
            const payload = {
                activity: {
                    title: values.Actividad as string,
                    calification: parseFloat(values.nota as string),
                    subject_id: parseInt(values.Materia as string, 10),
                },
            };

            await axios.post('https://studyzone.examplegym.online/activities', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            close();
            window.location.reload();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <>
            <Modal radius="lg" size="35%" opened={opened} onClose={close} withCloseButton={false} centered>

                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Select
                        placeholder="Selecciona una materia"
                        maxDropdownHeight={150}
                        label="Materia"
                        data={selectOptions}
                        radius="md"
                        size="lg"
                        {...form.getInputProps('Materia')}
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
                Crear nueva actividad
            </Button>
        </>
    )
}

export default Newmaterian