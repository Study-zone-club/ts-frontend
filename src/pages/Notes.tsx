import { useState, useEffect } from 'react';
import {
  TextInput,
  rem,
  Title,
  Table,
  Modal,
  Card,
  Group,
  ActionIcon,
  ScrollArea
} from '@mantine/core';
import { IconSearch, IconTrashX, IconEye, } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Addnotes from '../components/Addnotes';
import axios from 'axios';

type Props = {}
type Subject = {
  id: number;
  title: string;
  area: string;
  professor: string;
  lapse: number;
  notes: Note[];
  power: any[];
};

type Note = {
  id: number;
  title: string;
  content: string;
  note_type: string;
  subject: Subject;
  subject_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
};
function Notes({ }: Props) {
  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />;

  const [opened, { open, close }] = useDisclosure(false);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get('https://studyzone.examplegym.online/notes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setNotes(response.data as Note[]);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, []);
  const handleDeleteNote = (noteId: number) => {
    const token = localStorage.getItem("token");

    axios
      .delete(`https://studyzone.examplegym.online/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      })
      .catch((error) => {
        console.error('Error deleting note:', error);
      });
  };

  const rows = notes.map((note) => {
    const createdAtDate = new Date(note.created_at);

    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth() + 1;
    const year = createdAtDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return (
      <tr key={note.id}>
        <td>{note.title}</td>
        <td>{note.subject.title}</td>
        <td>{note.note_type}</td>
        <td>{formattedDate}</td>
        <td>
          <Group position="center">
            <ActionIcon mt={5} color="green" variant="filled">
              <IconEye size="1.125rem" />
            </ActionIcon>
            <ActionIcon
              mt={5}
              color="red"
              variant="filled"
              onClick={() => handleDeleteNote(note.id)}
            >
              <IconTrashX size="1.125rem" />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });
  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">

      </Modal>
      <Title order={3}>Mis anotaciones</Title>
      <Card mt={15} withBorder padding="lg" radius="lg" shadow="xl">

        <Group position="apart">

          <TextInput
            placeholder="Buscar...."
            rightSection={icon}
            mt="md"
            w={510}
            radius="lg"
            size="lg"

          />
          <Addnotes />
        </Group>
      </Card>

      <Card mt={15} withBorder radius="lg" shadow="xl">
        <ScrollArea h="65vh">

          <Table fontSize="lg" mt={15} striped highlightOnHover withBorder withColumnBorders>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Clase</th>
                <th>Tipo</th>
                <th>Creada</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>

          </Table>
        </ScrollArea>
      </Card>

    </>
  )
}

export default Notes