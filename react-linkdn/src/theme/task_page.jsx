import { Suspense, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { TASKS } from '../tasks/registry';
import TaskErrorBoundary from './task_error_boundary';
import NotFound from './not_found';

export default function TaskPage() {
  const { folder } = useParams();                 
  const task = TASKS.find(t => t.folder === folder);
 
  useEffect(() => {
    if (task) document.title = 'Task ' + task.n + ' · ' + task.title;
  }, [task]);

  if (!task) return <NotFound />;

  const { Component } = task;
  return (
    <article className="task">
      <header className="task-head">
        <h1>{task.title}</h1>        
      </header>

      {Component ? (
        <TaskErrorBoundary key={task.folder}>
          <Suspense fallback={<p className="loading">Loading task {task.n}…</p>}>
            <div className="task-stage">
              <Component />
            </div>
          </Suspense>
        </TaskErrorBoundary>
      ) : (
        <div className="not-built">
          <h2>Not built yet</h2>
          <p>Create <code>src/tasks/{task.folder}/index.jsx</code> with a default export and it appears here.</p>
        </div>
      )}
    </article>
  );
}