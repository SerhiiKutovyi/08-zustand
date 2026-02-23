export interface NoteFormProps {
  onClose: () => void;
  page: number;
}

export interface FormValuesProps {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}
