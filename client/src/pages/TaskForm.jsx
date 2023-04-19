import { Form, Formik } from 'formik'
import { useTasks } from '../context/TaskProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TaskForm() {

  const {createTask, getTask, updateTask} = useTasks();
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
      <h1>
        {params.id ? 'Edite sua tarefa' : 'Nova Tarefa'}
      </h1>
        <Formik
          initialValues={task}
          enableReinitialize={true}
          onSubmit={async (values) => {
            if (params.id) {
              await updateTask(params.id, values);
              navigate('/');
            } else {
              await createTask(values);
            }
            setTask({
              title: "",
              description: "",
            })
          }}
        >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <label>Titulo</label>
            <input 
              type="text" 
              name="title" 
              placeholder='Escreva seu titulo'
              onChange={handleChange}
              value={values.title}
            />

            <label>Descrição</label>
            <textarea 
              name="description" 
              rows="3" 
              placeholder='Escreve a descrição'
              onChange={handleChange}
              value={values.description}
              ></textarea>

            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Salvando" : "Salvar"}
            </button>
          </Form>
        )}
        </Formik>
    </div>
  )
}

export default TaskForm