export const studentPerformance = [
  {
    id: 1,
    image: '/nota-adhesiva.png',
    area: 'Math',
    professor: 'Elsa Pato',
    cuts: [
      {
        cut_value: 0.40,
        calification: 1.0,
        exams: [4, 5] // these are relationships many to many, many cuts has many exams, TO DO: Will parsed to friendly use
      },
      {
        cut_value: 0.40,
        calification: 1.2,
        exams: [6, 7]
      },
      {
        cut_value: 0.20,
        calification: 1.4,
        exams: [9, 10]
      }
    ],
    currentCut: 1,
  },
  {
    id: 2,
    image: '/nota-adhesiva.png',
    area: 'Physics',
    professor: 'Hugo Chavez',
    cuts: [
      {
        cut_value: 0.40,
        calification: 1.0,
        exams: [4, 5] // these are relationships many to many, many cuts has many exams, TO DO: Will parsed to friendly use
      },
      {
        cut_value: 0.40,
        calification: 12.4,
        exams: [6, 7]
      },
      {
        cut_value: 0.20,
        calification: 1.4,
        exams: [9, 10]
      }
    ],
    currentCut: 1,
  },
  {
    id: 3,
    image: '/nota-adhesiva.png',
    area: 'Chemistry',
    professor: 'Maria Garcia',
    cuts: [
      {
        cut_value: 0.30,
        calification: 1.5,
        exams: [3, 4, 5]
      },
      {
        cut_value: 0.30,
        calification: 1.8,
        exams: [6, 7, 8]
      },
      {
        cut_value: 0.40,
        calification: 2.0,
        exams: [9, 10, 11]
      }
    ],
    currentCut: 2,
  },
  {
    id: 4,
    image: '/nota-adhesiva.png',
    area: 'Biology',
    professor: 'John Smith',
    cuts: [
      {
        cut_value: 0.50,
        calification: 1.2,
        exams: [2, 3, 4]
      },
      {
        cut_value: 0.50,
        calification: 9.6,
        exams: [5, 6, 7]
      }
    ],
    currentCut: 1,
  },
  

]