import { useState } from "react";
import { Task } from "../entities/Task";
import "./ToDoItem.css";

type ToDoItemProps = {
  value: Task;
  onChange: (value: Task) => void;
  onDelete: (value: Task) => void;
}

export function ToDoItem(props: ToDoItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <li className="ToDoItem">
      <label>
        <input
          type="checkbox"
          checked={props.value.completed}
          onChange={(event) => {
            props.onChange({
              ...props.value,
              completed: event.currentTarget.checked,
            });
          }}
        />
        <div className="textContent">
          <span className="text">{props.value.text}</span>
          <span className="expires">
            {`Expires: ${props.value.expire.toLocaleDateString()} ${props.value.expire.getHours()}:${(
              "0" + props.value.expire.getMinutes()
            ).slice(-2)}`}
          </span>
        </div>
      </label>
      {
        showDeleteConfirm ? (
          <>
            <span className="button accent" onClick={() => props.onDelete(props.value)}>Confirm</span>
            <span className="button" onClick={() => setShowDeleteConfirm(false)}>Cancel</span>
          </>
        ) : (
          <span className="button accent" onClick={() => setShowDeleteConfirm(true)}>Delete</span>
        )
      }
    </li>
  );
}