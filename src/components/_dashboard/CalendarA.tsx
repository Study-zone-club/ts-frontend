
import { Group, Button,ScrollArea, Card, Title, Table } from '@mantine/core';
import { Calendar } from '@mantine/dates';
type Props = {}

function CalendarA({ }: Props) {
    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    // Obtenemos la fecha actual
    const today = new Date();

    // Obtenemos el día de la semana actual
    const dayOfWeek = daysOfWeek[today.getDay()];

    // Formateamos la fecha en el formato que deseamos (por ejemplo, "dd/mm/yyyy")
    const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    const elements = [
        { clase: "Biologia", hora: "12:30 pm" },
        { clase: "Matematica", hora: "2:30 pm" },
    ];

    const rows = elements.map((element) => (
        <tr >
            <td width="75%">{element.clase}</td>

            <td>{element.hora}</td>
        </tr>
    ));
    return (
        <>
            {/* 
    <Title order={3} fw={700} italic mb={10}>
    Horario
    </Title>
    <Group position="center">
    <Calendar
    size='lg'
    style={{
        width: "100%", // Ajustar el ancho al 100% de la tarjeta
        height: "100%", // Ajustar la altura al 100% de la tarjeta
    }}
    />
    </Group>
 */}

            <Card mt={-25}  withBorder radius="lg" padding="lg" shadow="xl" style={{ position: "relative" }}>
                <Group position='center'>


                    <Title> Horario de hoy {dayOfWeek}</Title>

                    
                </Group>
                <ScrollArea h="47vh">
                        <Table striped withColumnBorders fontSize="xl">

                            <tbody>{rows}</tbody>
                        </Table>
                    </ScrollArea>
                    <Button radius="md" size="md" fullWidth color="teal">
                    Ver mas
                </Button>
            </Card>
        </>
    )
}

export default CalendarA