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
type Props = {}

function Newhorario({ }: Props) {
    const [opened, { open, close }] = useDisclosure(false);
    const form = useForm({
        initialValues: {
            Nombre: '',
            Clase: '',
            Tipo: '',
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
            }
        },
    });



    return (
        <>
            <Modal radius="lg" size="50%" centered opened={opened} onClose={close} withCloseButton={false}>

                <form onSubmit={form.onSubmit((values) => console.log(values))}>


                    <Select
                        w='100%'
                        placeholder="Selecciona una materia"
                        maxDropdownHeight={150}

                        data={[
                            { value: 'Comunicacion de datos 1', label: 'Comunicacion de datos 1' },
                            { value: 'Comunicacion de datos 2', label: 'Comunicacion de datos 2' },
                            { value: 'Calculo 1', label: 'Calculo 1' },
                            { value: 'Calculo 2', label: 'Calculo 2' },
                            { value: 'Calculo 3', label: 'Calculo 3' },
                        ]}
                        {...form.getInputProps('Clase')}
                    />

                    <Group mt={25} position='apart'>

                        <Group >
                            <ActionIcon color="teal" size="xl" radius="xl" variant="light">
                                <IconList size="2.125rem" />
                            </ActionIcon>
                            <Group ml={-12} mt={10}>
                                <Text> hora: </Text>
                                <TextInput
                                    placeholder="Nombre de la nota"
                                    w={210}

                                    {...form.getInputProps('Nombre')}
                                />
                            </Group>
                        </Group>

                        <Group>

                            <ActionIcon color="teal" size="xl" radius="xl" variant="light">
                                <IconNews size="2.125rem" />
                            </ActionIcon>

                            <Group mt={10}>

                                <Text> Dia: </Text>

                                <Select
                                    w={210}
                                    placeholder="Selecciona Tipo de nota"

                                    maxDropdownHeight={150}
                                    data={[
                                        { value: 'Lectura', label: 'Lunes' },
                                        { value: 'nose', label: 'nose' },
                                    ]}
                                    {...form.getInputProps('Tipo')}
                                />

                            </Group>

                        </Group>
                    </Group>

                    <Group mt={25} position="center">
                        <Button fullWidth radius="md" size="md" color="teal" type="submit" rightIcon={<IconDeviceFloppy />} >Guardar</Button>
                        {/* <Button radius="md" size="md" color='orange' rightIcon={<IconDownload />} >Importa nota</Button> */}
                    </Group>
                </form>
            </Modal>
            <Button fullWidth color="teal" radius="md" size="md" rightIcon={<IconPlus />} onClick={open}  >

                Agregar clase
            </Button>
        </>
    )
}

export default Newhorario