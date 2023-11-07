import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    TextInput,
    Select
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

type Props = {}

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

    return (
        <>
            <Modal  radius="lg" size="35%" opened={opened} onClose={close} withCloseButton={false} centered>

                <form onSubmit={form.onSubmit((values) => console.log(values))}>

                    <Select
                        mt={15}
                        label="Elige la materia"
                        radius="md"
                        size="lg"

                        placeholder="Escoge una materia"
                        data={[
                            { value: 'react', label: 'React' },
                            { value: 'ng', label: 'Angular' },
                            { value: 'svelte', label: 'Svelte' },
                            { value: 'vue', label: 'Vue' },
                        ]}
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
                Crear nueva nota
            </Button>
        </>
    )
}

export default Newmaterian