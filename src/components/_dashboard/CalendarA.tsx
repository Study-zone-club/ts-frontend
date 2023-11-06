
import { Group, Card, Title } from '@mantine/core';
import { Calendar } from '@mantine/dates';
type Props = {}

function CalendarA({ }: Props) {
    return (
        <>

            <Card h={720} withBorder radius="lg">
                <Title order={3} fw={700} italic mb={10}>
                    Horario
                </Title>
                <Group 
                position="center"
                mt={105}
                >
                    <Calendar size='lg' />
                </Group>
            </Card>
        </>
    )
}

export default CalendarA