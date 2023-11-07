import {
    Button,
    Modal,
    TextInput
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

type Props = {}

function NewMateria({ }: Props) {
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            materia: '',
        },
        validate: {
            materia: (value) => {
                if (!value) {
                    return 'Campo materia no puede estar vacío';
                }
            },
        },
    });

    return (
        <>
            <Modal radius="lg" opened={opened} onClose={close} withCloseButton={false} centered>
                <form onSubmit={form.onSubmit((values) => console.log(values))}>
                    <TextInput
                        radius="md"
                        size="lg"

                        placeholder="Nombre de la materia"
                        label="Nombre de la materia"
                        {...form.getInputProps('materia')}
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