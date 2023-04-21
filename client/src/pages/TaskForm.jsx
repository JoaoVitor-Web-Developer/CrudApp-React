import { Form, Formik } from 'formik'
import { useTasks } from '../context/TaskProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TaskForm() {

  const { createTask, getTask, updateTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  })
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setTask({
          title: task.title,
          description: task.description,
        })
      }
    };
    loadTask();
  }, []);

  return (
    <div>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (params.id) {
            await updateTask(params.id, values);
          } else {
            await createTask(values);
          }
          navigate('/');
          setTask({
            title: "",
            description: "",
          })
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className='bg-green-900 max-w-md rounded-md p-6 mx-auto my-20'>
            <h1 className='text-xl font-bold text-center'>
              {params.id ? 'Edite sua tarefa' : 'Nova Tarefa'}
            </h1>
            <label className='block'>Titulo:</label>
            <input
              type="text"
              name="title"
              placeholder='Escreva seu titulo'
              className='px-3 py-1 rounded-md w-full text-black'
              onChange={handleChange}
              value={values.title}
            />

            <label className='block'>Descrição:</label>
            <textarea
              name="description"
              rows="3"
              placeholder='Escreve a descrição'
              className='px-3 py-1 rounded-md w-full text-black'
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button className='block bg-green-500 mt-4 px-2 py-3 rounded-md w-full' type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Salvando" : "Salvar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TaskForm