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
        });
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
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className='mt-20 max-w-2xl mx-auto'>
            <h1 className='text-4xl m-10 h-10 font-bold text-center'>
              {params.id ? 'Edite sua tarefa' : 'Nova Tarefa'}
            </h1>
            <label className='block py-4 text-3xl font-bold'>Titulo:</label>
            <input
              required
              type="text"
              name="title"
              placeholder='Escreva seu titulo'
              className='px-3 py-4 text-xl rounded-md w-full text-black'
              onChange={handleChange}
              value={values.title}
            />

            <label className='block py-6 text-3xl font-bold'>Descrição:</label>
            <textarea
              required
              name="description"
              rows="3"
              placeholder='Escreve a descrição de sua tarefa'
              className='px-3 py-2 text-xl rounded-md w-full text-black'
              onChange={handleChange}
              value={values.description}>
            </textarea>
            <button className='block bg-green-500 mt-8 px-2 py-3 text-xl font-bold rounded-md w-48 m-auto transition-all hover:bg-green-600 hover:scale-95' type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Salvando" : "Salvar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default TaskForm;