import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';

import { Form, Formik, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import type { FormValuesProps, NoteFormProps } from '@/types/form';
import type { CreateNoteProps } from '@/lib/api';

import * as Yup from 'yup';

import css from './NoteForm.module.css';

const INITIAL_VALUES: FormValuesProps = {
  title: '',
  content: '',
  tag: 'Todo',
};

const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title is too long')
    .required('Title is required'),
  content: Yup.string().optional().max(500, 'Content is too long'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Tag is required'),
});

function NoteForm({ onClose, page }: NoteFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: CreateNoteProps) => {
      await createNote(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', page] });
      onClose();
    },

    onError: error => {
      console.error(error);
    },
  });

  const handleSubmit = (
    values: FormValuesProps,
    formikHelpers: FormikHelpers<FormValuesProps>
  ) => {
    mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    formikHelpers.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={OrderFormSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-title`}>Title</label>
              <Field
                id={`${fieldId}-title`}
                type="text"
                name="title"
                className={css.input}
              />
              <ErrorMessage
                name="title"
                className={css.error}
                component="span"
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-content`}>Content</label>
              <Field
                as="textarea"
                id={`${fieldId}-content`}
                name="content"
                rows={8}
                className={css.textarea}
              />
              <ErrorMessage
                name="content"
                className={css.error}
                component="span"
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor={`${fieldId}-tag`}>Tag</label>
              <Field
                as="select"
                id={`${fieldId}-tag`}
                name="tag"
                className={css.select}
              >
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" className={css.error} component="span" />
            </div>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={css.submitButton}
                disabled={!dirty || !isValid || isSubmitting || isPending}
              >
                Create note
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
export default NoteForm;
