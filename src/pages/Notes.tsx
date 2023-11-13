import React, { useState, useEffect } from 'react';
import {
  TextInput,
  rem,
  Title,
  Table,
  Modal,
  Card,
  Group,
  ActionIcon,
  ScrollArea,
  Divider,
  Text,
  Button
} from '@mantine/core';
import { IconSearch, IconTrashX, IconEye, IconFileText } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Addnotes from '../components/Addnotes';
import axios from 'axios';
import { Document, Page, View, Text as PdfText, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';


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

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [opened, { open, close }] = useDisclosure();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get('https://studyzone.examplegym.online/notes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotes(response.data as Note[]);
      })
      .catch((error) => {
        console.error('Error fetching notes:', error);
      });
  }, []);

  const openNoteDetails = (note: Note) => {
    setSelectedNote(note);
    open();
  };

  const handleDeleteNote = (noteId: number) => {
    const token = localStorage.getItem('token');

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

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = filteredNotes.map((note) => {
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
            <ActionIcon onClick={() => openNoteDetails(note)} mt={5} color="green" variant="filled">
              <IconEye size="1.125rem" />
            </ActionIcon>
            <ActionIcon mt={5} color="red" variant="filled" onClick={() => handleDeleteNote(note.id)}>
              <IconTrashX size="1.125rem" />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });
  const MyPdfDocument = () => (
    <Document>
      <Page>
        <View>
          <PdfText>{selectedNote?.title}</PdfText>
          <PdfText>{selectedNote?.content}</PdfText>
        </View>
      </Page>
    </Document>
  );

  return (
    <>
      <Modal radius="lg" size="55%" centered opened={opened} onClose={close} withCloseButton={false}>
        {selectedNote && (
          <>
            <Group position="center">
              <Title>{selectedNote.title}</Title>
            </Group>
            <Divider size="md" variant="dashed" my="sm" />
            <Text>{selectedNote.content}</Text>
            <PDFDownloadLink
              document={<MyPdfDocument />}
              fileName={`${selectedNote.title}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' :
                  <Button
                    style={{ textDecoration: 'none' }}
                    mt={15}
                    fullWidth
                    leftIcon={<IconFileText size="1rem" />}
                    color="teal"
                  >
                    Download PDF
                  </Button>

              }
            </PDFDownloadLink>
          </>
        )}
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
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.currentTarget.value)}
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