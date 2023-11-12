import {
    Button,
    Modal,
    TextInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import axios from 'axios';

type Props = {}

function NewMateria({ }: Props) {
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            title: '',
        },
        validate: {
            title: (value) => {
                if (!value) {
                    return 'Campo materia no puede estar vacío';
                }
            },
        },
    });

    return (
        <>
            <Modal radius="lg" opened={opened} onClose={() => {
                close();
                window.location.reload();
            }} withCloseButton={false} centered>
                <form onSubmit={form.onSubmit(async (values) => {
                    try {
                        const token = localStorage.getItem("token");
                        const response = await axios.post('https://studyzone.examplegym.online/subjects', { subject: values }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });

                        console.log('Respuesta del servidor:', response.data);

                        close();
                        window.location.reload();

                    } catch (error) {
                        console.error('Error al enviar los datos:', error);
                    }
                })}>
                    <TextInput
                        radius="md"
                        size="lg"

                        placeholder="Nombre de la materia"
                        label="Nombre de la materia"
                        {...form.getInputProps('title')}
                    />

                    <Button mt={15} color="teal" radius="md" size="md" fullWidth type="submit">
                        Agregar
                    </Button>
                </form>
            </Modal>

            <Button color="teal" radius="md" size="md" rightIcon={<IconPlus />} onClick={open}  >

                Crear nueva materia
            </Button>
        </>
    )
}

export default NewMateria