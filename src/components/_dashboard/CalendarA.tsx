import { useEffect, useState } from 'react';
import { Group, Loader ,ScrollArea, ActionIcon, Card, Title, Table } from '@mantine/core';
import {
  IconTrashX
} from '@tabler/icons-react';
import Newhorario from '../Newhorario';
type ScheduleItem = {
  id: number;
  days_of_week: string;
  from: string;
  to: string;
  from_parser: string;
  to_parser: string;
  subject: {
    id: number;
    title: string;
    area: string;
    professor: string;
    lapse: null | any;
    power: any[];
    promedy: number;
  };
};

type Props = {};

function CalendarA({ }: Props) {
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://studyzone.examplegym.online/schedules', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setScheduleData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDeleteSchedule = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://studyzone.examplegym.online/schedules/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setScheduleData((prevData) => prevData.filter((schedule) => schedule.id !== id));
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };
  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const today = new Date();

  const dayOfWeek = daysOfWeek[today.getDay()];

  const filteredScheduleData = scheduleData.filter((schedule) => schedule.days_of_week === dayOfWeek);

  const rows = filteredScheduleData.map((schedule) => (
    <tr key={schedule.id}>
      <td width="55%">{schedule.subject.title}</td>
      <td>{`${schedule.from_parser} - ${schedule.to_parser}`}</td>
      <td>
        <ActionIcon
          mt={5}
          color="red"
          variant="filled"
          onClick={() => handleDeleteSchedule(schedule.id)}
        >
          <IconTrashX size="1.125rem" />
        </ActionIcon>
      </td>
    </tr>
  ));

  return (
    <>
      <Card mt={-25} withBorder radius="lg" padding="lg" shadow="xl" style={{ position: "relative" }}>
        <Group position='center'>
          <Title> Horario de hoy {dayOfWeek}</Title>
        </Group>
        <ScrollArea h="47vh">
          {loading ? (
            <>
            <Group mt={100} position='center'>

           <Loader color="teal" size={150} variant="bars" />
            </Group>
            </>
          ) : (
            <Table striped withColumnBorders fontSize="xl">
              <tbody>{rows}</tbody>
            </Table>
          )}
        </ScrollArea>
        <Newhorario />
      </Card>
    </>
  );
}

export default CalendarA;
