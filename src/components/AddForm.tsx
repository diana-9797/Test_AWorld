import { Task } from "../entities/Task";
import "./AddForm.css";

type AddFormProps = {
  onSubmit: (item: Task) => void
}

export function AddForm(props: AddFormProps) {
  const { onSubmit } = props;

  return (
    <form
      className="AddForm"
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit({
          id: new Date().getTime(),
          text: event.currentTarget.text.value,
          expire: new Date(event.currentTarget.expire.value),
          completed: false
        });
        event.currentTarget.reset();
      }}
    >
      <label>
        What should I do?
        <input name="text" type="text" required />
      </label>
      <label>
        When should I complete it?
        <input name="expire" type="datetime-local" required />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}