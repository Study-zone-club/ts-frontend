import { RefObject, useEffect, useState } from 'react';
import {
    TextInput,
    Text,
    Select,
    Group,
    ActionIcon,
    Button,
    Modal
} from '@mantine/core';
import {
    IconList,
    IconNews,
    IconDeviceFloppy,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { TimeInput } from '@mantine/dates';
import { IconClock } from '@tabler/icons-react';
import { useRef } from 'react';
type Props = {}

interface Subject {
    id: number;
    title: string;
}
interface FormValues {
    dia: string;
    Materia: string;
    inicio: string;
    cierre: string;
}
function Newhorario({ }: Props) {
    const ref: RefObject<HTMLInputElement> = useRef(null);

    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            dia: '',
            Materia: '',
            inicio: '',
            cierre: '',
        },
        validate: {
            dia: (value) => {
                if (!value) {
                    return 'Este campo no puede estar vacío';
                } else {
                    return null;
                }
            },
            Materia: (value) => {
                if (!value) {
                    return 'Selecciona una materia';
                } else {
                    return null;
                }
            },
            inicio: (value) => {
                if (!value) {
                    return 'Selecciona una hora de inicio';
                } else {
                    return null;
                }
            },
            cierre: (value, values) => {
                if (!value) {
                    return 'Selecciona una hora de cierre';
                } else if (values.inicio && values.cierre && values.inicio >= values.cierre) {
                    return 'La hora de cierre debe ser mayor que la hora de inicio';
                } else {
                    return null;
                }
            }
        },
    });
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const token = localStorage.getItem("token");
    const inicioRef: RefObject<HTMLInputElement> = useRef(null);
    const cierreRef: RefObject<HTMLInputElement> = useRef(null);
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
    const handleSubmit = async (values: FormValues) => {
        try {
            const response = await axios.post('https://studyzone.examplegym.online/schedules', {
                schedule: {
                    days_of_week: values.dia,
                    from: values.inicio,
                    to: values.cierre,
                    subject_id: parseInt(values.Materia),
                }
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Schedule saved successfully:', response.data);

            close();
            window.location.reload();
        } catch (error) {
            console.error('Error saving schedule:', error);
        }
    };
    return (
        <>
            <Modal radius="lg" size="60%" centered opened={opened} onClose={close} withCloseButton={false}>

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

                    <Group mt={25} position='apart'>

                        <TimeInput
                            label="Hora de inicio :"
                            ref={inicioRef}
                            rightSection={
                                <ActionIcon color='teal' onClick={() => inicioRef.current?.showPicker()}>
                                    <IconClock size="1rem" stroke={1.5} />
                                </ActionIcon>
                            }
                            radius="md"
                            size="lg"
                            {...form.getInputProps('inicio')}
                        />

                        <TimeInput
                            label="Hora de cierre :"
                            ref={cierreRef}
                            radius="md"
                            size="lg"
                            rightSection={
                                <ActionIcon color='teal' onClick={() => cierreRef.current?.showPicker()}>
                                    <IconClock size="1rem" stroke={1.5} />
                                </ActionIcon>
                            }
                            mx="auto"
                            {...form.getInputProps('cierre')}
                        />

                        <Select
                            radius="md"
                            size="lg"
                            maxDropdownHeight={100}
                            label="Dia"
                            placeholder="Dia"
                            data={[
                                { value: 'Domingo', label: 'Domingo' },
                                { value: 'Lunes', label: 'Lunes' },
                                { value: 'Martes', label: 'Martes' },
                                { value: 'Miercoles', label: 'Miercoles' },
                                { value: 'Jueves', label: 'Jueves' },
                                { value: 'Viernes', label: 'Viernes' },
                                { value: 'Sabado', label: 'Sabado' },
                            ]}
                            {...form.getInputProps('dia')}

                        />

                    </Group>

                    <Group mt={25} position="center">
                        <Button fullWidth radius="md" size="md" color="teal" type="submit" rightIcon={<IconDeviceFloppy />} >Guardar</Button>
                        {/* <Button radius="md" size="md" color='orange' rightIcon={<IconDownload />} >Importa nota</Button> */}
                    </Group>
                </form>
            </Modal>
            <Button fullWidth color="teal" radius="md" size="md" rightIcon={<IconPlus />} onClick={open}  >

                Agregar Evento
            </Button>
        </>
    )
}

export default Newhorario